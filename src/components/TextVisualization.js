import React from "react";

const TextVisualization = ({ info, loading }) => {
  const { title, total, percentage, bg, fc } = info;
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div
      className="d-flex flex-column mb-3 crd"
      style={{ backgroundColor: bg }}
    >
      <div className="p-2 crd-title" style={{ backgroundColor: fc }}>
        {title}
      </div>
      <div className="p-2 crd-num">{total}</div>
      <div className="p-2 crd-per">{percentage}</div>
    </div>
  );
};

export default TextVisualization;
