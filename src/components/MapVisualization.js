import React from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import VisualizationTitle from "./VisualizationTitle";
import { $store, $indicatorDescription } from "../models/Store";
import Loading from "./Loading";
import { useAnalytics } from "../Query";
import { processMapData, processTitle } from "../utils";
import Download from "./Download";
import { Select } from "antd";
import HorizontalBar from "./HorizontalBar";
import { onPercentageOptionChange } from "../models/Events";

const { Option } = Select;

const MapVisualization = ({
  sqlView,
  parameters,
  processor,
  titleProcessor,
}) => {
  const store = useStore($store);
  const indicatorDescription = useStore($indicatorDescription);
  const { isLoading, isSuccess, isError, error, data } = useAnalytics(
    sqlView,
    parameters
  );
  return (
    <Row className="data-card mb-5 shadow-sm rounded">
      <Col>
        <Row style={{ marginBottom: 20 }}>
          <Col className="graph">
            <h5>{`Percentage change in ${indicatorDescription} between ${store.period[0].format(
              "MMM-YYYY"
            )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
          </Col>
        </Row>
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
                Compare quarters averages, using the three months periods ending
                on month of interest and month of reference
              </Option>
            </Select>
          </Col>
        </Row>
        {isLoading && <Loading />}
        {isSuccess && (
          <Row>
            <Col className="m-bot-24 p-3" xs={6}>
              <Row>
                <Col className="graph" style={{ minHeight: 480 }}>
                  <Plot
                    data={[
                      {
                        type: "choroplethmapbox",
                        // textposition: "inside",
                        // texttemplate: "%{x:,.0}",
                        // marker: { color: "rgb(184, 190, 200)" },
                        // showlegend: false,
                        // hoverinfo: "none",
                        locations: store.districts.map((ou) => ou.name),
                        z: processMapData(
                          data,
                          store.districts,
                          store.period[0].format("YYYYMM"),
                          store.period[1].format("YYYYMM")
                        ).map(({ value }) => value),
                        featureidkey: "properties.name",
                        geojson: store.rawGeojson,
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
                  <HorizontalBar
                    data={processMapData(
                      data,
                      store.districts,
                      store.period[0].format("YYYYMM"),
                      store.period[1].format("YYYYMM")
                    )}
                  />
                </Col>
              </Row>
              <Download />
            </Col>
          </Row>
        )}
        {isError && <div>{error.message}</div>}
      </Col>
    </Row>
  );
};

export default MapVisualization;
