import { sortDictionary, findPosition, processOrgDataTotal } from "../utils";

export function getBarVisData(
  data,
  districtFacilities,
  v,
  periods,
  variableName
) {
  let districtFacilitiesData = null;
  if (data["results"]["rows"]) {
    districtFacilitiesData = data["results"]["rows"]
      .filter((val) => districtFacilities.includes(val[1])) //filter on facilities
      .filter((i) => v.split(";").includes(i[findPosition(data.results.headers, "dx")])) //filter on idicators
      .filter((i) => i[findPosition(data.results.headers, "pe")] === periods.format("YYYYMM")) //filter on period
  }

  // Create a dictionary for the facilities and their data
  const facilityData = {};
  if (districtFacilitiesData) {
    districtFacilities.map((id) => {
      facilityData[`${id}`] = districtFacilitiesData.filter(
        (val) => val[1] == id
      );
    });
  }

  const facilityDataTotals = {};
  Object.entries(facilityData).forEach(([key, value]) => {
    facilityDataTotals[key] = processOrgDataTotal(value);
  });

  const facilityDataTotalsRenamed = {};
  Object.entries(facilityDataTotals).forEach(([key, value]) => {
    const facilityName = data.results.metaData.items[key].name;
    facilityDataTotalsRenamed[facilityName] = value;
  });


  for (const key in facilityDataTotalsRenamed) {
    // for every key in the current object
    if (facilityDataTotalsRenamed[key] === 0) {
      // if it's valued to '0'
      delete facilityDataTotalsRenamed[key]; // remove it from the object
    }
  }

  // sort data to get top 10 facilities in the given district for a specific indicator
  const sorted = sortDictionary(facilityDataTotalsRenamed);

  var facilitiesTotal = 0;
  for (let i = 0; i < sorted.length; i++) {
    facilitiesTotal += sorted[i][1];
  }

  var title = null;
  const month = `in ${periods.format("MMMM YYYY")}`;
  const indicatorDescription = variableName;

  if (sorted.length > 0) {
    const analysis = Number((sorted[0][1] / facilitiesTotal) * 100).toFixed(0);
    const what = `${sorted[0][0]}`;
    title = `${what} contributed ${analysis}% to the number of ${indicatorDescription} ${month}`;
  } else {
    title = `** No data on ${indicatorDescription} in ${periods.format(
      "MMMM YYYY"
    )}**`;
  }

  // console.log(title);

  // add others
  const top10 = sorted.slice(0, 10);
  const others = sorted.slice(10,);

  var othersTotal = 0;
  for (let i = 0; i < others.length; i++) {
    othersTotal += others[i][1];
  }

  const finalList = top10;

  if (othersTotal > 0) {
    finalList.push(['Others', othersTotal])
  }

  const plottingData = [
    {
      type: "bar",
      barmode: "overlay",
      x: finalList.map((v) => v[1]),
      y: finalList.map((v) => v[0]),
      orientation: "h",
      textposition: "auto",
      insidetextfont: {
        color: "white"
      },
      texttemplate: "%{x}",
      showlegend: false,
      hoverinfo: "none",
      marker: {
        color: "rgb(33,102,172)",
      },
      transforms: [
        {
          type: "sort",
          target: "y",
          order: "descending",
        },
      ],
    },
  ];
  
  return { plottingData: plottingData, title: title };
}
