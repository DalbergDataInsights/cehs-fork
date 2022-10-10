import React, { useMemo, useState } from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import { $store } from "../models/Store";
import Loading from "./Loading";
import {
  getOrgUnitDataPercentageChanges,
  getOrgUnitDataTotals,
  postProcessData,
} from "../utils";
import Download from "./Download";
import HorizontalBar from "./HorizontalBar";
import { Select } from "antd";
import { onPercentageOptionChange } from "../models/Events";

const MapVisualization = ({
  data,
  loading,
  error,
  maptype,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  const period = store.period.map((p) => p.format("YYYYMM"));
  const [selectedContribution, setSelectedContribution] = useState("1");
  const dataViz = useMemo(() => {
    let finalData = null;
    if (maptype == "total") {
      let dataSelected = data;
      if (
        selectedContribution == "2" &&
        periodType == "monthly" &&
        data &&
        data["results"]["rows"]
      ) {
        dataSelected = {
          results: {
            rows: data["results"]["rows"].filter((val) => val[2] == period[1]),
          },
        };
        finalData = getOrgUnitDataTotals(
          store.districts,
          dataSelected,
          periodType
        );
      } else {
        finalData = getOrgUnitDataTotals(store.districts, data, periodType);
      }
    } else {
      finalData = getOrgUnitDataPercentageChanges(store.districts, data);
    }

    const processedFinalData = postProcessData(store.districts, finalData);
    return processedFinalData;
  }, [data, periodType, selectedContribution]);

  const colorScaleValue = maptype == "total" ? "Blues" : "RdBu";
  const reversedScaleValue = true;

  return (
    <>
      {loading && <Loading />}
      {!loading &&
        dataViz &&
        error === undefined &&
        Object.keys(dataViz).length != 0 && (
          <Row className="data-card mb-5 shadow-sm rounded">
            <Col className="m-bot-24">
              <Row style={{ marginBottom: 20 }}>
                {maptype == "total" && (
                  <Col className="graph">
                    {periodType == "monthly" && selectedContribution == "1" && (
                      <h5>{`Total ${displayName} between ${store.period[0].format(
                        "MMM-YYYY"
                      )} and ${store.period[1].format(
                        "MMM-YYYY"
                      )} by district`}</h5>
                    )}
                    {periodType == "monthly" && selectedContribution == "2" && (
                      <h5>{`Total ${displayName} in ${store.period[1].format(
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

              {maptype == "total" && (
                <Row>
                  <Col>
                    <Select
                      style={{ width: "100%", backgroundColor: "white" }}
                      size="large"
                      value={selectedContribution}
                      onChange={(val) => setSelectedContribution(val)}
                      className="dropdown-text"
                    >
                      <Option value="1" className="dropdown-text-select">
                        Show sum between month of reference and month of
                        interest period
                      </Option>
                      {periodType == "monthly" && (
                        <Option value="2" className="dropdown-text-select">
                          Show only month of interest
                        </Option>
                      )}
                      {/* <Option value="3">
                    Show average between month of reference and month of
                    interest period
                  </Option> */}
                    </Select>
                  </Col>
                </Row>
              )}

              {maptype == "percentage" && (
                <Row>
                  <Col>
                    <Select
                      style={{ width: "100%", backgroundColor: "white" }}
                      size="large"
                      value={store.selectedPercentageOption}
                      onChange={(val) => onPercentageOptionChange(val)}
                      className="dropdown-text"
                    >
                      <Option value="1" className="dropdown-text-select">
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
                              hoverinfo: "all",
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
                          config={{
                            displayModeBar: true,
                            displaylogo: false,
                            scrollZoom: false,
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
                              "resetGeo",
                              "zoomInGeo",
                              "zoomOutGeo",
                              "resetViews",
                            ],
                          }}
                        />
                      </Col>
                    </Row>
                    <Download data={dataViz} />
                  </Col>
                  <Col className="m-bot-24 p-3" xs={6}>
                    <Row>
                      <Col className="graph" style={{ minHeight: 480 }}>
                        <HorizontalBar data={dataViz} type={maptype} />
                      </Col>
                    </Row>
                    <Download data={dataViz} />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        )}
      {!dataViz && error === undefined && Object.keys(dataViz).length == 0 && (
        <h5>No data available at district level for selected period</h5>
      )}
      {error && (
        <div>
          <h5>No data available at district level for selected period</h5>
          {console.log(error.message)}
        </div>
      )}
    </>
  );
};

export default MapVisualization;
