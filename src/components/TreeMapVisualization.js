import { React, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import Download from "./Download";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import { computeFacilityTimeSeries, processOrgDataTotal } from "../utils";
import Loading from "./Loading";
import districtFacilitiesMeta from "../config/DistrictFacilities";
import TreeMapTwo from "./TreeMap";

const TreeMapVisualization = ({
  data,
  loading,
  error,
  displayName,
  periodType,
}) => {
  const store = useStore($store);
  const period = store.period.map((p) => p.format("YYYYMM"));
  console.log(period);
  const [selectedContribution, setSelectedContribution] = useState("1");
  console.log(`Selected contribution: ${selectedContribution}`);

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];

  const selectedDistrict = store.selectedDistrict;
  const districtFacilities =
    districtFacilitiesMeta[selectedDistrict]["facility_ids"];

  const dataViz = useMemo(() => {
    let dataSelected = data;
    if (
      selectedContribution == "2" &&
      periodType == "monthly" &&
      data &&
      data["results"]["rows"]
    ) {
      dataSelected = {
        results: {
          rows: data["results"]["rows"].filter((val) => val[2] == period[1]),
        },
      };
    }
    let districtFacilitiesData = null;
    if (dataSelected) {
      if (dataSelected["results"]["rows"]) {
        districtFacilitiesData = dataSelected["results"]["rows"].filter((val) =>
          districtFacilities.includes(val[1])
        );
      }
    }

    const facilitiesDataDict = computeFacilityTimeSeries(
      dataSelected,
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
      facilitiesDataTotals[key] = processOrgDataTotal(value, periodType);
    });

    return facilitiesDataTotals;
  }, [data, store.selectedDistrict, selectedContribution]);

  const isAllZero = Object.values(dataViz).every((item) => item === 0);

  return (
    <>
      {loading && <Loading />}

      {data && dataViz && error === undefined && !isAllZero && (
        // <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
        <Row className="data-card shadow-sm mb-5 rounded">
          <Col className="m-bot-24">
            <Row style={{ marginBottom: 20 }}>
              <Col className="graph">
                {selectedContribution == "1" && (
                  <h5>{`Contribution of individual facilities in ${districtName} to the  ${displayName} between ${store.period[0].format(
                    "MMM-YYYY"
                  )} and ${store.period[1].format("MMM-YYYY")}`}</h5>
                )}
                {selectedContribution == "2" && (
                  <h5>{`Contribution of individual facilities in ${districtName} to the  ${displayName} in ${store.period[1].format(
                    "MMM-YYYY"
                  )}`}</h5>
                )}
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={selectedContribution}
                  onChange={(val) => setSelectedContribution(val)}
                >
                  <Option value="1">
                    Show sum between month of reference and month of interest
                    period
                  </Option>
                  {periodType == "monthly" && (
                    <Option value="2">Show only month of interest</Option>
                  )}
                  {/* <Option value="3">
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

      {!dataViz && error === undefined && !loading && isAllZero && (
        <h5>No data available at facility level for selected period</h5>
      )}

      {error && (
        <div>
          <h5>No data available at facility level for selected period</h5>
          {console.log(error.message)}
        </div>
      )}
    </>
  );
};

export default TreeMapVisualization;
