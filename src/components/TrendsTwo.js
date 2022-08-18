import { React, useEffect } from "react";
import { Select } from "antd";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { processCountryData } from "../utils";
import LineVisualizationTwo from "./LineVisualizationTwo";
import { useDataQuery } from "@dhis2/app-runtime";
import { monthsBetween, periodBetween } from "../utils";
import { setPage } from "../models/Events";
import indicatorMeta from "../config/Indicators";
import MapVisualizationTwo from "./MapVisualizationTwo";
import TreeMapVisualization from "./TreeMapVisualization";
import LineVisualizationTwoDistrict from "./LineVisualizationTwoDistrict";
import LineVisualizationTwoFacility from "./LineVisualizationTwoFacility";

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

const myQueryFacility = {
  results: {
    resource: "analytics",
    params: ({ variableId, period, orgLevel }) => ({
      dimension: [
        `dx:${variableId}`,
        `ou:${orgLevel}`,
        `pe:${monthsBetween(
          period.map((p) => p.format("YYYY-MM" + "-01"))[0],
          period.map((p) => p.format("YYYY-MM" + "-01"))[1]
        ).join(";")}`,
      ],
      skipMeta: false,
      paging: false,
      includeNumDen: true,
    }),
  },
};

const { Option } = Select;

const TrendsTwo = () => {
  const store = useStore($store);
  const variable = store.selectedVariable;
  const period = store.period;
  let variableId = "";
  const variableObject = indicatorMeta.filter(
    (i) => i.key == store.selectedVariable
  )[0];

  if (store.page != "trends") {
    setPage("trends");
  }

  if (variableObject.function == "single") {
    variableId = variableObject.numerator.dataElementId;
  }
  console.log(`Variable Id: ${variableId}`);

  const displayName =
    variableObject !== undefined ? variableObject.displayName : "";

  const districtQuery = useDataQuery(myQuery, {
    variables: {
      variableId: variableId,
      period: period,
      orgLevel: "LEVEL-3",
    },
  });

  const districtLevelData = districtQuery.data;
  const districtLevelError = districtQuery.error;
  const districtLevelLoading = districtQuery.loading;
  const districtLevelRefetch = districtQuery.refetch;

  useEffect(() => {
    districtLevelRefetch({ variableId: variableId, period: period });
  }, [variableId, period]);

  const facilityQuery = useDataQuery(myQuery, {
    variables: {
      variableId: variableId,
      period: period,
      orgLevel: "LEVEL-5",
    },
  });

  const facilityLevelData = facilityQuery.data;
  const facilityLevelError = facilityQuery.error;
  const facilityLevelLoading = facilityQuery.loading;
  const facilityLevelRefetch = facilityQuery.refetch;

  useEffect(() => {
    facilityLevelRefetch({ variableId: variableId, period: period });
  }, [variableId, period]);

  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="analytics"
        title="Trends analysis over time, across districts and health facilities"
        subTitle="Health Insights and Visualization for Essential Health Services"
      />
      <LineVisualizationTwo
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        processor={processCountryData}
        level={"country"}
        displayName={displayName}
      />
      <MapVisualizationTwo
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        maptype={"total"}
        displayName={displayName}
      />

      <MapVisualizationTwo
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        maptype={"percentage"}
        displayName={displayName}
      />

      <LineVisualizationTwoDistrict
        data={districtLevelData}
        loading={districtLevelLoading}
        error={districtLevelError}
        processor={processCountryData}
        level={"district"}
        displayName={displayName}
      />
      <TreeMapVisualization
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        displayName={displayName}
      />

      <LineVisualizationTwoFacility
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        processor={processCountryData}
        level={"facility"}
        displayName={displayName}
      />
    </div>
  );
};

export default TrendsTwo;
