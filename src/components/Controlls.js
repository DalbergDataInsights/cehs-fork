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

  console.log(store.period);

  return (
    <Row className="p-3">
      <Col>
        <Row style={{ marginBottom: 20 }}>
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
                      style={{ width: "100%" }}
                      onChange={(val) => setVariableGroup(val)}
                    >
                      {variableGroupSetList.map((i) => (
                        <Option key={i} value={i}>
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
                      style={{ width: "100%" }}
                      onChange={(val) => setSelectedVariable(val)}
                    >
                      {variableGroup != "ALL"
                        ? indicatorMeta
                            .filter((i) => i.group == variableGroup)
                            .map((i) =>
                              i.function == "single" ? (
                                <Option key={i.id} value={i.key}>
                                  {i.displayName}
                                </Option>
                              ) : (
                                <Option key={i.id} value="disabled" disabled>
                                  {i.displayName}
                                </Option>
                              )
                            )
                        : indicatorMeta.map((i) =>
                            i.function == "single" ? (
                              <Option key={i.id} value={i.key}>
                                {i.displayName}
                              </Option>
                            ) : (
                              <Option key={i.id} value="disabled" disabled>
                                {i.displayName}
                              </Option>
                            )
                          )}
                    </Select>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>

        {store.page != "overview" && (
          <>
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
                      onChange={(val) => setSelectedDistrict(val)}
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
      </Col>
    </Row>
  );
};

export default Controlls;
