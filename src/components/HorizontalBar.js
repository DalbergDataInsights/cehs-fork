import React from "react";
import Plot from "react-plotly.js";

const HorizontalBar = ({ data }) => {
  const sorted = data.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });
  return (
    <Plot
      data={[
        {
          type: "bar",
          barmode: "overlay",
          x: sorted.slice(0, 10).map((v) => v.value),
          y: sorted.slice(0, 10).map((v) => v.district),
          // text: sorted.slice(0, 10).map((v) => `${v.value}%`),
          orientation: "h",
          textposition: "inside",
          texttemplate: "%{x}%",
          showlegend: false,
          hoverinfo: "none",
          marker: {
            color: "rgb(211, 41, 61)",
          },
        },
      ]}
      layout={{
        autosize: true,
        showlegend: false,
        xaxis: {
          showgrid: false,
          zeroline: false,
        },
        margin: {
          pad: 0,
          r: 5,
          t: 0,
          l: 150,
          b: 20,
        },

        yaxis: {
          showgrid: true,
          zeroline: true,
          gridcolor: "lightgray",
          zerolinecolor: "lightgray",
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false }}
    />
  );
};

export default HorizontalBar;
