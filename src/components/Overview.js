import { React, useEffect, useMemo } from "react";
import { Select } from "antd";
import { Col, Row } from "react-bootstrap";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import {
  processNansum,
  processOrgDataTotal,
  processOrgUnitDataPercent,
} from "../utils";
import { useDataQuery } from "@dhis2/app-runtime";
import { monthsBetween } from "../utils";
import { setPage } from "../models/Events";
import overviewIndicatorMeta from "../config/OverviewIndicators";
import TextVisualization from "./TextVisualization";
import Loading from "./Loading";

const myQuery = {
  results: {
    resource: "analytics",
    params: ({ variableId, period, orgLevel }) => ({
      dimension: [
        `dx:${variableId.join(";")}`,
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

const myQueryNansum = {
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

const Overview = () => {
  const store = useStore($store);
  const period = store.period;

  useEffect(() => {
    setPage("overview");
  }, []);

  const overviewIndicatorsIds = overviewIndicatorMeta
    .filter((i) => i.function == "single")
    .map((i) => i.numerator.dataElementId);
  const overviewIndicatorsNames = overviewIndicatorMeta
    .filter((i) => i.function == "single")
    .map((i) => i.displayName);

  const nationalQuery = useDataQuery(myQuery, {
    variables: {
      variableId: overviewIndicatorsIds,
      period: period,
      orgLevel: "LEVEL-1",
    },
  });

  const data = nationalQuery.data;
  const error = nationalQuery.error;
  const loading = nationalQuery.loading;
  const nationalLevelRefetch = nationalQuery.refetch;

  useEffect(() => {
    nationalLevelRefetch({ variableId: overviewIndicatorsIds, period: period });
  }, [period]);

  const indicatorData = {};
  if (data) {
    if (data["results"]["rows"]) {
      overviewIndicatorsIds.map((id) => {
        indicatorData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[0] == id
        );
      });
    }
  }

  const indicatorDataTotals = {};
  Object.entries(indicatorData).forEach(([key, value]) => {
    indicatorDataTotals[key] = processOrgDataTotal(value);
  });

  const indicatorDataPercentages = {};
  Object.entries(indicatorData).forEach(([key, value]) => {
    indicatorDataPercentages[key] = processOrgUnitDataPercent(value);
  });

  const overview = [];
  if (Object.entries(indicatorDataTotals)) {
    if (Object.entries(indicatorDataPercentages)) {
      for (let idx = 0; idx < overviewIndicatorsIds.length; idx++) {
        overview.push({
          title: overviewIndicatorsNames[idx],
          total: indicatorDataTotals[overviewIndicatorsIds[idx]],
          percentage: indicatorDataPercentages[overviewIndicatorsIds[idx]],
        });
      }
    }
  }

  // Now do the same for the nansum computations
  const nansumOverviewIndicators = overviewIndicatorMeta.filter(
    (i) => i.function == "nansum"
  );

  const nansumOverviewIndicatorsDataElementIds = nansumOverviewIndicators.map(
    (i) => i.numerator.dataElementId
  );

  const nansumOverviewIndicatorsNames = overviewIndicatorMeta.map(
    (i) => i.displayName
  );

  const nansumIds = nansumOverviewIndicatorsDataElementIds
    .map((val) => val.join(";"))
    .join(";");

  const nansumNationalQuery = useDataQuery(myQueryNansum, {
    variables: {
      variableId: nansumIds,
      period: period,
      orgLevel: "LEVEL-1",
    },
  });

  const nansumData = nansumNationalQuery.data;
  const nansumError = nansumNationalQuery.error;
  const nansumLoading = nansumNationalQuery.loading;
  const nansumNationalLevelRefetch = nansumNationalQuery.refetch;

  useEffect(() => {
    nansumNationalLevelRefetch({ variableId: nansumIds, period: period });
  }, [period]);

  let processedData = [];
  processedData = useMemo(() => {
    if (
      nansumData &&
      nansumData["results"]["rows"] &&
      nansumData["results"]["rows"].length != 0
    ) {
      nansumOverviewIndicators.forEach((ind) => {
        // Extract data for only ids for a specific indicator
        const indData = nansumData["results"]["rows"].filter((val) =>
          ind.numerator.dataElementId.includes(val[0])
        );
        const nansumDataProcessed = processNansum(indData, 1);
        const nansumDataTotal = processOrgDataTotal(
          nansumDataProcessed["results"]["rows"]
        );
        const nansumDataPercentage = processOrgUnitDataPercent(
          nansumDataProcessed["results"]["rows"]
        );
        const obj = {
          title: ind.displayName,
          total: nansumDataTotal,
          percentage: nansumDataPercentage,
        };
        processedData.push(obj);
      });

      return processedData;
    }
    return processedData;
  }, [nansumData]);

  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="language"
        title="Overview of WHO's HIVES indicators"
        subTitle="Health Insights and Visualization for Essential Health Services"
      />
      {loading && nansumLoading && <Loading />}
      {overview.length > 0 && processedData.length > 0 && (
        <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
          <Col className="m-bot-24">
            <Row>
              <Col>
                <TextVisualization
                  info={processedData[0]}
                  loading={nansumLoading}
                  color={"rgb(39, 190, 182)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[0]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[1]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[2]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextVisualization
                  info={overview[3]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[4]}
                  loading={loading}
                  color={"rgb(81, 139, 201)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[5]}
                  loading={loading}
                  color={"rgb(81, 139, 201)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={processedData[1]}
                  loading={loading}
                  color={"rgb(238, 47, 68)"}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <TextVisualization
                  info={processedData[2]}
                  loading={nansumLoading}
                  color={"rgb(103, 191, 107)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[6]}
                  loading={loading}
                  color={"rgb(236, 70, 139)"}
                />
              </Col>
              <Col>
                <TextVisualization
                  info={overview[7]}
                  loading={loading}
                  color={"rgb(145, 91, 166)"}
                />
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      )}
      {error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default Overview;
