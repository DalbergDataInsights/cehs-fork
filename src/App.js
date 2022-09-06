import { LoadingOutlined } from "@ant-design/icons";
import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Wrapper from "./components/WrapperCombined";
import { StoreContext } from "./Context";
import { Store } from "./Store";


const queryClient = new QueryClient();
const d2Config = {};
const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "#225E8C" }} spin />
);
const authorization =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DHIS2_AUTHORIZATION
    : null;
if (authorization) {
  d2Config.headers = { Authorization: authorization };
}

const MyApp = () => {
  return (
    <D2Shim d2Config={d2Config} i18nRoot="./i18n">
      {({ d2, d2Error }) => {
        if (d2Error) {
          return <div>Error</div>;
        } else if (!d2) {
          return (
            <div className="loader">
              <Spin indicator={antIcon} />
            </div>
          );
        } else {
          const store = new Store(d2);
          return (
            <QueryClientProvider client={queryClient}>
              <StoreContext.Provider value={store}>
                <Wrapper />
              </StoreContext.Provider>
            </QueryClientProvider>
          );
        }
      }}
    </D2Shim>
  );
};

export default MyApp;
