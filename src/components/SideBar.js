import React, { useState } from "react";
import Controlls from "./Controlls";
import Navigation from "./Navigation";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const SideBar = () => {
  const [emailView, setEmailView] = useState(false);

  return (
    <div className="sidebar">
      <Navigation />
      <Controlls />
      <Row style={{display: "inline-block", position:"absolute", bottom:"0px",left:"15px"}}>
        <Col className="align-self-center">
          <Row id="overview-info">
            <Col style={{ width: "80%" }}>
              <Link to="/spph/template/edit">
                <p style={{ color: "white" }} className="nav-element text-left">
                  Go to email generator
                </p>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SideBar;
