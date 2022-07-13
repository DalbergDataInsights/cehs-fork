import { useStore } from "effector-react";
import React, { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import {
  computeCountryTimeSeries,
  computeDistrictTimeSeries,
  computeFacilityTimeSeries,
  filterMonthlyYearlyData,
  processCountryData,
  processOrgDataTotal,
  processTitle,
  extractDistrictData,
} from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";
import { processOrgRawDataToTimeSeries, sortDictionary } from "../utils";
import indicatorMeta from "../config/Indicators";
import districtFacilitiesMeta from "../config/DistrictFacilities";
import facilitiesMeta from "../config/Facilities";

const LineVisualizationReports = ({
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

  const dataViz = useMemo(() => {
    if (level == "country") {
      return filterMonthlyYearlyData(data, "country", null, null);
    } else if (level == "district") {
      const districtData = extractDistrictData(
        data,
        store.selectedDistrict,
        districtFacilitiesMeta
      );
      // console.log("Printing out district data");
      // console.log(districtData);

      return filterMonthlyYearlyData(
        districtData,
        "district",
        store.selectedDistrict,
        districtFacilitiesMeta
      );
    }
  }, [data, store.selectedDistrict]);

  // console.log(dataViz);

  return (
    <>
      {loading && <Loading />}
      {dataViz && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "country" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(periods[0], periods[1], dataViz, "")}
                  what="Overview:"
                  indicatorDescription={displayName}
                  level="Across the country, the proportion of facilities reporting"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Proportion of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                      "MMM-YYYY"
                    )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
                  </Col>
                </Row>
              </>
            )}

            {level == "district" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(periods[0], periods[1], dataViz, "")}
                  what={`Deep-dive in ${districtName}:`}
                  indicatorDescription={displayName}
                  level="The proportion of facilities reporting"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Proportion of reporting facilities in ${districtName} that reported a non-zero number for ${displayName} between ${store.period[0].format(
                      "MMM-YYYY"
                    )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
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

export default LineVisualizationReports;
