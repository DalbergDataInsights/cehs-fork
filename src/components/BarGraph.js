import React from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data, title }) => {
  var layout = {
    barmode: "stack",
    width: 1280.72,
    title,
    height: 580,
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "right",
      x: 1,
    },
  };
  return (
    <Plot
      data={data}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ background: "red" }}
    />
  );
};

export default BarGraph;
