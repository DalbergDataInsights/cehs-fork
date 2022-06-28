import { observer } from "mobx-react";
import React from "react";
import Plot from "react-plotly.js";
import { useStore } from "../Context";
import Loading from "./Loading";
import { sortDictionary } from "../utils";
import facilitiesMeta from "../config/Facilities";

const TreeMapTwo = observer(({ data, loading, error, parent }) => {
  const store = useStore();
  const sortedData = sortDictionary(data);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>No Data</div>;
  }

  console.log("Printing out the data to plot in tree map");
  console.log(sortedData.slice(0, 10).map((v) => v[0]));
  console.log(sortedData.slice(0, 10).map((v) => v[1]));
  console.log(Array(10).fill(parent));

  return (
    <Plot
      data={[
        {
          type: "treemap",
          parents: Array(10).fill(parent),
          labels: sortedData
            .slice(0, 10)
            .map((v) => v[0])
            .map((val) => facilitiesMeta[val]),
          values: sortedData.slice(0, 10).map((v) => v[1]),
          // textinfo: "label+value+percent parent+percent entry",
          textinfo: "label+value+percent",
          // domain: { x: [0, 0.48] },
          outsidetextfont: { size: 20, color: "#377eb8" },
          marker: { line: { width: 2 } },
          pathbar: { visible: false },
          colorscale: "Blues",
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
    />
  );
});

export default TreeMapTwo;
