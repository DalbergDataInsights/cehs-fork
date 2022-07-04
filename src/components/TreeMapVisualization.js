import { React, useEffect } from "react";
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

  // console.log("Printing inside treemap visualization");
  // console.log(data);

  const districtName = store.districts
    .filter((i) => i.id == store.selectedDistrict)
    .map((ou) => ou.name)[0];

  const selectedDistrict = store.selectedDistrict;
  const districtFacilities =
    districtFacilitiesMeta[selectedDistrict]["facility_ids"];

  // console.log("District facilities");
  // console.log(districtFacilities);
  // console.log(data);

  // const variableObject = indicatorMeta.filter(
  //   (i) => i.numerator.key == store.selectedVariable
  // )[0];
  // console.log("Printing the variable object");
  // const displayName = "";
  // if (variableObject) {
  //   console.log(variableObject);
  //   console.log(`Display name: ${variableObject.displayName}`);
  //   displayName = variableObject.displayName;
  // }

  // Filter to get data for only facilities in the district
  // If the id in the raw data is in the list of ids for the facilities
  // include
  let districtFacilitiesData = null;
  if (data) {
    if (data["results"]["rows"]) {
      districtFacilitiesData = data["results"]["rows"].filter((val) =>
        districtFacilities.includes(val[1])
      );
    }
  }

  // console.log("Printing out data from the facilities in the district only");
  // console.log(districtFacilitiesData);

  // Create a dictionary for the facilities and their data
  const facilitiesDataDict = {};
  if (districtFacilitiesData) {
    districtFacilities.map((id) => {
      facilitiesDataDict[`${id}`] = districtFacilitiesData.filter(
        (val) => val[1] == id
      );
    });

    // console.log("Printing out data for each facility");
    // console.log(facilitiesDataDict);
    // console.log(Object.keys(facilitiesDataDict));
  }

  // Now with the facility raw data for the facilities in the district
  // Get the totals per facility
  const facilitiesDataTotals = {};
  Object.entries(facilitiesDataDict).forEach(([key, value]) => {
    facilitiesDataTotals[key] = processOrgDataTotal(value);
  });

  // console.log("Printing out the totals from facilities");
  // console.log(facilitiesDataTotals);

  console.log("Printing out data for a specific facility");
  const sortedData = sortDictionary(facilitiesDataTotals);
  const facility = sortedData.slice(0, 1).map((v) => v[0])[0];
  // console.log(facilitiesDataDict[facility]);

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
                  <Option value="2">Show month of interest</Option>
                  <Option value="3">
                    Show average between month of reference and month of
                    interest period
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col className="graph" style={{ minHeight: 480 }}>
                <TreeMapTwo
                  data={facilitiesDataTotals}
                  loading={loading}
                  error={error}
                  parent={districtName}
                />
              </Col>
            </Row>
            <Download />
          </Col>
        </Row>
      )}

      {error && <div>{error.message}</div>}
    </>
  );
};

export default TreeMapVisualization;
