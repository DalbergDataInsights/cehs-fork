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

const LineVisualizationTwoDistrict = ({
  data,
  loading,
  error,
  processor,
  level,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log(`Selected district: ${store.selectedDistrict}`);
  const districts = store.districts;
  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];
  console.log(districtName);

  const dataViz = useMemo(() => {
    if (level == "district") {
      return computeDistrictTimeSeries(
        data,
        districts,
        level,
        store.selectedDistrict,
        periodType
      );
    }
  }, [data, store.selectedDistrict, periodType]);

  return (
    <>
      {loading && <Loading />}
      {!loading && dataViz && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "district" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(dataViz, "")}
                  what={`Deep-dive in ${districtName}`}
                  indicatorDescription={displayName}
                  level=""
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    {periodType == "monthly" && (
                      <h5>{`Total number of ${displayName} in ${districtName}`}</h5>
                    )}
                    {periodType == "quarterly" && (
                      <h5>{`Average value of ${displayName} in ${districtName}`}</h5>
                    )}
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

export default LineVisualizationTwoDistrict;
