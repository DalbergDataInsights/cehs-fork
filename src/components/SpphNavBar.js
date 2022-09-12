import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { sideBarData } from "./SideBarData";
import { IconContext } from 'react-icons';

const SpphNavBar = () => {
  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
    <IconContext.Provider value = {{color: '#fff', size: '20px'}}>
    <div className="sidebar">
      <div className="navbar">
        <Row style={{ width: "100%" }}>
          <Col className="align-self-center" xs={12}>
            <p className="text-left infotext">SPPH EMAIL APP</p>
          </Col>
        </Row>
        <Row>
          <Col className="align-self-center">
            <Row id="overview-info">
              <Col style={{ width: "80%"}}>
                {sideBarData.map((item, index) => {
                  return (
                    <>
                      <Link to={item.path} onClick={item.subNav && showSubnav}>
                        <p
                          style={{ color: "white"}}
                          className="nav-element text-left align-items-center d-flex"

                        >
                          <span
                            className="align-items-center d-flex"
                            style={{ fontSize: "1.5rem", marginRight:"5px"}}
                          >
                            {item.icon}
                          </span>
                          {" "}
                          {item.title}
                          {" "}
                          {item.subNav && subnav
                            ? item.iconOpen
                            : item.subNav
                            ? item.iconClosed
                            : null}
                        </p>
                      </Link>
                      {subnav &&
                        item.subNav?.map((item, index) => {
                          return (
                            <Link
                              style={{
                                textDecoration: "none",
                                paddingLeft: "3rem",
                                display: "flex",
                                alignItems: "center",
                              }}
                              to={item.path}
                            >
                              <p
                                style={{ color: "white" }}
                                className="nav-element text-left align-items-center d-flex"
                              >
                                <span
                                  className="material-icons align-middle align-items-center d-flex"
                                  style={{ fontSize: "1.5rem", marginRight:"5px"}}
                                >
                                  {item.icon}
                                </span>
                                {item.title}
                              </p>
                            </Link>
                          );
                        })}
                    </>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Button style={{ display: "flex", position: "absolute", bottom: "15px", left:"15px"}}>
        <Link to="/">GO TO HIVES</Link>
      </Button>
    </div>
    </IconContext.Provider>
    </>
  );
};

export default SpphNavBar;
