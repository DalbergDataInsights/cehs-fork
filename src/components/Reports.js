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
  const variableObject = indicatorMeta.filter(
    (i) => i.key == store.selectedVariable
  )[0];

  useEffect(() => {
    setPage("reports");
  }, []);

  const displayName =
    variableObject !== undefined ? variableObject.displayName : "";

  const periodType = variableObject.reportingFrequency;

  const numeratorIds = variableObject.numerator.dataElementId.join(";");
  const denominatorIds =
    variableObject.denominator.dataElementId != 1
      ? variableObject.denominator.dataElementId.join(";")
      : null;

  const variableId =
    denominatorIds == null ? numeratorIds : numeratorIds + ";" + denominatorIds;

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
    const f = func ? func({ facilityLevelData, ...args }) : null;

    return f;
  }, [facilityLevelData]);

  facilityLevelData = processedData != null ? processedData : facilityLevelData;

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
