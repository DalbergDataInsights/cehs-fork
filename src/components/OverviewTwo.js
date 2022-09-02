import { React, useEffect } from "react";
import { Select } from "antd";
import { Col, Row } from "react-bootstrap";
import VisualizationHeader from "./VisualizationHeader";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { processOrgDataTotal, processOrgUnitDataPercent } from "../utils";
import { useDataQuery } from "@dhis2/app-runtime";
import { monthsBetween } from "../utils";
import { setPage } from "../models/Events";
import overviewIndicatorMeta from "../config/OverviewIndicators";
import TextVisualizationTwo from "./TextVisualizationTwo";

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

const { Option } = Select;

const Overview = () => {
  const store = useStore($store);
  const period = store.period;

  useEffect(() => {
    setPage("overview");
  }, []);

  const overviewIndicatorsIds = overviewIndicatorMeta.map(
    (i) => i.numerator.dataElementId
  );
  const overviewIndicatorsNames = overviewIndicatorMeta.map(
    (i) => i.displayName
  );

  // console.log(overviewIndicatorsIds);

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

  // console.log(data);

  const indicatorData = {};
  if (data) {
    if (data["results"]["rows"]) {
      overviewIndicatorsIds.map((id) => {
        indicatorData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[0] == id
        );
      });
    }
    // console.log("Printing out indicator data");
    // console.log(indicatorData);
    // console.log(Object.keys(indicatorData));
  }

  const indicatorDataTotals = {};
  Object.entries(indicatorData).forEach(([key, value]) => {
    indicatorDataTotals[key] = processOrgDataTotal(value);
  });

  const indicatorDataPercentages = {};
  Object.entries(indicatorData).forEach(([key, value]) => {
    indicatorDataPercentages[key] = processOrgUnitDataPercent(value);
  });

  // console.log("Printing indicator data totals");
  // console.log(indicatorDataTotals);

  // console.log("Printing indicator data percentages");
  // console.log(indicatorDataPercentages);

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

  // console.log("Printing overview");
  // console.log(overview);

  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="language"
        title="Overview of WHO's HIVES indicators"
        subTitle="Health Insights and Visualization for Essential Health Services"
      />
      {loading && <div>Loading</div>}
      {overview.length > 0 && (
        <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
          <Col className="m-bot-24">
            <Row>
              <Col>
                <TextVisualizationTwo
                  info={overview[0]}
                  loading={loading}
                  color={"rgb(39, 190, 182)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[1]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[2]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[3]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextVisualizationTwo
                  info={overview[4]}
                  loading={loading}
                  color={"rgb(244, 174, 26)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[5]}
                  loading={loading}
                  color={"rgb(81, 139, 201)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[6]}
                  loading={loading}
                  color={"rgb(81, 139, 201)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[7]}
                  loading={loading}
                  color={"rgb(238, 47, 68)"}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <TextVisualizationTwo
                  info={overview[8]}
                  loading={loading}
                  color={"rgb(103, 191, 107)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[9]}
                  loading={loading}
                  color={"rgb(236, 70, 139)"}
                />
              </Col>
              <Col>
                <TextVisualizationTwo
                  info={overview[10]}
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
