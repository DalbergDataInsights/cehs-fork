import React from "react";
import { Col, Row } from "react-bootstrap";
import { Select, DatePicker } from "antd";
import { observer } from "mobx-react";
import { useStore } from "effector-react";
import { $selectedDataElements, $store } from "../models/Store";
import {
  setSelectedDataElementGroup,
  onPolicyChange,
  setSelectedDataElement,
  onPeriodChange,
} from "../models/Events";
// import { useStore } from "../Context";
const { Option } = Select;
const { RangePicker } = DatePicker;
const Controlls = () => {
  const store = useStore($store);
  const selectedDataElements = useStore($selectedDataElements);
  return (
    <Row className="p-3">
      <Col>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <Row>
              <Col style={{ width: "100%" }}>
                <p className="text-left label">SELECT AN INDICATOR</p>
              </Col>
            </Row>

            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Select
                  size="large"
                  value={store.selectedDataElementGroup}
                  style={{ width: "100%" }}
                  onChange={(val) => setSelectedDataElementGroup(val)}
                >
                  {store.dataElementGroups.map((i) => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Select
                  size="large"
                  value={store.selectedDataElement}
                  style={{ width: "100%" }}
                  onChange={(val) => setSelectedDataElement(val)}
                >
                  {selectedDataElements.map((i) => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            {/* <Row style={{ marginBottom: 10 }}>
                <Col>
                  <Select
                    size="large"
                    value={store.selectedIndicator}
                    style={{ width: "100%" }}
                    onChange={store.onIndicatorChange}
                  >
                    {store.indicators.map((i) => (
                      <Option key={i.id} value={i.id}>
                        {i.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row> */}
          </Col>
        </Row>
        {store.shown && (
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Row>
                <Col style={{ width: "100%" }}>
                  <p className="text-left label">SELECT DISTRICT</p>
                </Col>
              </Row>

              <Row style={{ marginBottom: 10 }}>
                <Col>
                  <Select
                    size="large"
                    value={store.selectedDistrict}
                    style={{ width: "100%" }}
                    onChange={store.onDistrictChange}
                  >
                    {store.districts.map((i) => (
                      <Option key={i.id} value={i.id}>
                        {i.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        )}

        <Row style={{ marginBottom: 20 }}>
          <Col>
            <Row>
              <Col style={{ width: "100%" }}>
                <p className="text-left label">SELECT ANALYSIS TIMEFRAME</p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <RangePicker
                  // style={{ width: "100%" }}
                  size="large"
                  picker="month"
                  value={store.period}
                  onChange={(val) => onPeriodChange(val)}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col>
            <Row>
              <Col style={{ width: "100%" }}>
                <p className="text-left label">
                  SELECT OUTLIER POLICY
                  <span className="material-icons align-middle logo-controll">
                    info
                  </span>
                </p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <Select
                  size="large"
                  value={store.selectedPolicy}
                  style={{ width: "100%" }}
                  onChange={(val) => onPolicyChange(val)}
                >
                  <Option value="Keep outliers">Keep outliers</Option>
                  <Option value="Correct outliers using SD">
                    Correct outliers - using standard deviation
                  </Option>
                  <Option value="Correct outliers using ICR">
                    Correct outliers - using interquartile range
                  </Option>
                  <Option value="Report">Report</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Controlls;
