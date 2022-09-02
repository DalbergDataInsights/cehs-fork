import React, { useMemo } from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import VisualizationTitle from "./VisualizationTitle";
import { $store } from "../models/Store";
import Loading from "./Loading";
import {
  getOrgUnitDataAverages,
  getOrgUnitDataPercentageChanges,
  getOrgUnitDataTotals,
  processDataPercentOfAverages,
} from "../utils";
import Download from "./Download";
import HorizontalBarTwo from "./HorizontalBarTwo";
import { Select } from "antd";
import { onPercentageOptionChange } from "../models/Events";
import indicatorMeta from "../config/Indicators";

const MapVisualization = ({
  data,
  loading,
  error,
  maptype,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  const dataViz = useMemo(() => {
    if (maptype == "total") {
      if (periodType == "monthly") {
        return getOrgUnitDataTotals(store.districts, data);
      } else if (periodType == "quarterly") {
        return getOrgUnitDataAverages(store.districts, data);
      }
    } else {
      if (periodType == "monthly") {
        return getOrgUnitDataPercentageChanges(store.districts, data);
      } else if (periodType == "quarterly") {
        return processDataPercentOfAverages(store.districts, data);
      }
    }
  }, [data, periodType]);

  const colorScaleValue = maptype == "total" ? "Blues" : "RdBu";
  const reversedScaleValue = true;

  return (
    <>
      <Row className="data-card mb-5 shadow-sm rounded">
        <Col>
          <Row style={{ marginBottom: 20 }}>
            {maptype == "total" && (
              <Col className="graph">
                {periodType == "monthly" && (
                  <h5>{`Total ${displayName} between ${store.period[0].format(
                    "MMM-YYYY"
                  )} and ${store.period[1].format(
                    "MMM-YYYY"
                  )} by district`}</h5>
                )}
                {periodType == "quarterly" && (
                  <h5>{`Average value of ${displayName} between ${store.period[0].format(
                    "MMM-YYYY"
                  )} and ${store.period[1].format(
                    "MMM-YYYY"
                  )} by district`}</h5>
                )}
              </Col>
            )}

            {maptype == "percentage" && (
              <Col className="graph">
                {periodType == "monthly" && (
                  <h5>{`Percentage change in total ${displayName} between ${store.period[0].format(
                    "MMM-YYYY"
                  )} and ${store.period[1].format(
                    "MMM-YYYY"
                  )} by district`}</h5>
                )}

                {periodType == "quarterly" && (
                  <h5>{`Percentage change in average value of ${displayName} between ${store.period[0].format(
                    "MMM-YYYY"
                  )} and ${store.period[1].format(
                    "MMM-YYYY"
                  )} by district`}</h5>
                )}
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
                  {/* <Option value="2">
                    Compare quarters averages, using the three months periods
                    ending on month of interest and month of reference
                  </Option> */}
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
                          colorscale: colorScaleValue,
                          reversescale: reversedScaleValue,
                        },
                      ]}
                      layout={{
                        mapbox: {
                          style: "open-street-map",
                          // center: { lon: 32.8, lat: 1.5 },
                          center: { lon: 32.3, lat: 1.3 },
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
                        dragMode: false,
                      }}
                      useResizeHandler={true}
                      style={{ width: "100%", height: "100%" }}
                      config={{ displayModeBar: false, scrollZoom: false }}
                    />
                  </Col>
                </Row>
                <Download data={dataViz} />
              </Col>
              <Col className="m-bot-24 p-3" xs={6}>
                <Row>
                  <Col className="graph" style={{ minHeight: 480 }}>
                    <HorizontalBarTwo data={dataViz} type={maptype} />
                  </Col>
                </Row>
                <Download data={dataViz} />
              </Col>
            </Row>
          )}
        </Col>
        {error && <div>{error.message}</div>}
      </Row>
    </>
  );
};

export default MapVisualization;
