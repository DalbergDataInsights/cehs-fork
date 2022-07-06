import { useStore } from "effector-react";
import React, { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import {
  computeCountryTimeSeries,
  computeDistrictTimeSeries,
  computeFacilityTimeSeries,
  processOrgDataTotal,
  processTitle,
} from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";
import { processOrgRawDataToTimeSeries, sortDictionary } from "../utils";
import indicatorMeta from "../config/Indicators";
import districtFacilitiesMeta from "../config/DistrictFacilities";
import facilitiesMeta from "../config/Facilities";

const LineVisualizationTwo = ({
  data,
  loading,
  error,
  processor,
  level,
  displayName,
}) => {
  const store = useStore($store);
  // console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  // console.log(periods);

  console.log(`Selected district: ${store.selectedDistrict}`);

  const districts = store.districts;

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];
  console.log(districtName);

  // const selectedDistrict = store.selectedDistrict;
  // let facility = null;
  // let facilityName = "";

  // let dataViz = null;
  const dataViz = useMemo(() => {
    if (level == "country") {
      return computeCountryTimeSeries(data, level);
    }
  }, [data]);

  // const selectedDistrictData = useMemo(() => {
  //   computeDistrictTimeSeries(data, districts, level, store.selectedDistrict);
  // }, [data]);

  // let facilitiesDataDict = {};
  // let facilityName = "";
  // let facility = null;
  // // let districtFacilitiesData = null;

  // if (level == "country") {
  //   if (data) {
  //     if (data["results"]["rows"]) {
  //       processedData = processOrgRawDataToTimeSeries(data["results"]["rows"]);
  //     }
  //   }
  // }

  // ================================================================================
  // if (level == "district") {
  //   const districtIds = districts.map((val) => val.id);
  //   const districtData = {};
  //   if (data) {
  //     if (data["results"]["rows"]) {
  //       districtIds.map((id) => {
  //         districtData[`${id}`] = data["results"]["rows"].filter(
  //           (val) => val[1] == id
  //         );
  //       });
  //     }
  //   }
  //   selectedDistrictData = districtData[store.selectedDistrict];
  // }

  // ===========================

  // if (level == "facility") {
  //   const districtFacilities =
  //     districtFacilitiesMeta[selectedDistrict]["facility_ids"];

  //   if (data) {
  //     if (data["results"]["rows"]) {
  //       districtFacilitiesData = data["results"]["rows"].filter((val) =>
  //         districtFacilities.includes(val[1])
  //       );
  //     }
  //   }

  //   if (districtFacilitiesData) {
  //     districtFacilities.map((id) => {
  //       facilitiesDataDict[`${id}`] = districtFacilitiesData.filter(
  //         (val) => val[1] == id
  //       );
  //     });
  //   }

  //   // Now with the facility raw data for the facilities in the district
  //   // Get the totals per facility
  //   const facilitiesDataTotals = {};
  //   Object.entries(facilitiesDataDict).forEach(([key, value]) => {
  //     facilitiesDataTotals[key] = processOrgDataTotal(value);
  //   });

  //   const sortedData = sortDictionary(facilitiesDataTotals);
  //   facility = sortedData.slice(0, 1).map((v) => v[0])[0];
  //   facilityName = facilitiesMeta[facility];
  // }

  // ======================================================================
  // dataViz =
  //   level == "country"
  //     ? processedData
  //     : level == "district"
  //     ? // ? selectedDistrictData !== undefined &&
  //       selectedDistrictData !== undefined &&
  //       processOrgRawDataToTimeSeries(selectedDistrictData)
  //     : facilitiesDataDict !== {} &&
  //       facility !== null &&
  //       processOrgRawDataToTimeSeries(facilitiesDataDict[facility]);

  return (
    <>
      {loading && <Loading />}
      {!loading && dataViz && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "country" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(periods[0], periods[1], dataViz, "")}
                  what="Overview:"
                  indicatorDescription={displayName}
                  level="Across the country"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Total number of ${displayName} across the country`}</h5>
                  </Col>
                </Row>
              </>
            )}

            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <Plot
                  data={processor(dataViz)}
                  layout={{
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
                    xaxis: {
                      showgrid: false,
                      zeroline: false,
                    },
                    yaxis: {
                      autorange: true,
                      showgrid: true,
                      zeroline: true,
                      zerolinecolor: "lightgray",
                      gridcolor: "lightgray",
                      rangemode: "tozero",
                    },
                  }}
                  style={{ width: "100%", height: "100%" }}
                  config={{ displayModeBar: false }}
                />
              </Col>
            </Row>
            <Download data={dataViz} />
          </Col>
        </Row>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default LineVisualizationTwo;
