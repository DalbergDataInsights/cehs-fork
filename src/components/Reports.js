import { React, useEffect, useMemo } from "react";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { processTimeSeriesDataDict } from "../utils";
import { useDataQuery } from "@dhis2/app-runtime";
import { periodBetween, processNansum } from "../utils";
import { setPage } from "../models/Events";
import indicatorMeta from "../config/Indicators";
import MapVisualizationReports from "./MapVisualizationReports";
import LineVisualizationReports from "./LineVisualizationReports";

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
const Reports = () => {
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
  } else if (variableObject.function == "nansum") {
    variableId = variableObject.numerator.dataElementId.join(";");
  }
  console.log(`Variable Id: ${variableId}`);

  const periodType = variableObject.reportingFrequency;
  console.log(`Period Type: ${periodType}`);

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
    if (variableObject.function == "nansum") {
      if (facilityLevelData && facilityLevelData["results"]["rows"]) {
        facilityLevelData = processNansum(
          facilityLevelData["results"]["rows"],
          1
        );
      }
    }
    return facilityLevelData;
  }, [facilityLevelData]);

  facilityLevelData =
    variableObject.function == "nansum" ? processedData : facilityLevelData;

  console.log("Printing facility level data");
  console.log(facilityLevelData);

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
        periodType={periodType}
      />
      <MapVisualizationReports
        data={facilityLevelData}
        error={facilityLevelError}
        loading={facilityLevelLoading}
        maptype={"total"}
        displayName={displayName}
        periodType={periodType}
      />
      <MapVisualizationReports
        data={facilityLevelData}
        error={facilityLevelError}
        loading={facilityLevelLoading}
        maptype={"percentage"}
        displayName={displayName}
        periodType={periodType}
      />
      <LineVisualizationReports
        data={facilityLevelData}
        loading={facilityLevelLoading}
        error={facilityLevelError}
        processor={processTimeSeriesDataDict}
        level={"district"}
        displayName={displayName}
        periodType={periodType}
      />
    </div>
  );
};

export default Reports;
