import React, {useState} from "react";
import Controlls from "./Controlls";
import Navigation from "./Navigation";
import { Button } from "antd"
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const SideBar = () => {
  const [emailView, setEmailView] = useState(false)


  return (
    <div className="sidebar">
      <Navigation />
      <Controlls />
      <Button style={{display: "flex", position:"relative", bottom:"15px",left:"15px"}}>
        <Link to="/spph/template/edit">GO TO EMAIL APP</Link>
      </Button>
    </div>
  );
};

export default SideBar;
