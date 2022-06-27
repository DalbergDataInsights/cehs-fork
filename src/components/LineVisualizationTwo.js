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

const LineVisualizationTwo = ({ data, loading, error, processor, level }) => {
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

  // ================================================================================
  const districts = store.districts;
  const districtIds = districts.map((val) => val.id); // Getting the ids for each district
  console.log("Printing organisation units");
  console.log(districtIds);
  const districtData = {};
  if (data) {
    if (data["results"]["rows"]) {
      districtIds.map((id) => {
        districtData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
    console.log("Printing out districts data");
    console.log(districtData);
    console.log(Object.keys(districtData));
  }

  const selectedDistrictData = districtData[store.selectedDistrict];
  console.log(`Data for this district: ${store.selectedDistrict}`);
  console.log(selectedDistrictData);

  const dataViz =
    level == "country"
      ? processedData
      : processOrgRawDataToTimeSeries(selectedDistrictData);

  return (
    <>
      {loading && <Loading />}
      {data && !loading && dataViz && (
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            {level == "country" && (
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
            )}
            {level == "district" && (
              <>
                <VisualizationTitle
                  analysis={processTitle(
                    periods[0],
                    periods[1],
                    processOrgRawDataToTimeSeries(selectedDistrictData),
                    ""
                  )}
                  what={`Deep-dive in ${districtName}`}
                  indicatorDescription={variableObject.displayName}
                  level=""
                />
                <Row style={{ marginBottom: 20 }}>
                  <Col className="graph">
                    <h5>{`Total number of ${variableObject.displayName} in ${districtName}`}</h5>
                  </Col>
                </Row>
              </>
            )}
            {/* {
              (level = "district" && (
                <VisualizationTitle
                  analysis={processTitle(
                    periods[0],
                    periods[1],
                    processOrgRawDataToTimeSeries(selectedDistrictData),
                    ""
                  )}
                  what={`Deep-dive in ${districtName}`}
                  indicatorDescription={variableObject.displayName}
                  level=""
                />
              ))
            } */}
            {/* {level == "district" && (
              <Row style={{ marginBottom: 20 }}>
                <Col className="graph">
                  <h5>{`Total number of ${variableObject.displayName} in ${districtName}`}</h5>
                </Col>
              </Row>
            )} */}

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
            <Download />
          </Col>
        </Row>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default LineVisualizationTwo;
