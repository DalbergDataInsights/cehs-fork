import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Select, DatePicker } from "antd";
import { observer } from "mobx-react";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import {
  onPeriodChange,
  setSelectedVariable,
  setSelectedDistrict,
} from "../models/Events";
import indicatorMeta from "../config/Indicators";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Controlls = () => {
  const store = useStore($store);
  const [variableGroup, setVariableGroup] = useState("ALL");
  const variableGroupSetList = [
    ...new Set(indicatorMeta.map((val) => val.group)),
  ];

  variableGroupSetList.unshift("ALL");

  return (
    <Row className="p-3">
      <Col>
        <Row style={{ marginBottom: 0 }}>
          <Col>
            {store.page != "overview" && (
              <>
                <Row>
                  <Col style={{ width: "100%" }}>
                    <p className="text-left label">SELECT AN INDICATOR GROUP</p>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col>
                    <Select
                      size="large"
                      value={variableGroup}
                      style={{ width: "100%", fontSize:"calc(0.4vw + 0.4vh + 0.7vmin)" }}
                      onChange={(val) => setVariableGroup(val)}
                      className="dropdown-text"
                    >
                      {variableGroupSetList.map((i) => (
                        <Option
                          key={i}
                          value={i}
                          className="dropdown-text-select"
                        >
                          {i}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>

                <Row>
                  <Col style={{ width: "100%" }}>
                    <p className="text-left label">SELECT AN INDICATOR</p>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Col>
                    <Select
                      size="large"
                      value={store.selectedVariable}
                      style={{ width: "100%", fontSize:"calc(0.4vw + 0.4vh + 0.7vmin)" }}
                      onChange={(val) => setSelectedVariable(val)}
                      className="dropdown-text"
                    >
                      {variableGroup != "ALL"
                        ? indicatorMeta
                            .filter((i) => i.group == variableGroup)
                            .map((i) => (
                              <Option
                                key={i.id}
                                value={i.key}
                                className="dropdown-text-select"
                              >
                                {i.displayName}
                              </Option>
                            ))
                        : indicatorMeta.map((i) => (
                            <Option
                              key={i.id}
                              value={i.key}
                              className="dropdown-text-select"
                            >
                              {i.displayName}
                            </Option>
                          ))}
                    </Select>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>

        {store.page != "overview" && (
          <>
            <Row style={{ marginBottom: 0 }}>
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
                      style={{ width: "100%", fontSize:"calc(0.4vw + 0.4vh + 0.7vmin)" }}
                      onChange={(val) => setSelectedDistrict(val)}
                      className="dropdown-text"
                    >
                      {store.districts.map((i) => (
                        <Option
                          key={i.id}
                          value={i.id}
                          className="dropdown-text-select"
                        >
                          {i.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}

        <Row style={{ marginBottom: 20 }}>
          <Col>
            <Row>
              <Col style={{ width: "100%" }}>
                <p className="text-left label">SELECT TIMEFRAME</p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Col>
                <RangePicker
                  // style={{ width: "100%", height: "40px" }}
                  size="large"
                  value={store.period}
                  style={{ width: "100%" }}
                  picker="month"
                  onChange={(val) => onPeriodChange(val)}
                  className="range-picker"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(Controlls);
