import { observer } from "mobx-react";
import React from "react";
import Plot from "react-plotly.js";
import { useStore } from "../Context";
import Loading from "./Loading";

const TreeMap = observer(({ data, loading, empty }) => {
  const store = useStore();
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!!empty) {
    return <div>No Data</div>;
  }

  return (
    <Plot
      data={data}
      onClick={({ points: [{ pointNumber }] }) =>
        store.loadFacilityData(pointNumber)
      }
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

export default TreeMap;
