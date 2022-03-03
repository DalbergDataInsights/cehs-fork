import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
// import { useStore } from "../Context";
import Download from "./Download";
import HorizontalBar from "./HorizontalBar";
import LineVisualization from "./LineVisualization";
import MapVisualization from "./MapVisualization";
import TreeMap from "./TreeMap";
import VisualizationHeader from "./VisualizationHeader";
import VisualizationTitle from "./VisualizationTitle";
import { useStore } from "effector-react";
import { $store, $indicatorDescription } from "../models/Store";
import { processCountryData } from "../utils";

const { Option } = Select;

const Trends = () => {
  const store = useStore($store);
  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="analytics"
        title="Trends analysis over time, across districts and health facilities"
        subTitle="Continuity of Essential Health Services"
      />
      <LineVisualization
        sqlView="Qc8cZsEJCyr"
        processor={processCountryData}
        parameters={{
          columns: "monthly",
          value: store.selectedDataElement,
          value1: "2018",
          value2: "2021",
        }}
      />
      <MapVisualization
        sqlView="dg4aQ4VY416"
        processor={processCountryData}
        parameters={{
          columns: "uidlevel3",
          additional: "monthly",
          column: "monthly",
          value: store.selectedDataElement,
          value1: store.period[0].format("YYYYMM"),
          value2: store.period[1].format("YYYYMM"),
        }}
      />

      {/* 

      <Row className="data-card mb-5 p-3 shadow-sm rounded">
        <Col>
          <Row style={{ marginBottom: 20 }}>
            <Col className="graph">
              <h5>{`Total number of ${
                store.indicatorDescription
              } on ${store.period[1].format("MMM-YYYY")} by district`}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Select
                style={{ width: "100%" }}
                size="large"
                value={store.selectedTotalOption}
                onChange={store.onTotalOptionChange}
              >
                <Option value="1">Show month of interest</Option>
                <Option value="2">
                  Show sum between month of reference and month of interest
                  period
                </Option>
                <Option value="3">
                  Show average between month of reference and month of interest
                  period
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col className="m-bot-24 p-3" xs={6}>
              <Row>
                <Col className="graph" style={{ minHeight: 480 }}>
                  <MapVisualization
                    data={store.geojson1.data}
                    loading={store.geojson1.loading}
                  />
                </Col>
              </Row>
              <Download />
            </Col>
            <Col className="m-bot-24 p-3" xs={6}>
              <Row>
                <Col className="graph" style={{ minHeight: 480 }}>
                  <HorizontalBar
                    data={store.horizontalData1.data}
                    loading={store.horizontalData1.loading}
                    empty={store.horizontalData1.empty}
                  />
                </Col>
              </Row>
              <Download />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="data-card shadow-sm p-3 mb-5 rounded">
        <Col className="m-bot-24">
          <VisualizationTitle
            analysis={store.districtAnalyticsTitle}
            what={`Deep-dive in ${store.districtName}`}
            level=""
          />
          <Row style={{ marginBottom: 20 }}>
            <Col className="graph">
              <h5>{`Total number of ${store.indicatorDescription} in ${store.districtName}`}</h5>
            </Col>
          </Row>
          <Row>
            <Col className="graph" style={{ minHeight: 480 }}>
              <LineVisualization
                data={store.acrossDistrict.data}
                loading={store.acrossDistrict.loading}
                empty={store.acrossDistrict.isEmpty}
              />
            </Col>
          </Row>
          <Download />
        </Col>
      </Row>

      <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
        <Col className="m-bot-24">
          <Row style={{ marginBottom: 20 }}>
            <Col className="graph">
              <h5>{`Contribution of individual facilities in ${
                store.districtName
              } to the  ${
                store.indicatorDescription
              } on ${store.period[0].format("MMM-YYYY")}`}</h5>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Select
                style={{ width: "100%" }}
                size="large"
                value={store.selectedContributionOption}
                onChange={store.onContributionOptionChange}
              >
                <Option value="1">Show month of interest</Option>
                <Option value="2">
                  Show sum between month of reference and month of interest
                  period
                </Option>
                <Option value="3">
                  Show average between month of reference and month of interest
                  period
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col className="graph" style={{ minHeight: 480 }}>
              <TreeMap
                data={store.treeData.data}
                loading={store.treeData.loading}
                empty={store.treeData.isEmpty}
              />
            </Col>
          </Row>
          <Download />
        </Col>
      </Row>

      <Row className="data-card shadow-sm mb-5 p-3 rounded">
        <Col className="m-bot-24">
          <Row>
            <Col className="graph">
              <h5>{`Evolution of number of ${store.indicatorDescription} in ${store.currentFacility}`}</h5>
            </Col>
          </Row>
          <Row>
            <Col className="graph" style={{ minHeight: 480 }}>
              <LineVisualization
                data={store.facilityData.data}
                loading={store.facilityData.loading}
                empty={store.facilityData.isEmpty}
              />
            </Col>
          </Row>
          <Download />
        </Col>
      </Row> */}
    </div>
  );
};

export default Trends;
