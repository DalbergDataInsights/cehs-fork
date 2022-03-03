import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../Context";
import Download from "./Download";
import LineVisualization from "./LineVisualization";
import MapVisualization from "./MapVisualization";
import VisualizationHeader from "./VisualizationHeader";
import VisualizationTitle from "./VisualizationTitle";
import { Select } from "antd";

const { Option } = Select;

const Reports = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.loadReports();
  }, [store]);
  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="center_focus_weak"
        title="Quality of the reporting of health facilities across districts"
        subTitle="Continuity of Essential Health Services"
      />

      <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
        <Col className="m-bot-24">
          <VisualizationTitle
            analysis={store.districtAnalyticsTitle}
            what={`Deep-dive in ${store.districtName}`}
            level=""
          />
          <Row style={{ marginBottom: 20 }}>
            <Col className="graph">
              <h5>{`Total number of facilities reporting on their 105:1 form, and reporting a non-zero ${store.indicatorDescription} across the country`}</h5>
            </Col>
          </Row>
          <Row>
            <Col style={{ minHeight: 480 }}>
              <LineVisualization
                data={store.countryReport.data}
                loading={store.countryReport.loading}
                empty={store.countryReport.isEmpty}
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
              <h5>
                {`Percentage change in proportion of reporting facilities that reported a non-zero number ${
                  store.indicatorDescription
                } by district between  ${store.period[0].format(
                  "MMM-YYYY"
                )} and  ${store.period[1].format("MMM-YYYY")}`}
              </h5>
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
          <Row>
            <Col style={{ minHeight: 480 }}>
              <MapVisualization
                data={store.countryMapData.data}
                loading={store.countryMapData.loading}
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
              <h5>
                {`Proportion of reporting facilities that reported a non-zero number for ${
                  store.indicatorDescription
                } by district ${store.period[1].format("MMM-YYYY")}`}
              </h5>
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
                <Option value="3">
                  Show average between month of reference and month of interest
                  period
                </Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col style={{ minHeight: 480 }}>
              <MapVisualization
                data={store.countryMapData1.data}
                loading={store.countryMapData1.loading}
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
              <h5>{`Percentages of facilities reporting on their 105:1 form, and percentage of reporting facilities that reported a value of one or above for ${store.indicatorDescription} in ${store.districtName}`}</h5>
            </Col>
          </Row>
          <Row>
            <Col style={{ minHeight: 480 }}>
              <LineVisualization
                data={store.districtReport.data}
                loading={store.districtReport.loading}
                empty={store.districtReport.isEmpty}
              />
            </Col>
          </Row>
          <Download />
        </Col>
      </Row>
    </div>
  );
});

export default Reports;
