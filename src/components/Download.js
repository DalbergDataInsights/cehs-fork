import React from "react";

import { Row, Col } from "react-bootstrap";

const Download = ({data}) => {
  
  const handleDownload = () => {
    console.log('------ download-----')

    // get rows of the data seperating column values with a comma
    var csvRows = Object.keys([data][0]).map((key) => `${key}, ${data[key]}`)

    // add seperators for the rows
    const csv = csvRows.join('\n');

    const csvData = new Blob([csv], { type: "text/csv" });
    var csvUrl = URL.createObjectURL(csvData);

    var link = document.createElement("a");
    link.setAttribute("href", csvUrl);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Row>
      <Col>
        <a id="fc5f3e2ed10_download_button" className="data-card__download-button" 
        onClick={handleDownload}>
          <span className="material-icons align-middle" 
          >cloud_download</span>
        </a>
      </Col>
    </Row>
  );
};

export default Download;
