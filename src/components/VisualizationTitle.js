import React from "react";
import { Col, Row } from "react-bootstrap";

const VisualizationTitle = ({
  what,
  level,
  indicatorDescription,
  analysis,
}) => {
  const title = `${what} ${level} ${indicatorDescription} ${analysis}`;
  return (
    <Row>
      <Col className="data-card__header-container">
        <h3
          className="w-100"
          style={{ color: "white", textAlign: "center", fontSize: "1.2rem" }}
        >
          {title}
        </h3>
      </Col>
    </Row>
  );
};
export default VisualizationTitle;
