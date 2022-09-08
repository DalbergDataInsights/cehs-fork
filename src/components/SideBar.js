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
      <Button style={{display: "flex", position:"relative", bottom:"0px",left:"0.5vw"}}>
        <Link to="/spph/template/edit">GO TO SPPH</Link>
      </Button>
    </div>
  );
};

export default SideBar;
