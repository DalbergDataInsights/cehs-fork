import React, { useMemo } from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import VisualizationTitle from "./VisualizationTitle";
import { $store } from "../models/Store";
import Loading from "./Loading";
import {
  getOrgUnitDataPercentageChanges,
  getOrgUnitDataTotals,
  getOrgUnitDataTotalsTwo,
  objectToArray,
  computeReportingTotals,
  computeReportingProportions,
  computeReportingPercentages,
  filterStartPeriodEndPeriodData,
} from "../utils";
import Download from "./Download";
import HorizontalBarTwo from "./HorizontalBarTwo";
import { Select } from "antd";
import { onPercentageOptionChange } from "../models/Events";
import indicatorMeta from "../config/Indicators";
import districtFacilitiesMeta from "../config/DistrictFacilities";

const MapVisualizationReportsTwo = ({
  data,
  loading,
  error,
  maptype,
  displayName,
}) => {
  const store = useStore($store);
  console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log(periods);
  // const variableObject = indicatorMeta.filter(
  //   (i) => i.numerator.key == store.selectedVariable
  // )[0];
  // console.log("Printing the variable object");
  // console.log(variableObject);
  // const displayName = "";
  // if (variableObject) {
  //   // console.log(variableObject);
  //   console.log(`Display name: ${variableObject.displayName}`);
  //   displayName = variableObject.displayName;
  // }
  // console.log(displayName);

  // 0. Get the unique list of facilities in the raw data
  // const facilitiesIdsList =
  //   data && data["results"]["rows"] !== undefined
  //     ? [...new Set(data["results"]["rows"].map((val) => val[1]))]
  //     : [];

  // console.log("Printing the facilities ID list from raw data");
  // console.log(facilitiesIdsList);

  // // 1. Partition the raw data into a dict of facility id => raw data for facility.
  // // const facilitiesDataDict = {};
  // // if (data && data["results"]["rows"]) {
  // //   facilitiesIdsList.forEach(function (item, index) {
  // //     facilitiesDataDict[item] = data["results"]["rows"].filter(
  // //       (val) => val[1] == item
  // //     );
  // //   });
  // // }

  // // console.log("Printing the facilities per data dict");
  // // console.log(facilitiesDataDict);

  // const districtNumFacilities = {};
  // for (const [key, value] of Object.entries(districtFacilitiesMeta)) {
  //   districtNumFacilities[key] = value["facility_ids"].length;
  // }

  // console.log("Printing the number of reporting facilities per district");
  // console.log(districtNumFacilities);

  const dataViz = useMemo(() => {
    if (maptype == "total") {
      return computeReportingProportions(
        data,
        "total",
        districtFacilitiesMeta,
        store.districts
      );
    } else if (maptype == "percentage") {
      // return computeReportingPercentages(
      //   data,
      //   periods,
      //   districtFacilitiesMeta,
      //   store.districts
      // );
      // Filter the out the data for periods
      const filteredData = filterStartPeriodEndPeriodData(data, periods);
      if (filteredData) {
        console.log("Printing out the start period data");
        console.log(filteredData[0]);

        console.log("Printing out the end period data");
        console.log(filteredData[1]);

        const startReporting = computeReportingProportions(
          filteredData[0],
          "total",
          districtFacilitiesMeta,
          store.districts
        );

        const endReporting = computeReportingProportions(
          filteredData[1],
          "total",
          districtFacilitiesMeta,
          store.districts
        );

        console.log("Printing out the start reporting");
        console.log(startReporting);

        console.log("Printing out the end reporting");
        console.log(endReporting);

        const reportingPercentages = {};
        Object.entries(startReporting).forEach(([key, value]) => {
          reportingPercentages[key] = parseFloat(
            ((endReporting[key] - startReporting[key]) /
              (startReporting[key] + 0.0001)) *
              100
          ).toFixed(2);
        });

        console.log("Printing out reporting percetange changes");
        console.log(reportingPercentages);
        return reportingPercentages;
      }
    }
  }, [data, store.period]);

  // let facilitiesDataTotals = null;

  // let dataViz = null;

  // if (data && data["results"]["rows"] && maptype == "total") {
  //   // if (data && maptype == "total") {
  //   facilitiesDataTotals = getOrgUnitDataTotalsTwo(facilitiesIdsList, data);

  //   console.log("Printing the data totals per facility");
  //   console.log(facilitiesDataTotals);

  //   const facilitiesDataTotalsArray = objectToArray(facilitiesDataTotals);
  //   console.log("Printing facilities data totals array");
  //   console.log(facilitiesDataTotalsArray);

  //   const districtFacilitiesReportingTotals = {};
  //   Object.keys(districtFacilitiesMeta).forEach(function (item, index) {
  //     districtFacilitiesReportingTotals[item] =
  //       facilitiesDataTotalsArray.filter((val) =>
  //         districtFacilitiesMeta[item]["facility_ids"].includes(val[0])
  //       ).length / districtNumFacilities[item];
  //   });

  //   console.log("Printing the proportions");
  //   console.log(districtFacilitiesReportingTotals);

  //   const districtFacilitiesReportingTotalsRenamed = {};
  //   Object.entries(districtFacilitiesReportingTotals).forEach(
  //     ([key, value]) => {
  //       const districtName = store.districts
  //         .filter((i) => i.id == key)
  //         .map((ou) => ou.name)[0];

  //       districtFacilitiesReportingTotalsRenamed[districtName] = parseFloat(
  //         value.toFixed(2)
  //       );
  //     }
  //   );

  //   console.log("Printing the proportion of reporting facilites");
  //   console.log(districtFacilitiesReportingTotalsRenamed);

  //   dataViz = districtFacilitiesReportingTotalsRenamed;
  // }

  // if (data && data["results"]["rows"] && maptype == "percentage") {
  //   // Get facility data from the start period
  //   console.log(data["results"]["rows"]);
  //   const startData = data["results"]["rows"].filter(
  //     (val) => val[2] == store.period[0]
  //   );
  //   console.log(startData);
  //   // Get facility data from the end period
  //   const endData = data["results"]["rows"].filter(
  //     (val) => val[2] == store.period[1]
  //   );

  //   // Computer the reporting totals
  //   startReportingTotals = computeReportingTotals(
  //     facilitiesIdsList,
  //     startData,
  //     districtFacilitiesMeta
  //   );

  //   // endReportingTotals = computeReportingTotals(
  //   //   facilitiesIdsList,
  //   //   endData,
  //   //   districtFacilitiesMeta
  //   // );

  //   console.log("Printing out the start reporting total");
  //   console.log(startReportingTotals);
  //   // console.log("Printing out the end reporting totals");
  //   // console.log(endReportingTotals);
  // }

  console.log("Printing data Viz");
  console.log(dataViz);

  const colorScaleValue = maptype == "total" ? "Blues" : "RdBu";
  const reversedScaleValue = true;

  return (
    <>
      <Row className="data-card mb-5 shadow-sm rounded">
        <Col>
          <Row style={{ marginBottom: 20 }}>
            {maptype == "total" && (
              <Col className="graph">
                <h5>{`Proportion of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}

            {maptype == "percentage" && (
              <Col className="graph">
                <h5>{`Percentage change in proportion of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}
          </Row>

          {/* {maptype == "percentage" && (
            <Row>
              <Col>
                <Select
                  style={{ width: "100%", backgroundColor: "white" }}
                  size="large"
                  value={store.selectedPercentageOption}
                  onChange={(val) => onPercentageOptionChange(val)}
                >
                  <Option value="1">
                    Compare month of interest and month of reference
                  </Option>
                  <Option value="2">
                    Compare quarters averages, using the three months periods
                    ending on month of interest and month of reference
                  </Option>
                </Select>
              </Col>
            </Row>
          )} */}

          {loading && <Loading />}

          {data && dataViz && (
            <Row>
              <Col className="m-bot-24 p-3" xs={6}>
                <Row>
                  <Col className="graph" style={{ minHeight: 480 }}>
                    <Plot
                      data={[
                        {
                          type: "choroplethmapbox",
                          locations: Object.keys(dataViz),
                          z: Object.values(dataViz),
                          featureidkey: "properties.name",
                          geojson: store.rawGeojson,
                          colorscale: colorScaleValue,
                          reversescale: reversedScaleValue,
                        },
                      ]}
                      layout={{
                        mapbox: {
                          style: "open-street-map",
                          center: { lon: 32.3, lat: 1.3 },
                          zoom: 5.8,
                        },
                        autosize: true,
                        margin: {
                          pad: 0,
                          r: 0,
                          t: 0,
                          l: 0,
                          b: 0,
                        },
                        dragMode: false,
                      }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                      config={{ displayModeBar: false, scrollZoom: false }}
                    />
                  </Col>
                </Row>
                <Download />
              </Col>
              <Col className="m-bot-24 p-3" xs={6}>
                <Row>
                  <Col className="graph" style={{ minHeight: 480 }}>
                    <HorizontalBarTwo data={dataViz} type={maptype} />
                  </Col>
                </Row>
                <Download />
              </Col>
            </Row>
          )}
        </Col>
        {error && <div>{error.message}</div>}
      </Row>
    </>
  );
};

export default MapVisualizationReportsTwo;
