import { observer } from "mobx-react";
import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useStore } from "../Context";
import { Cross } from "./Cross";
import Overview from "./Overview";
import Reports from "./Reports";
import SideBar from "./SideBar";
import { ThreeLines } from "./ThreeLines";
import { loadDefaults } from "../Query";
import Trends from "./Trends";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "#225E8C" }} spin />
);

const Wrapper = () => {
  const [open, setOpen] = useState(true);
  const { isLoading, isSuccess, isError, data, error } = loadDefaults();
  // const store = useStore();
  // if (store.loading) {
  //   return (
  //     <div className="loader">
  //       <Spin indicator={antIcon} />
  //     </div>
  //   );
  // }
  return (
    <div>
      {isLoading && (
        <LoadingOutlined style={{ fontSize: 32, color: "#225E8C" }} spin />
      )}
      {isSuccess && (
        <Router>
          <div id="ds-wrapper">
            <div className="left" style={{ width: open ? "20.5vw" : "0.5vw" }}>
              {open ? <SideBar /> : null}
              <div style={{ paddingLeft: 10 }}>
                {open ? (
                  <Cross onClick={() => setOpen(false)} />
                ) : (
                  <ThreeLines onClick={() => setOpen(true)} />
                )}
              </div>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              <Switch>
                <Route path="/overview">
                  <Overview />
                </Route>
                <Route path="/reports">
                  <Reports />
                </Route>
                <Route path="/">
                  <Trends />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      )}
      {isError && <div>{error.message}</div>}
    </div>
  );
};

export default Wrapper;
