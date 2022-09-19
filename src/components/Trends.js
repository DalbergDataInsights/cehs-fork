import { React, useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { processCountryData, processNansum } from "../utils";
import LineVisualization from "./LineVisualization";
import { useDataQuery } from "@dhis2/app-runtime";
import { periodBetween } from "../utils";
import { setPage } from "../models/Events";
import indicatorMeta from "../config/Indicators";
import MapVisualization from "./MapVisualization";
import TreeMapVisualization from "./TreeMapVisualization";
import LineVisualizationDistrict from "./LineVisualizationDistrict";
import LineVisualizationFacility from "./LineVisualizationFacility";

const myQuery = {
  results: {
    resource: "analytics",
    params: ({ variableId, period, orgLevel, periodType }) => ({
      dimension: [
        `dx:${variableId}`,
        `ou:${orgLevel}`,
        `pe:${periodBetween(
          period.map((p) => p.format("YYYY-MM" + "-01"))[0],
          period.map((p) => p.format("YYYY-MM" + "-01"))[1],
          periodType
        ).join(";")}`,
      ],
      skipMeta: false,
      paging: false,
      includeNumDen: true,
    }),
  },
};

const { Option } = Select;

const Trends = () => {
  const store = useStore($store);
  const variable = store.selectedVariable;
  const period = store.period;
  const variableObject = indicatorMeta.filter(
    (i) => i.key == store.selectedVariable
  )[0];

  if (store.page != "trends") {
    setPage("trends");
  }

  const numeratorIds = variableObject.numerator.dataElementId.join(";");
  console.log("Printing numerator ids");
  console.log(numeratorIds);
  const denominatorIds =
    variableObject.denominator.dataElementId != 1
      ? variableObject.denominator.dataElementId.join(";")
      : null;
  console.log("Printing denominator ids");
  console.log(denominatorIds);
  const variableId =
    denominatorIds == null ? numeratorIds : numeratorIds + ";" + denominatorIds;
  console.log(`Variable Id: ${variableId}`);

  const displayName =
    variableObject !== undefined ? variableObject.displayName : "";

  const periodType = variableObject.reportingFrequency;
  console.log(`Period Type: ${periodType}`);

  const districtQuery = useDataQuery(myQuery, {
    variables: {
      variableId: variableId,
      period: period,
      orgLevel: "LEVEL-3",
      periodType: periodType,
    },
  });

  let districtLevelData = districtQuery.data;
  const districtLevelError = districtQuery.error;
  const districtLevelLoading = districtQuery.loading;
  const districtLevelRefetch = districtQuery.refetch;

  useEffect(() => {
    districtLevelRefetch({
      variableId: variableId,
      period: period,
      periodType: periodType,
    });
  }, [variableId, period, periodType]);

  const facilityQuery = useDataQuery(myQuery, {
    variables: {
      variableId: variableId,
      period: period,
      orgLevel: "LEVEL-5",
      periodType: periodType,
    },
  });

  let facilityLevelData = facilityQuery.data;
  const facilityLevelError = facilityQuery.error;
  const facilityLevelLoading = facilityQuery.loading;
  const facilityLevelRefetch = facilityQuery.refetch;

  useEffect(() => {
    facilityLevelRefetch({
      variableId: variableId,
      period: period,
      periodType: periodType,
    });
  }, [variableId, period, periodType]);

  const processedData = useMemo(() => {
    const meta = indicatorMeta.filter(
      (el) => el.key == store.selectedVariable
    )[0];

    const func = meta.processingFunction;
    const args = meta.arguments || {};

    const d = func ? func({ districtLevelData, ...args }) : null;
    const f = func ? func({ facilityLevelData, ...args }) : null;

    return [d, f];
  }, [districtLevelData, facilityLevelData]);

  districtLevelData =
    processedData[0] != null ? processedData[0] : districtLevelData;
  facilityLevelData =
    processedData[1] != null ? processedData[1] : facilityLevelData;

  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="analytics"
        title="Trends analysis over time, across districts and health facilities"
        subTitle="Health Insights and Visualization for Essential Health Services"
      />
      <LineVisualization
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        processor={processCountryData}
        level={"country"}
        displayName={displayName}
        periodType={periodType}
      />
      <MapVisualization
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        maptype={"total"}
        displayName={displayName}
        periodType={periodType}
      />
      <MapVisualization
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        maptype={"percentage"}
        displayName={displayName}
        periodType={periodType}
      />
      <LineVisualizationDistrict
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        processor={processCountryData}
        level={"district"}
        displayName={displayName}
        periodType={periodType}
      />

      <TreeMapVisualization
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        displayName={displayName}
        periodType={periodType}
      />

      <LineVisualizationFacility
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        processor={processCountryData}
        displayName={displayName}
        level={"facility"}
        periodType={periodType}
      />
    </div>
  );
};

export default Trends;
