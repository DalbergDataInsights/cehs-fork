import { React, useEffect } from "react";
import { Select } from "antd";
import { Col, Row } from "react-bootstrap";
import VisualizationHeader from "./VisualizationHeader";

const { Option } = Select;

const ReportsTwo = () => {
  return (
    <div id="ds-paginator">
      <VisualizationHeader
        icon="center_focus_weak"
        title="Quality of the reporting of health facilities across districts"
        subTitle="Continuity of Essential Health Services"
      />
      {<div>Under development</div>}
    </div>
  );
};

export default ReportsTwo;
