import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import indicatorMeta from "../config/Indicators";
import * as Plotly from "plotly.js-dist-min";
import { useDataQuery } from "@dhis2/app-runtime";
import { getBarVisData } from "../components/HorizontalBarImages";
import districtFacilitiesMeta from "../config/DistrictFacilities";
import EmailClient from "../email/EmailClient";
import {
  processCountryData,
  processOrgRawDataToTimeSeries,
  processTitle,
  monthsBetween,
  findPosition,
} from "../utils";
import { dataSetQuery, getReportingData } from "../components/ReportingImages";

const myQuery = {
  results: {
    resource: "analytics",
    params: ({ variableId, period, orgLevel }) => ({
      dimension: [
        `dx:${variableId}`,
        `ou:${orgLevel}`,
        `pe:${monthsBetween(
          period.map((p) => p.format("YYYY-MM" + "-01"))[0],
          period.map((p) => p.format("YYYY-MM" + "-01"))[1]
        ).join(";")}`,
      ],
      skipMeta: false,
      paging: false,
      includeNumDen: true,
      hierarchyMeta: true,
    }),
  },
};

let timer;

// This component will load the data and send emails, processing the template components 1 by 1
const ProcessEmailView = ({ payload, setPayload }) => {
  console.log(payload.length);
  // payload: state variable on the wrapper-level that is set in sendEmail view

  const [count, setCount] = useState(0); // imitate process progress
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [facilitiesData, setFacilitiesData] = useState();
  const history = useHistory();

  // get dates upto previous month
  var period = [];
  if (payload.length > 0) {
    period = [
      moment(payload[0].dateStart),
      moment(payload[0].dateEnd),
    ];
  }
  console.log(period);

  const varIds = [];
  const variables = payload
    .map((p) => p.variables)
    .reduce((current, next) => current.concat(next), []);

  // get all unique variable ids from the payload
  variables.forEach((v) => {
    if (v.startsWith("image")) {
      var re = /_([^]+)/;
      const varName = v.replace("image_", "").match(re);
      const id = varName[0].replace("_", "").replaceAll("_", ";");
      if (!varIds.includes(id)) {
        varIds.push(id);
      }
    }
  });

  const districts = payload
    .map((p) => p.orgUnit)
    .reduce((current, next) => [...new Set(current.concat(next))], []);

  // --- Facility level data
  // reporting period should be current year
  const { refetch: datasetsRefetch, data: dataSets } = useDataQuery(
    dataSetQuery,
    {
      variable: {
        period: [moment().startOf("year"), period[1]],
      },
      lazy: true,
    }
  );

  const {
    loading,
    error: facilitiesError,
    data: rData,
    refetch: facilitiesRefetch,
  } = useDataQuery(myQuery, {
    variables: {
      variableId: varIds.join(";"),
      period: [moment().startOf("year"), period[1]],
      orgLevel: "LEVEL-5",
    },
    lazy: true,
  });

  if (facilitiesError) {
    console.log(facilitiesError);
  } else if (loading) {
    console.log("loading...");
  }

  const facilitiesData = useMemo(() => {
    if (rData) {
      // filter on districts
      var facilities = [];
      Object.entries(rData.results.metaData.ouHierarchy).forEach(
        ([key, value]) => {
          districts.map((district) => {
            if (value.split("/")[2].includes(district)) {
              facilities.push(key);
            }
          });
        }
      );
      var f = rData;
      f.results.rows = rData.results.rows.filter((i) =>
        facilities.includes(i[1])
      );
      return f;
    }
  }, [rData]);

  // --- Line visualizations data
  const { data } = useDataQuery(myQuery, {
    variables: {
      variableId: varIds.join(";"),
      period: period,
      orgLevel: "LEVEL-3",
      // lazy: true,
    },
  });

  console.log(rData);
  console.log(data);

  useEffect(() => {
    let isMounted = true;
    if (rData && data) {
      console.log("start processing");
      const orgUnitIndex = data
        ? findPosition(data.results.headers, "ou")
        : undefined;
      const indicatorIndex = data
        ? findPosition(data.results.headers, "dx")
        : undefined;

      // --- approach email  ---
      // Iterate over each email to filter and fetch necessary variables
        payload.forEach((mi, index) => {
          console.log(index);
          // start building the email payload
          var emailData = {};
          var emailAttachment = [];

          // populate static and dynamic variables
          populateStaticVars(emailData, mi);

          // get district specific data
          const scopeData = data.results.rows.filter(
            (i) => i[orgUnitIndex] === mi.orgUnit
          );
          const districtName = data.results.metaData.items[mi.orgUnit].name;
          emailData["static_district"] = districtName;

          //  get facilities specific to the district
          const districtFacilities =
            districtFacilitiesMeta[mi.orgUnit]["facility_ids"];

          // get the images payload i.e., attachments and titles
          getImagePayload({
            varIds,
            scopeData,
            indicatorIndex,
            districtFacilities,
            emailData,
            emailAttachment,
            districtName,
            facilitiesData,
            dataSets,
            mi,
          }).then((r) => console.log(r));

          // console.log("------------------ variable data-------------------");
          // console.log(emailData);
          // console.log(emailAttachment);

          setCount((pCount) => pCount + 1);
        });

      setButtonDisabled(false);
      if (isMounted) {
        setPayload([]);
      }

      return () => {
        isMounted = false;
      };

      // pushing history back to send instead of activating the button?? TEST!
    } else {
      facilitiesRefetch({ period: [moment().startOf("year"), period[1]] });
    }
  }, [data, rData]);




  return (
    <div>
      <p>Sending Emails: {" "}
        {count} / {payload.length}
      </p>
      <div
        id="graph" style={{ display: "none" }}
      ></div>
      <button disabled={buttonDisabled} onClick={() => history.push("send")}>
        Back
      </button>
    </div>
  );
};

