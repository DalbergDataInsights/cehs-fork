import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Popover, Modal, Button } from "antd";

import info from "./info-pane.png";

const Navigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="navbar">
      <Row style={{ width: "100%" }}>
        <Col className="align-self-center" xs={12}>
          <p className="text-left infotext">
            CEHS APP DASHBOARDS
            <Popover content={<span>Click for more information</span>}>
              <span
                className="material-icons align-middle infoicon"
                onClick={() => showModal()}
              >
                info
              </span>
            </Popover>
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="align-self-center">
          <Row id="overview-info">
            <Col style={{ width: "80%" }}>
              <Link to="/overview">
                <p style={{ color: "white" }} className="nav-element text-left">
                  <span
                    className="material-icons align-middle"
                    style={{ fontSize: "1.5rem" }}
                  >
                    language
                  </span>{" "}
                  Overview
                </p>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "80%" }}>
              <Link to="/trends">
                <p
                  id="trends"
                  style={{ color: "white" }}
                  className="nav-element text-left"
                >
                  <span
                    className="material-icons align-middle"
                    style={{ fontSize: "1.5rem" }}
                  >
                    analytics
                  </span>{" "}
                  Trends
                </p>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col style={{ width: "80%" }}>
              <Link to="/reports">
                <p
                  id="reporting"
                  style={{ color: "white" }}
                  className="nav-element text-left"
                >
                  <span
                    className="material-icons align-middle"
                    style={{ fontSize: "1.5rem" }}
                  >
                    center_focus_weak
                  </span>{" "}
                  Data quality
                </p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        title="How to use the tool"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1225}
        footer={[
          <Button key="back" onClick={handleOk}>
            Close
          </Button>,
        ]}
      >
        <img src={info} />
      </Modal>
    </div>
  );
};

export default Navigation;
