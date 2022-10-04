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

// This component will load the data and send emails, processing the template components 1 by 1
const ProcessEmailView = ({ payload, setPayload }) => {
  console.log(payload.length);
  // payload: state variable on the wrapper-level that is set in sendEmail view

  const [count, setCount] = useState(0); // imitate process progress
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [currentPayload, setCurrentPayload] = useState([payload[0]]);
  const [totalPayload, setTotalPayload] = useState(payload.length);
  const history = useHistory();

  useEffect(() => {
    // current payload: an email item in the payload list i.e. individual email variables info
    if (count < payload.length) {
      setCurrentPayload([...[payload[count]]]);
    } else {
      setCurrentPayload([]);
    }
  }, [count]);


  // get trends data period
  const period =
    currentPayload.length > 0
      ? [
          isNumeric(currentPayload[0].trendDateStart) 
            ? moment().add(currentPayload[0].trendDateStart, "months", "YYYY-MM-DD"):moment(currentPayload[0].trendDateStart),
          isNumeric(currentPayload[0].trendDateEnd) 
            ? moment().add(currentPayload[0].trendDateEnd, "months", "YYYY-MM-DD"):moment(currentPayload[0].trendDateEnd),
        ]
      : [];
  // get reporting data period
  const reportingPeriod =
    currentPayload.length > 0
      ? isNumeric(currentPayload[0].reportingYear) ? [
          moment().add(currentPayload[0].reportingYear, "months", "YYYY").startOf("year"),
          moment().add(currentPayload[0].reportingYear, "months").format("YYYY") === moment().format("YYYY")
            ? moment().subtract(1, "months")
            : moment().add(currentPayload[0].reportingYear, "months", "YYYY").endOf("year"),
        ] : 
        [
          moment(currentPayload[0].reportingYear, "YYYY").startOf("year"),
          currentPayload[0].reportingYear === moment().format("YYYY")
            ? moment().subtract(1, "months")
            : moment(currentPayload[0].reportingYear, "YYYY").endOf("year"),
        ]
      : [];
 
  // get facilities for the recipients district
  const districtFacilities =
    currentPayload.length > 0
      ? districtFacilitiesMeta[currentPayload[0].orgUnit]["facility_ids"]
      : [];

  const varIds = [];
  const variables = currentPayload
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

  const districts = currentPayload
    .map((p) => p.orgUnit)
    .reduce((current, next) => [...new Set(current.concat(next))], []);

  // --- Facility level data
  // reporting period should be current year
  const { data: dataSets } = useDataQuery(dataSetQuery, {
    variable: {
      period: reportingPeriod,
    },
  });

  const {
    loading,
    error: facilitiesError,
    data: rData,
    refetch: facilitiesRefetch,
  } = useDataQuery(myQuery, {
    variables: {
      variableId: varIds.join(";"),
      period: reportingPeriod,
      orgLevel: districtFacilities.join(";"),
    },
  });

  if (facilitiesError) {
    console.log(facilitiesError);
  } else if (loading) {
    console.log("loading...");
  }

  useEffect(() => {
    // refetch data when the currentPayload changes
    if (currentPayload.length > 0) {
      facilitiesRefetch({
        variableId: varIds.join(";"),
        period: reportingPeriod,
        orgLevel:
          districtFacilities.length < 500
            ? districtFacilities.join(";")
            : "LEVEL-5",
      });
    }
  }, [currentPayload]);

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
  }, [districts]);

  // facilities month of interest data
  const { data: barData, refetch: barRefetch } = useDataQuery(myQuery, {
    variables: {
      variableId: varIds.join(";"),
      period:
        currentPayload.length > 0
          ? isNumeric(currentPayload[0].monthOfInterest) ? [
              moment().add(currentPayload[0].monthOfInterest, "months"),
              moment().add(currentPayload[0].monthOfInterest, "months"),
            ] : [
              moment(currentPayload[0].monthOfInterest),
              moment(currentPayload[0].monthOfInterest),
            ]
          : [],
      orgLevel: districtFacilities.join(";"),
    },
  });

  useEffect(() => {
    // refetch data when the currentPayload changes
    if (currentPayload.length > 0) {
      barRefetch({
        variableId: varIds.join(";"),
        period: [
          moment(currentPayload[0].monthOfInterest),
          moment(currentPayload[0].monthOfInterest),
        ],
        orgLevel:
          districtFacilities.length < 500
            ? districtFacilities.join(";")
            : "LEVEL-5",
      });
    }
  }, [districtFacilities]);
  // --- Trend line visualizations data
  const { data, refetch } = useDataQuery(myQuery, {
    variables: {
      variableId: varIds.join(";"),
      period: period,
      orgLevel: districts.join(";"),
    },
  });

  useEffect(() => {
    // refetch data when the currentPayload changes
    if (currentPayload.length > 0) {
      refetch({
        variableId: varIds.join(";"),
        period: period,
        orgLevel: districts.join(";"),
      });
    }
  }, [period, districts]);

  // ------ process emails ----
  useEffect(() => {
    let isMounted = true;
    if (rData && data && barData) {
      console.log("start processing");
      const orgUnitIndex = data
        ? findPosition(data.results.headers, "ou")
        : undefined;
      const indicatorIndex = data
        ? findPosition(data.results.headers, "dx")
        : undefined;

      // --- approach email  ---
      // Iterate over each email to filter and fetch necessary variables
      const testPayload = async (mi) => {
        try {
          console.log(` --- Processing email ${count + 1} started ---`);
          console.log(mi);          
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

          // get the images payload i.e., attachments and titles
          await getImagePayload({
            varIds,
            scopeData,
            indicatorIndex,
            districtFacilities,
            emailData,
            emailAttachment,
            districtName,
            facilitiesData,
            barData,
            dataSets,
            mi,
            setCount,
            period,
            reportingPeriod
          });
        } catch (error) {
          // console.log(error);
        }
      };

      testPayload(...currentPayload);
      if (isMounted && count === totalPayload) {
        setPayload([]);
        setTimeout(() => {setButtonDisabled(false)}, 5000)
      }

      return () => {
        isMounted = false;
      };
      // pushing history back to send instead of activating the button?? TEST!
    }
  }, [data, rData, barData]);

  return (
    <div style={{padding:"3%"}}>
      <p style={{fontWeight:"bold"}}>Sending Emails: {" "}
        {count} / {totalPayload}
      </p>
      <div id="graph" style={{ display: "none" }}></div>
      {!buttonDisabled && 
        <p id="completed-emails"> All emails sent </p>}
      <button className="button" disabled={buttonDisabled} 
      style={{marginLeft:"0px"}}
        onClick={() => history.push("send")}>
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
  emailData["dynamic_reporting_month"] = isNumeric(mi.monthOfInterest) 
    ? moment().add(mi.monthOfInterest, "months").format("MMMM YYYY")
    : moment(mi.monthOfInterest).format("MMMM YYYY");
  emailData["dynamic_future_report_date"] = moment()
    .add(1, "months")
    .format("MMMM YYYY");
  emailData["dynamic_following_reporting_date"] = (isNumeric(mi.monthOfInterest) ? moment().add(mi.monthOfInterest, "months"):moment(mi.monthOfInterest))
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

// function that generates the visualizations, populates the payload and sends emails
function getImagePayload({
  varIds,
  scopeData,
  indicatorIndex,
  districtFacilities,
  emailData,
  emailAttachment,
  districtName,
  facilitiesData,
  barData,
  dataSets,
  mi,
  setCount,
  period,
  reportingPeriod
}) {
  // const period = [moment(mi.trendDateStart), moment(mi.trendDateEnd)];
  const periodIndex = findPosition(facilitiesData.results.headers, "pe");
  
  // --- approach variable  ---
  return new Promise((resolve) => {
    varIds.forEach((v, index) => {
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
      if (lineDistrictData.length > 0) {
        lineDistrictData[lineDistrictData.length -1].mode = "lines+markers+text"
        lineDistrictData[lineDistrictData.length -1].textposition = "top"
        lineDistrictData[lineDistrictData.length -1].texttemplate = "%{y}"
      }

      // ---facility level (horizontal bars) visualizations data
      const barVizData = getBarVisData(
        barData,
        districtFacilities,
        v,
        isNumeric(mi.monthOfInterest) ? moment().add(mi.monthOfInterest): moment(mi.monthOfInterest),
        variableName
      );
      const horizontalBarData = barVizData.plottingData;
      emailData[`title_bar_${v.replaceAll(";", "_")}`] = barVizData.title;

      // ---- Reporting visualizations
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
        setTimeout(() => {
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
                console.log("------------------ variable data-------------------");
                console.log(emailData);
                console.log(emailAttachment);
                console.log(`EMAIL SENT TO: ${mi.recipientEmail}`);

                EmailClient.sendEmail(
                  mi.recipientEmail,
                  mi.templateId,
                  emailData,
                  emailAttachment
                );
                console.log(`---Processing email done ---`);
                setCount((pCount) => pCount + 1);
              }
            });
        }, 0);
      });
    });
    resolve();
  });
}

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
}

export default ProcessEmailView;
