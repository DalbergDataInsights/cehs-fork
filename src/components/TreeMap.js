import React, { useState } from "react";
import { useStore } from "effector-react";
import { $store } from "../models/Store";
import Plot from "react-plotly.js";
import Loading from "./Loading";
import { sortDictionary, getKeyByValue } from "../utils";
import facilitiesMeta from "../config/Facilities";
import { setCurrentFacility } from "../models/Events";

const TreeMap = ({ data, loading, error, parent }) => {
  const store = useStore($store);
  const sortedData = sortDictionary(data);
  const facilityId =
    store.currentFacility !== ""
      ? getKeyByValue(facilitiesMeta, store.currentFacility)
      : "";

  return (
    <>
      {loading && <Loading />}
      {sortedData && (
        <Plot
          data={[
            {
              type: "treemap",
              parents: Array(Object.keys(sortedData).length).fill(parent),
              labels: sortedData
                .map((v) => v[0])
                .map((val) => facilitiesMeta[val]),
              values: sortedData.map((v) => v[1]),
              textinfo: "label+value+percent parent+percent",
              hoverinfo: "label+value+percent parent+percent",
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
          config={{
            displayModeBar: "hover",
            displaylogo: false,
            toImageButtonOptions: {
              filename: "hives_download",
              format: "png",
              scale: 1,
              width: 700,
              height: 500,
            },
            modeBarButtonsToRemove: [
              "pan2d",
              "select2d",
              "lasso2d",
              "resetScale2d",
              "toggleHover",
              "zoom2d",
              "zoomIn2d",
              "zoomOut2d",
              "autoScale2d",
              "hoverClosestCartesian",
              "hoverCompareCartesian",
              "toggleSpikelines",
            ],
          }}
          onClick={({ event, points }) => {
            points !== undefined
              ? setCurrentFacility(points[0]["label"])
              : "point is undefined";
          }}
        />
      )}
      {error && <div>{error.message}</div>}
    </>
  );
};

export default TreeMap;
