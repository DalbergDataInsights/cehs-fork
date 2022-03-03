import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useStore } from "../Context";
import TextVisualization from "./TextVisualization";
import VisualizationHeader from "./VisualizationHeader";
import { useAnalytics, loadDefaults } from "../Query";

const Overview = observer(() => {
  const { isLoading, isSuccess, isError, error, data } = loadDefaults();
  const store = useStore();
  useEffect(() => {
    store.setPage("overview");
    store.loadOverview();
  }, [store]);
  return (
    <div id="ds-paginator">
      {isLoading && <div>Loading</div>}
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {isError && <div>{JSON.stringify(error)}</div>}
      <VisualizationHeader
        icon="language"
        title="Overview of WHO's 20 CEHS indicators"
        subTitle="Continuity of Essential Health Services"
      />

      {store.overview.length > 0 && (
        <Row className="data-card shadow-sm p-3 mb-5 rounded m-top-24">
          <Col className="m-bot-24">
            <Row>
              <Col>
                <TextVisualization info={store.overview[0]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[1]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[2]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[3]} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextVisualization info={store.overview[4]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[5]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[6]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[7]} />
              </Col>
            </Row>

            <Row>
              <Col>
                <TextVisualization info={store.overview[8]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[9]} />
              </Col>
              <Col>
                <TextVisualization info={store.overview[10]} />
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
});

export default Overview;
