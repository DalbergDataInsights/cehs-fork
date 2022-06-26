import React from "react";
import Plot from "react-plotly.js";
import { sortDictionary } from "../utils";

const HorizontalBarTwo = ({ data, type }) => {
  const sorted = sortDictionary(data);
  const textTemplateValue = type ? "%{x}" : "%{x}%";
  return (
    <Plot
      data={[
        {
          type: "bar",
          barmode: "overlay",
          x: sorted.slice(0, 10).map((v) => v[1]),
          y: sorted.slice(0, 10).map((v) => v[0]),
          // text: sorted.slice(0, 10).map((v) => `${v.value}%`),
          orientation: "h",
          textposition: "inside",
          // texttemplate: "%{x}%",
          texttemplate: textTemplateValue,
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
          autorange: "reversed",
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false }}
    />
  );
};

export default HorizontalBarTwo;
