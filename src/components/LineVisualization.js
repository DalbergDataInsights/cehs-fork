import { useStore } from "effector-react";
import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import { computeCountryTimeSeries, processTitle } from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";

const LineVisualization = ({
  data,
  loading,
  error,
  processor,
  level,
  displayName,
  periodType,
}) => {
  const dataViz = useMemo(() => {
    if (level == "country") {
      return computeCountryTimeSeries(data, level, periodType);
    }
  }, [data, periodType]);

  return (
    <>
      {loading && <Loading />}
      {!loading && dataViz && error === undefined && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "country" && !error && (
              <>
                <VisualizationTitle
                  analysis={processTitle(dataViz, "")}
                  what="Overview:"
                  indicatorDescription={displayName}
                  level="Across the country,"
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    {periodType == "monthly" && (
                      <h5>{`Total number of ${displayName} across the country`}</h5>
                    )}
                    {periodType == "quarterly" && (
                      <h5>{`Average value of ${displayName} across the country`}</h5>
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
                    margin: { r: 0, t: 0, b: 25, l: 0 },
                    plot_bgcolor: "rgba(255, 255, 255, 1)",
                    paper_bgcolor: "rgba(255, 255, 255, 1)",
                    xaxis: {
                      showgrid: false,
                      zeroline: false,
                    },
                    yaxis: {
                      autorange: true,
                      automargin: true,
                      showgrid: true,
                      zeroline: true,
                      zerolinecolor: "lightgray",
                      gridcolor: "lightgray",
                      rangemode: "tozero",
                    },
                  }}
                  useResizeHandler={true}
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
        <h5>No data available at country level for selected period</h5>
      )}
      {error && (
        <div>
          <h5>No data available</h5>
          {console.log(error.message)}
        </div>
      )}
    </>
  );
};

export default LineVisualization;
