import { useStore } from "effector-react";
import { React } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import { processTitle } from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";
import { processOrgRawDataToTimeSeries } from "../utils";
import indicatorMeta from "../config/Indicators";

const LineVisualizationTwo = ({ data, loading, error, processor }) => {
  const store = useStore($store);
  console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log(periods);
  const variableObject = indicatorMeta.filter(
    (i) => i.key == store.selectedVariable
  )[0];
  console.log(`Variable object: ${variableObject}`);
  console.log(`Selected district: ${store.selectedDistrict}`);

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];
  console.log(districtName);

  let processedData = null;

  if (data) {
    if (data["results"]["rows"]) {
      processedData = processOrgRawDataToTimeSeries(data["results"]["rows"]);
      console.log(processedData);
    }
  }

  return (
    <>
      {loading && <Loading />}
      {data && !loading && processedData && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            <VisualizationTitle
              analysis={processTitle(
                periods[0],
                periods[1],
                processOrgRawDataToTimeSeries(data["results"]["rows"]),
                ""
              )}
              what="Overview:"
              indicatorDescription={variableObject.displayName}
              level="Across the country"
            />

            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <Plot
                  data={processor(
                    processOrgRawDataToTimeSeries(data["results"]["rows"])
                  )}
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
            <Download />
          </Col>
        </Row>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default LineVisualizationTwo;
