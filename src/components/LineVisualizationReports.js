import { useStore } from "effector-react";
import React, { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import {
  filterMonthlyYearlyData,
  processTitle,
  extractDistrictData,
} from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";
import districtFacilitiesMeta from "../config/DistrictFacilities";

const LineVisualizationReports = ({
  data,
  loading,
  error,
  processor,
  level,
  displayName,
  periodType,
}) => {
  const store = useStore($store);

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];

  const dataViz = useMemo(() => {
    if (level == "country") {
      return filterMonthlyYearlyData(data, "country", null, null);
    } else if (level == "district") {
      const districtData = extractDistrictData(
        data,
        store.selectedDistrict,
        districtFacilitiesMeta
      );
      return filterMonthlyYearlyData(
        districtData,
        "district",
        store.selectedDistrict,
        districtFacilitiesMeta
      );
    }
  }, [data, store.selectedDistrict]);

  return (
    <>
      {loading && <Loading />}
      {!loading && dataViz && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "country" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(dataViz, "")}
                  what="Overview:"
                  indicatorDescription={displayName}
                  level="Across the country, the percentage of facilities reporting"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Percentage of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                      "MMM-YYYY"
                    )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
                  </Col>
                </Row>
              </>
            )}

            {level == "district" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(dataViz, "")}
                  what={`Deep-dive in ${districtName}:`}
                  indicatorDescription={displayName}
                  level="The percentage of facilities reporting"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Percentage of reporting facilities in ${districtName} that reported a non-zero number for ${displayName} between ${store.period[0].format(
                      "MMM-YYYY"
                    )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
                  </Col>
                </Row>
              </>
            )}

            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <Plot
                  data={processor(dataViz, periodType)}
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
                  config={{
                    displayModeBar: "hover",
                    displaylogo: false,
                    toImageButtonOptions: {
                      filename: "hives_download",
                      format: "png",
                      scale: 1,
                      width: 700,
                      height: 500,
                    },
                    modeBarButtonsToRemove: [
                      "pan2d",
                      "select2d",
                      "lasso2d",
                      "resetScale2d",
                      "toggleHover",
                      "zoom2d",
                      "zoomIn2d",
                      "zoomOut2d",
                      "autoScale2d",
                      "hoverClosestCartesian",
                      "hoverCompareCartesian",
                      "toggleSpikelines",
                    ],
                  }}
                />
              </Col>
            </Row>
            <Download data={dataViz} />
          </Col>
        </Row>
      )}
      {!dataViz && error === undefined && !loading && (
        <h5>No data available at facility level for selected period</h5>
      )}

      {error && (
        <div>
          <h5>No data available at facility level for selected time period</h5>
          {console.log(error.message)}
        </div>
      )}
    </>
  );
};

export default LineVisualizationReports;
