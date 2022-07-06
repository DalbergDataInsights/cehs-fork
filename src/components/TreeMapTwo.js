import React, { useState } from "react";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import Plot from "react-plotly.js";
import Loading from "./Loading";
import { sortDictionary } from "../utils";
import facilitiesMeta from "../config/Facilities";

const TreeMapTwo = ({ data, loading, error, parent }) => {
  const store = useStore($store);
  const sortedData = sortDictionary(data);

  return (
    <>
      {loading && <Loading />}
      {sortedData && (
        <Plot
          data={[
            {
              type: "treemap",
              // parents: Array(Object.keys(sortedData).length).fill(parent),
              // labels: sortedData.map((v) => v[0]).map((val) => facilitiesMeta[val]),
              // values: sortedData.map((v) => v[1]),
              parents: Array(50).fill(parent),
              labels: sortedData
                .slice(0, 50)
                .map((v) => v[0])
                .map((val) => facilitiesMeta[val]),
              values: sortedData.slice(0, 50).map((v) => v[1]),
              // textinfo: "label+value+percent parent+percent entry",
              textinfo: "label+value+percent parent+percent",
              hoverinfo: "label+value+percent parent+percent",
              // domain: { x: [0, 0.48] },
              outsidetextfont: { size: 20, color: "#377eb8" },
              marker: {
                line: { width: 2 },
                colorscale: "Blues",
                reversescale: true,
              },
              pathbar: { visible: false },
            },
          ]}
          layout={{
            autosize: true,
            margin: {
              pad: 0,
              r: 0,
              t: 0,
              l: 0,
              b: 0,
            },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          config={{ displayModeBar: false }}
          onClick={(val) => console.log(val)}
        />
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default TreeMapTwo;
