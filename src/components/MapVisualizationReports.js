import React, { useMemo } from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import { $store } from "../models/Store";
import Loading from "./Loading";
import {
  computeReportingProportions,
  filterStartPeriodEndPeriodData,
  monthsToQuarters,
} from "../utils";
import Download from "./Download";
import HorizontalBar from "./HorizontalBar";
import districtFacilitiesMeta from "../config/DistrictFacilities";

const MapVisualizationReports = ({
  data,
  loading,
  error,
  maptype,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  // console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log("Printing out the periods in map visualization reports");
  console.log(periods);
  // console.log(periodType);

  const dataViz = useMemo(() => {
    if (maptype == "total") {
      return computeReportingProportions(
        data,
        "total",
        districtFacilitiesMeta,
        store.districts
      );
    } else if (maptype == "percentage") {
      const quarterPeriods =
        periodType == "quarterly" ? monthsToQuarters(periods) : null;

      console.log(`Printing out the quarters: ${quarterPeriods}`);
      console.log(`Periods: ${periods}`);

      const filteredData =
        periodType == "monthly"
          ? filterStartPeriodEndPeriodData(data, periods)
          : filterStartPeriodEndPeriodData(data, quarterPeriods);

      console.log(`Period type: ${periodType}`);
      console.log("Printing out the filtered data");
      console.log(filteredData);

      if (filteredData) {
        const startReporting = computeReportingProportions(
          filteredData[0],
          "total",
          districtFacilitiesMeta,
          store.districts
        );

        const endReporting = computeReportingProportions(
          filteredData[1],
          "total",
          districtFacilitiesMeta,
          store.districts
        );

        const reportingPercentages = {};
        Object.entries(startReporting).forEach(([key, value]) => {
          if (startReporting[key] == 0) {
            reportingPercentages[key] = parseFloat(
              ((endReporting[key] - startReporting[key]) /
                (startReporting[key] + 1)) *
                100
            ).toFixed(2);
          } else {
            reportingPercentages[key] = parseFloat(
              ((endReporting[key] - startReporting[key]) /
                startReporting[key]) *
                100
            ).toFixed(2);
          }
        });

        return reportingPercentages;
      }
    }
  }, [data, store.period, periodType]);

  const colorScaleValue = maptype == "total" ? "Blues" : "RdBu";
  const reversedScaleValue = true;

  return (
    <>
      <Row className="data-card mb-5 shadow-sm rounded">
        <Col>
          <Row style={{ marginBottom: 20 }}>
            {maptype == "total" && (
              <Col className="graph">
                <h5>{`Percentage of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}

            {maptype == "percentage" && (
              <Col className="graph">
                <h5>{`Percentage change in percentage of reporting facilities that reported a non-zero number for ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")} by district`}</h5>
              </Col>
            )}
          </Row>

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
                    <HorizontalBar data={dataViz} type={"percentage"} />
                  </Col>
                </Row>
                <Download data={dataViz} />
              </Col>
            </Row>
          )}
        </Col>
        {error && <div>Data Fetch Error: {error.message}</div>}
      </Row>
    </>
  );
};

export default MapVisualizationReports;
