import { React, useEffect } from "react";
import { Select } from "antd";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { processCountryData, processTimeSeriesDataDict } from "../utils";
import LineVisualizationTwo from "./LineVisualizationTwo";
import { useDataQuery } from "@dhis2/app-runtime";
import { monthsBetween } from "../utils";
import { setPage } from "../models/Events";
import indicatorMeta from "../config/Indicators";
import MapVisualizationReportsTwo from "./MapVisualizationReportsTwo";
import LineVisualizationReports from "./LineVisualizationReports";

const myQuery = {
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

const ReportsTwo = () => {
  const store = useStore($store);
  const variable = store.selectedVariable;
  const period = store.period;
  let variableId = "";
  const variableObject = indicatorMeta.filter(
    (i) => i.key == store.selectedVariable
  )[0];

  // if (store.page != "reports") {
  //   setPage("reports");
  // }
  useEffect(() => {
    setPage("reports");
  }, []);

  // const displayName = "";
  // if (variableObject) {
  //   // console.log(variableObject);
  //   console.log(`Display name: ${variableObject.displayName}`);
  //   displayName = variableObject.displayName;
  // }
  // console.log(displayName);
  const displayName =
    variableObject !== undefined ? variableObject.displayName : "";

  if (variableObject.function == "single") {
    variableId = variableObject.numerator.dataElementId;
  }
  console.log(`Variable Id: ${variableId}`);

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
        icon="center_focus_weak"
        title="Quality of the reporting of health facilities across districts"
        subTitle="Health Insights and Visualization for Essential Health Services"
      />
      <LineVisualizationReports
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        processor={processTimeSeriesDataDict}
        level={"country"}
        displayName={displayName}
      />
      <MapVisualizationReportsTwo
        data={facilityLevelData}
        error={facilityLevelError}
        loading={facilityLevelLoading}
        maptype={"total"}
        displayName={displayName}
      />
      <MapVisualizationReportsTwo
        data={facilityLevelData}
        error={facilityLevelError}
        loading={facilityLevelLoading}
        maptype={"percentage"}
        displayName={displayName}
      />
    </div>
  );
};

export default ReportsTwo;
