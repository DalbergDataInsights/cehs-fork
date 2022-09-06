import React from "react";
import Loading from "./Loading";

const TextVisualization = ({ info, loading, color }) => {
  const title = info["title"] !== undefined ? info["title"] : 0;
  const total = info["total"] !== undefined ? info["total"] : 0;
  const percentage = info["percentage"] !== undefined ? info["percentage"] : 0;

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div
          className="d-flex flex-column mb-3 crd"
          style={{ backgroundColor: color }}
        >
          <div className="p-2 crd-title" style={{ backgroundColor: color }}>
            {title}
          </div>
          <div className="p-2 crd-num">{total}</div>
          <div className="p-2 crd-per">{`${percentage}%`}</div>
        </div>
      )}
    </>
  );
};

export default TextVisualization;
