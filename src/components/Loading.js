import React from "react";
import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "#225E8C" }} spin />
);

const Loading = () => {
  return <Spin indicator={antIcon} />;
};

export default Loading;
