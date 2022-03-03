import React from "react";
import { Col, Row } from "react-bootstrap";
const VisualizationHeader = ({ icon, title, subTitle }) => {
  return (
    <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
      <Col>
        <Row>
          <Col xs={1}>
            <span className="material-icons align-middle large-icon">
              {icon}
            </span>
          </Col>
          <Col xs={11}>
            <Row>
              <Col>
                <p className="grap-header">{title}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="graph-subheader">{subTitle}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default VisualizationHeader;
