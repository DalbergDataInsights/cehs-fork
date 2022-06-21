import React from "react";
import { useStore } from "effector-react";
import Plot from "react-plotly.js";
import { Col, Row } from "react-bootstrap";
import VisualizationTitle from "./VisualizationTitle";
import { $store } from "../models/Store";
import Loading from "./Loading";
import { getOrgUnitDataTotals } from "../utils";
import Download from "./Download";
import { Select } from "antd";
import { onPercentageOptionChange } from "../models/Events";
import indicatorMeta from "../config/Indicators";

const MapVisualizationTwo = ({ data, loading, error, maptype }) => {
  const store = useStore($store);
  console.log(store.selectedVariable);
  const periods = store.period.map((p) => p.format("YYYYMM"));
  console.log(periods);
  const variableObject = indicatorMeta.filter(
    (i) => i.numerator.key == store.selectedVariable
  )[0];
  console.log(variableObject);

  console.log("Map");
  console.log(data);

  return <></>;
};

export default MapVisualizationTwo;
