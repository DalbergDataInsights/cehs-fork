import React from "react";
import Controlls from "./Controlls";
import Navigation from "./Navigation";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Navigation />
      <Controlls />
    </div>
  );
};

export default SideBar;
