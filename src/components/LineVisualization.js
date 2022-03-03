import { useStore } from "effector-react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store, $indicatorDescription } from "../models/Store";
import { useAnalytics } from "../Query";
import { processTitle } from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";

const LineVisualization = ({
  sqlView,
  parameters,
  processor,
  titleProcessor,
}) => {
  const store = useStore($store);
  const indicatorDescription = useStore($indicatorDescription);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  const { isLoading, isSuccess, isError, error, data } = useAnalytics(
    sqlView,
    parameters
  );

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            <VisualizationTitle
              analysis={processTitle(periods[0], periods[1], data, "")}
              what="Overview:"
              indicatorDescription={indicatorDescription}
              level="Across the country"
            />
            <Row>
              <Col className="graph">
                <h5>{`Total number of ${indicatorDescription} across the country`}</h5>
              </Col>
            </Row>
            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <Plot
                  data={processor(data)}
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
                    margin: { r: 0, t: 0, b: 25, l: 25 },
                    plot_bgcolor: "rgba(255, 255, 255, 1)",
                    paper_bgcolor: "rgba(255, 255, 255, 1)",
                    xaxis: {
                      showgrid: false,
                      zeroline: false,
                    },
                    yaxis: {
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
      {isError && <div>{error.message}</div>}
    </>
  );
};

export default LineVisualization;
