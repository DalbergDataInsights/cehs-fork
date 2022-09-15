import { monthsBetween, findPosition } from "../utils";
import moment from "moment";

// 105-1 form query
export const dataSetQuery = {
  results: {
    resource: "analytics",
    params: ({ period }) => ({
      dimension: [
        "dx:RtEYsASU7PG.ACTUAL_REPORTS",
        "ou:LEVEL-5",
        // `pe:${monthsBetween(
        //   period.map((p) => p.format("YYYY-MM" + "-01"))[0],
        //   period.map((p) => p.format("YYYY-MM" + "-01"))[1]
        // ).join(";")}`,
      ],
      skipMeta: false,
      paging: false,
      includeNumDen: true,
    }),
  },
};


export function getReportingData(
  indicatorData,
  datasets,
  districtFacilities,
  variableId,
  period,
  variableName
) {
  const periods = monthsBetween(
    period.map((p) => p.format("YYYY-MM" + "-01"))[0],
    period.map((p) => p.format("YYYY-MM" + "-01"))[1]
  );

  //   get indicator at facility level
  var actual = [];
  if (indicatorData) {
    const orgUnitIndex = findPosition(indicatorData.results.headers, "ou");
    const indicatorIndex = findPosition(indicatorData.results.headers, "dx");

    actual = indicatorData.results.rows
      .filter((i) => districtFacilities.includes(i[orgUnitIndex]))
      .filter((i) => variableId.split(";").includes(i[indicatorIndex]))
  }

  var rates = [];
  if (datasets) {
    rates = datasets["results"]["rows"].filter((i) =>
      districtFacilities.includes(i[orgUnitIndex])
    );
  }

  const expected = districtFacilities.length;

  var facilitiesReported = null;

  const data = periods.map((p) => {
    const current = rates.find((r) => r[0] === p);
    const reportedMore = [... new Set (actual
      .filter((r) => r[2] == p && parseFloat(r[3]) > 0)
      .map((r) => r[1]))].length;
    
    facilitiesReported = reportedMore;

    return {
      rate: !!current ? parseFloat(current[1]) : 0,
      actual: (reportedMore * 100) / expected,
    };
  });

  // get title of the visualization
  const month = `In ${period[1].format("MMMM YYYY")}`;
  const indicatorDescription = variableName;

  const rateAnalysis = data[data.length - 1].rate.toFixed(1);
  const actualAnalysis = `(${data[data.length - 1].actual.toFixed(1)}%)`;
  const title = `${month}, of the ${expected} (100%) health facilities expected to report, ${facilitiesReported} ${actualAnalysis} reported one or above for the number of ${indicatorDescription}`;

  const plottingData = [
    // {
    //   name: "Percentage of facilities expected to report which reported on there 105-1 form",
    //   x: periods.map((p) => moment(p, "YYYYMM").format("MMM YYYY")),
    //   y: data.map((d) => d.rate),
    //   hoverinfo: "x+y",
    //   type: "scatter",
    //   marker: {
    //     color: "rgb(106, 155, 195)",
    //     size: 10,
    //     symbol: "square",
    //   },
    //   line: {
    //     width: 2,
    //   },
    // },
    {
      name: "Percentage of reporting facilities that reported a value of one or above for this indicator",
      x: periods.map((p) => moment(p, "YYYYMM").format("MMM YYYY")),
      y: data.map((d) => parseFloat(d.actual)),
      hoverinfo: "x+y",
      type: "scatter",
      marker: {
        color: "rgb(200, 19, 60)",
        size: 10,
        symbol: "square",
      },
      line: {
        width: 2,
      },
    },
  ];

  return { plottingData: plottingData, title: title };
}
