import { useStore } from "effector-react";
import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Plot from "react-plotly.js";
import { $store } from "../models/Store";
import { computeDistrictTimeSeries, processTitle } from "../utils";
import Download from "./Download";
import Loading from "./Loading";
import VisualizationTitle from "./VisualizationTitle";

const LineVisualizationDistrict = ({
  data,
  loading,
  error,
  processor,
  level,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  const districts = store.districts;
  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];

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
      {!loading &&
        dataViz &&
        error === undefined &&
        Object.keys(dataViz).length != 0 && (
          <Row className="data-card shadow-sm mb-5 rounded">
            <Col className="m-bot-24">
              {level == "district" && (
                <>
                  <VisualizationTitle
                    analysis={processTitle(dataViz, "")}
                    what={`Deep-dive in ${districtName}:`}
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

      {!dataViz &&
        error === undefined &&
        !loading &&
        Object.keys(dataViz).length != 0 && (
          <h5>No data available at district level for selected period</h5>
        )}
      {error && (
        <div>
          <h5>No data available at district level</h5>
          {console.log(error.message)}
        </div>
      )}
    </>
  );
};

export default LineVisualizationDistrict;
