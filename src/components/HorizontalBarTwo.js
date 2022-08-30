import React from "react";
import Plot from "react-plotly.js";
import { sortDictionary } from "../utils";

const HorizontalBarTwo = ({ data, type }) => {
  const sorted = sortDictionary(data);
  const textTemplateValue = type == "total" ? "%{x}" : "%{x}%";
  const colorScaleValue = "rgb(33,102,172)";

  return (
    <Plot
      data={[
        {
          type: "bar",
          barmode: "overlay",
          x: sorted.slice(0, 10).map((v) => v[1]),
          y: sorted.slice(0, 10).map((v) => v[0]),
          orientation: "h",
          textposition: "inside",
          texttemplate: textTemplateValue,
          showlegend: false,
          hoverinfo: "none",
          marker: {
            color: colorScaleValue,
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