//  function to get title for the line visualizations
function getVisTitle(selectedDistrictData, period, districtName, displayName) {
  const data = Object.fromEntries(
    Object.entries(processOrgRawDataToTimeSeries(selectedDistrictData)).filter(([key]) => 
    period.map((p) => p.format("YYYYMM")).includes(key)))

  const analysis = processTitle(
    data,
    ""
  );
  const what = `in ${districtName}`;
  const month = `in ${period[1].format("MMMM YYYY")}`;
  const indicatorDescription = displayName;

  const title = `The total number of ${indicatorDescription} ${what} ${month} ${analysis} from the previous month`;
  return title;
}

// function to populate static and dynamic variables from the template
function populateStaticVars(emailData, mi) {
  const period = [moment(mi.dateStart), moment(mi.dateEnd)];

  //  get the meta item specific list of indicators
  const varIds = [];
  mi.variables.forEach((v) => {
    if (v.startsWith("image")) {
      var re = /_([^]+)/;
      const varName = v.replace("image_", "").match(re);
      const id = varName[0].replace("_", "").replaceAll("_", ";");
      if (!varIds.includes(id)) {
        varIds.push(id);
      }
    }
  });

  emailData["static_number_of_indicators"] = varIds.length;
  const today = new Date(); // get extraction date
  emailData["dynamic_extraction_date"] =
    today.toLocaleString("default", { day: "numeric", month: "long" }) +
    " " +
    today.getFullYear();
  emailData["dynamic_reporting_month"] = period[1].format("MMMM YYYY");
  emailData["dynamic_future_report_date"] = moment()
    .add(0, "months")
    .format("MMMM YYYY");
  emailData["dynamic_following_reporting_date"] = period[1]
    .clone()
    .add(1, "months")
    .format("MMMM YYYY");
  emailData["static_recipients_name"] = mi.recipientName;
}

// defining layouts for each type of visualization
const lineLayout = {
  showlegend: true,
  autosize: true,
  legend: {
    orientation: "h",
    yanchor: "bottom",
    y: 1.02,
    xanchor: "right",
    x: 1,
  },
  coloraxis: { colorbar_len: 1 },
  margin: { r: 0, t: 0, b: 25, l: 50 },
  plot_bgcolor: "rgba(255, 255, 255, 1)",
  paper_bgcolor: "rgba(255, 255, 255, 1)",
  width: "100%",
  xaxis: {
    showgrid: false,
    zeroline: false,
  },
  yaxis: {
    autorange: true, // Added
    showgrid: true,
    zeroline: true,
    zerolinecolor: "lightgray",
    gridcolor: "lightgray",
    rangemode: "tozero",
  },
};

const barLayout = {
  autosize: true,
  showlegend: false,
  xaxis: {
    showgrid: false,
    zeroline: false,
  },
  margin: {
    pad: 0,
    r: 0,
    t: 25,
    l: 0,
    b: 50,
  },
  width: "100%",
  maxHeight: 480,
  yaxis: {
    showgrid: true,
    zeroline: true,
    gridcolor: "lightgray",
    zerolinecolor: "lightgray",
    automargin: true,
  },
};

const reportingLayout = {
  showlegend: true,
  autosize: true,
  legend: {
    orientation: "h",
    yanchor: "bottom",
    y: 1.02,
    xanchor: "right",
    x: 1,
  },
  width: "100%",
  coloraxis: { colorbar_len: 1 },
  margin: { r: 0, t: 25, b: 25, l: 25 },
  plot_bgcolor: "rgba(255, 255, 255, 1)",
  paper_bgcolor: "rgba(255, 255, 255, 1)",
  xaxis: {
    showgrid: false,
    zeroline: false,
    automargin: true,
  },
  yaxis: {
    showgrid: true,
    zeroline: true,
    zerolinecolor: "lightgray",
    gridcolor: "lightgray",
    rangemode: "tozero",
    automargin: true,
    range: [0, 105],
  },
};

