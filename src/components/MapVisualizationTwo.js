import React from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import VisualizationTitle from "./VisualizationTitle";
import { $store } from "../models/Store";
import Loading from "./Loading";
import {
  getOrgUnitDataPercentageChanges,
  getOrgUnitDataTotals,
} from "../utils";
import Download from "./Download";
import HorizontalBarTwo from "./HorizontalBarTwo";
import { Select } from "antd";
import { onPercentageOptionChange } from "../models/Events";
import indicatorMeta from "../config/Indicators";

const MapVisualizationTwo = ({ data, loading, error, maptype }) => {
  const store = useStore($store);
  console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log(periods);
  const variableObject = indicatorMeta.filter(
    (i) => i.numerator.key == store.selectedVariable
  )[0];
  console.log("Printing the variable object");
  const displayName = "";
  if (variableObject) {
    console.log(variableObject);
    console.log(`Display name: ${variableObject.displayName}`);
    displayName = variableObject.displayName;
  }

  console.log("Map");
  console.log(data);

  const districtDataTotals = getOrgUnitDataTotals(store.districts, data);
  console.log(districtDataTotals);

  const districtDataPercentages = getOrgUnitDataPercentageChanges(
    store.districts,
    data
  );
  console.log(districtDataPercentages);

  const dataViz =
    maptype == "total"
      ? getOrgUnitDataTotals(store.districts, data)
      : getOrgUnitDataPercentageChanges(store.districts, data);

  return (
    <>
      <Row className="data-card mb-5 shadow-sm rounded">
        <Col>
          <Row style={{ marginBottom: 20 }}>
            {maptype == "total" && (
              <Col className="graph">
                <h5>{`Total ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}

            {maptype == "percentage" && (
              <Col className="graph">
                <h5>{`Percentage change in ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}
          </Row>

          {maptype == "percentage" && (
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
          )}

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
                          colorscale: "Bluered",
                        },
                      ]}
                      layout={{
                        mapbox: {
                          style: "open-street-map",
                          center: { lon: 32.8, lat: 1.5 },
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
                      }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                      config={{ displayModeBar: false }}
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

export default MapVisualizationTwo;
