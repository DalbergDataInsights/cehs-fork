import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Popover, Modal, Button } from "antd";
import info from "./info-pane.png";

//TODO: Look at the inline styling here and see how to correct it. Font size is hardcoded here

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
          <p className="text-left infotext">HIVES APP DASHBOARD</p>
        </Col>
      </Row>
      <Row>
        <Col className="align-self-center">
          <Row>
            <Col style={{ width: "80%" }}>
              <Link>
                <p
                  style={{ color: "white" }}
                  className="nav-element text-left"
                  onClick={() => showModal()}
                >
                  <span
                    className="material-icons align-middle"
                    style={{ fontSize: "1.5rem" }}
                  >
                    info
                  </span>{" "}
                  Instructions
                </p>
              </Link>
            </Col>
          </Row>
          <Row id="overview-info">
            <Col style={{ width: "80%" }}>
              <Link to="/hives/overview">
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
              <Link to="/hives/trends">
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
              <Link to="/hives/reports">
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
        <Col>
          <img src={info} />
          <p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScdo6rwminrZ4TA1r6ts7GHux74TpOmEo5CEEGbsiwet8mb7g/viewform">
              Feedback Survey Form
            </a>
          </p>
        </Col>
      </Modal>
    </div>
  );
};

export default Navigation;
