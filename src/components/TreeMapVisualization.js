import { React, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
// import { useStore } from "../Context";
import Download from "./Download";
import HorizontalBar from "./HorizontalBar";
import LineVisualization from "./LineVisualization";
import MapVisualization from "./MapVisualization";
import TreeMap from "./TreeMap";
import VisualizationHeader from "./VisualizationHeader";
import VisualizationTitle from "./VisualizationTitle";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { useDataQuery } from "@dhis2/app-runtime";
import {
  computeFacilityTimeSeries,
  monthsBetween,
  processCountryData,
  processDistrictData,
  processOrgDataTotal,
} from "../utils";
import Loading from "./Loading";
import indicatorMeta from "../config/Indicators";
import districtFacilitiesMeta from "../config/DistrictFacilities";
import { sortDictionary } from "../utils";
import TreeMapTwo from "./TreeMapTwo";

const TreeMapVisualization = ({ data, loading, error, displayName }) => {
  const store = useStore($store);
  const variableId = store.selectedVariable;
  const period = store.period;

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];

  const selectedDistrict = store.selectedDistrict;
  const districtFacilities =
    districtFacilitiesMeta[selectedDistrict]["facility_ids"];

  const dataViz = useMemo(() => {
    let districtFacilitiesData = null;
    if (data) {
      if (data["results"]["rows"]) {
        districtFacilitiesData = data["results"]["rows"].filter((val) =>
          districtFacilities.includes(val[1])
        );
      }
    }

    const facilitiesDataDict = computeFacilityTimeSeries(
      data,
      "facility",
      districtFacilitiesMeta,
      store.selectedDistrict
    );

    if (districtFacilitiesData) {
      districtFacilities.map((id) => {
        facilitiesDataDict[`${id}`] = districtFacilitiesData.filter(
          (val) => val[1] == id
        );
      });
    }

    const facilitiesDataTotals = {};
    Object.entries(facilitiesDataDict).forEach(([key, value]) => {
      facilitiesDataTotals[key] = processOrgDataTotal(value);
    });

    return facilitiesDataTotals;
  }, [data, store.selectedDistrict]);

  return (
    <>
      {loading && <Loading />}

      {data && (
        // <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            <Row style={{ marginBottom: 20 }}>
              <Col className="graph">
                <h5>{`Contribution of individual facilities in ${districtName} to the  ${displayName} between ${store.period[0].format(
                  "MMM-YYYY"
                )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={store.selectedContributionOption}
                  onChange={store.onContributionOptionChange}
                >
                  <Option value="1">
                    Show sum between month of reference and month of interest
                    period
                  </Option>
                  {/* <Option value="2">Show month of interest</Option>
                  <Option value="3">
                    Show average between month of reference and month of
                    interest period
                  </Option> */}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <TreeMapTwo
                  data={dataViz}
                  loading={loading}
                  error={error}
                  parent={districtName}
                />
              </Col>
            </Row>
            <Download data={dataViz} />
          </Col>
        </Row>
      )}

      {error && <div>{error.message}</div>}
    </>
  );
};

export default TreeMapVisualization;
