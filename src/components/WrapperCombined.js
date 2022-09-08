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
import SendEmailView from "../view/SendEmailView";
import SettingsView from "../view/SettingsView";
import EmailTemplateView from "../view/EmailTemplateView";
import DeleteTemplateView from "../view/DeleteTemplateView";
import NewTemplateView from "../view/NewTemplateView";
import SpphNavBar from "./SpphNavBar";
import ProcessEmailView from "../view/ProcessEmailView";
import { DataStoreProvider } from "@dhis2/app-service-datastore";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "#225E8C" }} spin />
);

const HivesWrapper = () => {
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

const SpphWrapper = () => {
  const [open, setOpen] = useState(true);
  const [emailTargets, setEmailTargets] = useState([]);

  return (
    <>
      <DataStoreProvider namespace="spph_app_08082022">
        <Router>
        <div id="spph-wrapper">
        <div className="left" style={{ width: open ? "20.5vw" : "1.5vw" }}>
              {open ? <SpphNavBar /> : null}
              <div style={{ paddingLeft: 10 }}>
                {open ? (
                  <Cross onClick={() => setOpen(false)} />
                ) : (
                  <ThreeLines onClick={() => setOpen(true)} />
                )}
              </div>
            </div>
          <div
            style={{
              display: "flex",
              padding: "0% 3%  10px 2% ",
              flex: 1, 
              overflow: "auto"
            }}
          >
            <Switch>
              <Route path="/spph/template/edit" component={EmailTemplateView} />
              <Route path="/spph/template/new" component={NewTemplateView} />
              <Route
                path="/spph/template/delete"
                component={DeleteTemplateView}
              />
              <Route path="/spph/settings" component={SettingsView} />
              <Route path="/spph/send">
                <SendEmailView setEmailTargets={setEmailTargets} />
              </Route>
              <Route path="/spph/process">
                <ProcessEmailView
                  payload={emailTargets}
                  setPayload={setEmailTargets}
                />
              </Route>
            </Switch>
          </div>
          </div>
        </Router>
      </DataStoreProvider>
    </>
  );
};

const Wrapper = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HivesWrapper} />
        <Route path="/spph" component={SpphWrapper} />
      </Switch>
    </Router>
  );
};

export default Wrapper;