function getImagePayload({
  varIds,
  scopeData,
  indicatorIndex,
  districtFacilities,
  emailData,
  emailAttachment,
  districtName,
  facilitiesData,
  dataSets,
  mi,
}) {
  const period = [moment(mi.dateStart), moment(mi.dateEnd)];
  const periodIndex = findPosition(facilitiesData.results.headers, "pe");
  
  // --- approach variable  ---
  return new Promise((resolve) => {
    varIds.forEach((v, index) => {
      // console.log("--- 1. Getting trend line visualizations---");

      const indicatorScopedData = scopeData
        .filter((i) => v.split(";").includes(i[indicatorIndex]))
        .filter((i) =>
          monthsBetween(
            period.map((p) => p.format("YYYY-MM" + "-01"))[0],
            period.map((p) => p.format("YYYY-MM" + "-01"))[1]
          ).includes(i[periodIndex])
        );

      // var variableName = data.results.metaData.items[v.split(";")[0]].name;
      // for (let j = 1; j < v.split(";").length; j++) {
      //   variableName = variableName + ", " + data.results.metaData.items[v.split(";")[j]].name;
      // }

      const variableObject = indicatorMeta.filter((i) => {
        if (i.function == "single") {
          return i.numerator.dataElementId == v;
        } else {
          return i.numerator.dataElementId[0] == v.split(";")[0];
        }
      })[0];
      const variableName = variableObject["displayName"];

      // -- district level (line) visualization data
      // add line title
      const lineTitle = getVisTitle(
        indicatorScopedData.length > 0 ? indicatorScopedData : undefined,
        [period[1].clone().subtract(1, "months"), period[1]],
        districtName,
        variableName
      );
      emailData[`title_line_${v.replaceAll(";", "_")}`] = lineTitle;

      const lineDistrictData = processCountryData(
        processOrgRawDataToTimeSeries(
          indicatorScopedData.length > 0 ? indicatorScopedData : undefined
        )
      );
      // add text to latest year
      lineDistrictData[lineDistrictData.length -1].mode = "lines+markers+text"
      lineDistrictData[lineDistrictData.length -1].textposition = "top"
      lineDistrictData[lineDistrictData.length -1].texttemplate = "%{y}"

      // ---facility level (horizontal bars) visualizations data
      // console.log("--- 2. Getting facility level visualization data---");
      const barVizData = getBarVisData(
        facilitiesData,
        districtFacilities,
        v,
        period[1],
        variableName
      );
      const horizontalBarData = barVizData.plottingData;
      emailData[`title_bar_${v.replaceAll(";", "_")}`] = barVizData.title;

      // ---- Reporting visualizations
      // console.log("--- 3. Getting reporting visualizations");
      const reportingPeriod = [moment().startOf("year"), period[1]];
      const reporting = getReportingData(
        facilitiesData,
        dataSets,
        districtFacilities,
        v,
        reportingPeriod,
        districtName,
        variableName
      );
      const reportingVizData = reporting.plottingData;
      emailData[`title_reporting_${v.replaceAll(";", "_")}`] = reporting.title;

      // -------------
      const visualizations = [
        lineDistrictData,
        horizontalBarData,
        reportingVizData,
      ];
      function imageType(data) {
        if (data === lineDistrictData) {
          return { type: "line", layout: lineLayout };
        } else if (data === horizontalBarData) {
          return { type: "bar", layout: barLayout };
        } else {
          return { type: "reporting", layout: reportingLayout };
        }
      }

      // for each type of data plot the respective visualization
      visualizations.forEach((i, n) => {
        const vizData = imageType(i);

        // setting timeout 0 to win a race condition
        timer = setTimeout(() => {
          Plotly.react("graph", JSON.parse(JSON.stringify(i)), vizData.layout)
            .then((o) => {
              return Plotly.toImage(o, {
                format: "png",
              });
            })
            .then((dataURI) => {
              const response = EmailClient.transformImage(dataURI);
              emailAttachment.push(response);
              emailData[`image_${vizData.type}_${v.replaceAll(";", "_")}`] =
                "cid:" + response.content_id;

              // send email if all images are received
              if (emailAttachment.length === varIds.length * 3) {
                Plotly.purge("graph")
                console.log("------------------ variable data-------------------");
                console.log(emailData);
                EmailClient.sendEmail(
                  mi.recipientEmail,
                  mi.templateId,
                  emailData,
                  emailAttachment
                );
              }
            });
        }, 0);
      });
    });
    resolve("done");
  });
}

export default ProcessEmailView;
