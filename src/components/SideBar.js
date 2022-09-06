import React, {useState} from "react";
import Controlls from "./Controlls";
import Navigation from "./Navigation";
import { Button } from "antd"
import { Link } from "react-router-dom";

const SideBar = () => {
  const [emailView, setEmailView] = useState(false)


  return (
    <div className="sidebar">
      <Navigation />
      <Controlls />
      <Button style={{display: "flex", position:"absolute", bottom:"0px", justifyContent:"center"}}>
        <Link to="/spph/template/edit">GO TO SPPH</Link>
      </Button>
    </div>
  );
};

export default SideBar;
