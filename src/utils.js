import { fromPairs } from "lodash";
import { useMemo } from "react";
import facilitiesMeta from "./config/Facilities";
import moment from "moment";
const fig = {
  2018: "rgb(185, 221, 241)",
  2019: "rgb(106, 155, 195)",
  2021: "rgb(200, 19, 60)",
  2020: "rgb(11, 119, 65)",
};

export function processMapData(data, districts, startMonth, endMonth) {
  return districts.map((district) => {
    const districtRecords = fromPairs(
      data.filter(([dist]) => dist === district.id).map((r) => [r[1], r[2]])
    );
    const previous = districtRecords[startMonth] || 0;
    const current = districtRecords[endMonth] || 0;
    if (previous !== 0) {
      const change = Number(
        (((current - previous) * 100) / previous).toFixed(0)
      );
      return { district: district.name, value: change };
    }
    return { district: district.name, value: 0 };
  });
}

export function processCountryData(data, periodType = "monthly") {
  const yearList = Object.keys(data).map((val) => val.substr(0, 4));
  const yearSet = new Set(yearList);
  const years = Array.from(yearSet);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  let x = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (periodType == "monthly") {
    return years.map((year) => {
      const y = months.map((m) => parseInt(data[`${year}${m}`]));
      return {
        name: year,
        x,
        y,
        hoverinfo: "x+y",
        type: "scatter",
        marker: {
          size: 10,
          symbol: "square",
        },
        line: {
          width: 2,
        },
      };
    });
  } else if (periodType == "quarterly") {
    return years.map((year) => {
      const y = quarters.map((m) => {
        return parseInt(data[`${year}${m}`]);
      });

      x = ["Q1", "Q2", "Q3", "Q4"];
      return {
        name: year,
        x,
        y,
        hoverinfo: "x+y",
        type: "scatter",
        marker: {
          size: 10,
          symbol: "square",
        },
        line: {
          width: 2,
        },
      };
    });
  }
}

export function processTimeSeriesDataDict(data, periodType = "monthly") {
  const yearList = Object.keys(data).map((val) => val.substr(0, 4));
  const yearSet = new Set(yearList);
  const years = Array.from(yearSet);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let x = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  if (periodType == "monthly") {
    return years.map((year) => {
      const y = months.map((m) => parseFloat(data[`${year}${m}`]).toFixed(4));
      return {
        name: year,
        x,
        y,
        hoverinfo: "x+y",
        type: "scatter",
        marker: {
          size: 10,
          symbol: "square",
        },
        line: {
          width: 2,
        },
      };
    });
  } else if (periodType == "quarterly") {
    return years.map((year) => {
      const y = quarters.map((m) => parseFloat(data[`${year}${m}`]).toFixed(4));
      x = ["Q1", "Q2", "Q3", "Q4"];
      return {
        name: year,
        x,
        y,
        hoverinfo: "x+y",
        type: "scatter",
        marker: {
          size: 10,
          symbol: "square",
        },
        line: {
          width: 2,
        },
      };
    });
  }
}

export function processTitle(data, periodDescription = "") {
  const periods = Object.keys(data).sort();
  const start = periods[0];
  const end = periods[periods.length - 1];

  const current = data[end] || 0;
  const previous = data[start] || 0;
  if (current !== 0) {
    const change = Number(
      (((current - previous) * 100) / (previous + 1)).toFixed(0)
    );

    if (change < 0) {
      return `decreased by ${change * -1}% ${periodDescription}`;
    } else if (change > 0) {
      return `increased by ${change}% ${periodDescription}`;
    }
    return `remained constant ${periodDescription}`;
  }

  if (previous !== 0) {
    return `decreased by ${100 * -1}% ${periodDescription}`;
  }

  return `remained constant ${periodDescription}`;
}

export function monthsBetween(...args) {
  let [a, b] = args.map((arg) =>
    arg
      .split("-")
      .slice(0, 2)
      .reduce((y, m) => m - 1 + y * 12)
  );
  return Array.from({ length: b - a + 1 }, (_) => a++).map(
    (m) => ~~(m / 12) + ("0" + ((m % 12) + 1)).slice(-2)
  );
}

export function transpose(data) {
  if (data !== undefined && data.length > 0) {
    return data[0].map((x, i) => data.map((x) => x[i]));
  }
}

export function processOrgRawDataToTimeSeries(data, periodType = "monthly") {
  if (
    !data ||
    data === undefined ||
    data.length == 0 ||
    data[0].constructor !== Array
  ) {
    return {};
  }
  let data_transposed = transpose(data); // tranpose the data
  let time = data_transposed[2]; // Get the raw time periods
  let values = data_transposed[3].map((val) => parseInt(val)); // Get the raw values
  let time_unique = Array.from(new Set(time)); // Get a list of unique time periods
  let time_dict = {}; // Create an empty dictionary

  // Initalize the time dictionary
  for (let i = 0; i < time_unique.length; i++) {
    let time_i = time_unique[i];
    let x_arr = [];
    for (let j = 0; j < time.length; j++) {
      if (time[j] == time_i) {
        x_arr.push(values[j]);
      }
    }

    console.log(x_arr);
    const sum = x_arr.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    if (periodType == "monthly") {
      time_dict[time_unique[i]] = sum;
    } else if (periodType == "quarterly") {
      time_dict[time_unique[i]] = parseFloat((sum / x_arr.length).toFixed(1));
    }
  }

  console.log(`Period type: ${periodType}`);
  console.log(time_dict);
  return time_dict;
}

export function processOrgDataTotal(data) {
  if (data.length == 0) {
    return 0;
  }
  const values = data.map((val) => val[3]);
  const valuesNumeric = values.map((val) => parseInt(val));
  const valuesReducer = (accumulator, curr) => accumulator + curr;
  if (valuesNumeric.length > 0) {
    return valuesNumeric.reduce(valuesReducer);
  } else {
    return 0;
  }
}

export function getDataPerOrgUnits(orgUnits, data) {
  const orgUnitIds = orgUnits.map((val) => val.id);
  // console.log("Printing organisation units");
  // console.log(orgUnitIds);
  const orgUnitData = {};

  if (data) {
    if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
      orgUnitIds.map((id) => {
        orgUnitData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
    // console.log("Printing out districts data");
    // console.log(orgUnitData);
    // console.log(Object.keys(orgUnitData));
  }
  return orgUnitData;
}

export function getOrgUnitDataTotalsNoRenaming(orgUnits, data) {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = processOrgDataTotal(value);
  });

  // console.log("Printing org unit data totals");
  // console.log(orgUnitDataTotals);
}

export function getOrgUnitDataTotals(orgUnits, data) {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = processOrgDataTotal(value);
  });

  // console.log("Printing org unit data totals");
  // console.log(orgUnitDataTotals);

  const orgUnitDataTotalsRenamed = {};
  Object.entries(orgUnitDataTotals).forEach(([key, value]) => {
    const orgUnitName = orgUnits
      .filter((i) => i.id == key)
      .map((ou) => ou.name)[0];

    orgUnitDataTotalsRenamed[orgUnitName] = value;
  });

  // console.log("Printing org unit data totals with formatted names");
  // console.log(orgUnitDataTotalsRenamed);

  return orgUnitDataTotalsRenamed;
}

export function getOrgUnitDataAverages(orgUnits, data) {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = parseFloat(
      (processOrgDataTotal(value) / value.length).toFixed(2)
    );
  });

  const orgUnitDataTotalsRenamed = {};
  Object.entries(orgUnitDataTotals).forEach(([key, value]) => {
    const orgUnitName = orgUnits
      .filter((i) => i.id == key)
      .map((ou) => ou.name)[0];

    orgUnitDataTotalsRenamed[orgUnitName] = value;
  });

  return orgUnitDataTotalsRenamed;
}

function sortByColumn(a, colIndex) {
  a.sort(sortFunction);

  function sortFunction(a, b) {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else {
      return a[colIndex] < b[colIndex] ? -1 : 1;
    }
  }

  return a;
}

export function processOrgUnitDataPercent(data) {
  if (!data) {
    return 0;
  }
  const sortedData = sortByColumn(data, 2);
  const values = sortedData.map((val) => val[3]);
  const valuesNumeric = values.map((val) => parseInt(val));
  const percentChange =
    ((valuesNumeric[valuesNumeric.length - 1] - valuesNumeric[0]) /
      (valuesNumeric[0] + 1)) *
    100;
  return parseFloat(percentChange.toFixed(2));
}

export function getOrgUnitDataPercentageChanges(orgUnits, data) {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataPercentages = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataPercentages[key] = processOrgUnitDataPercent(value);
  });
  // console.log("Printing org unit data percentages");
  // console.log(orgUnitDataPercentages);

  const orgUnitDataPercentagesRenamed = {};
  Object.entries(orgUnitDataPercentages).forEach(([key, value]) => {
    const orgUnitName = orgUnits
      .filter((i) => i.id == key)
      .map((ou) => ou.name)[0];

    orgUnitDataPercentagesRenamed[orgUnitName] = value;
  });

  // console.log("Printing org unit data percentages named");
  // console.log(orgUnitDataPercentagesRenamed);

  return orgUnitDataPercentagesRenamed;
}

export function sortDictionary(data) {
  if (data) {
    var items = Object.keys(data).map(function (key) {
      return [key, data[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });
    return items;
  } else {
    return [];
  }
}

export function computeCountryTimeSeries(data, level, periodType) {
  let processedData = null;
  if (level == "country") {
    if (data) {
      if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
        processedData = processOrgRawDataToTimeSeries(
          data["results"]["rows"],
          periodType
        );
      }
    }
  }
  return processedData;
}

export function computeDistrictTimeSeries(
  data,
  districts,
  level,
  selectedDistrict,
  periodType
) {
  let selectedDistrictData = null;
  let processedData = null;
  if (level == "district") {
    const districtIds = districts.map((val) => val.id);
    let districtData = {};
    if (data) {
      if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
        districtIds.map((id) => {
          districtData[`${id}`] = data["results"]["rows"].filter(
            (val) => val[1] == id
          );
        });
      }
    }
    selectedDistrictData = districtData[selectedDistrict];
    processedData = processOrgRawDataToTimeSeries(
      selectedDistrictData,
      periodType
    );
  }

  return processedData;
}

export function computeFacilityTimeSeries(
  data,
  level,
  districtFacilitiesMeta,
  selectedDistrict,
  periodType = "monthly"
) {
  let facilitiesDataDict = {};
  let facility = null;
  let districtFacilitiesData = null;
  let processedData = null;
  if (level == "facility") {
    const districtFacilities =
      districtFacilitiesMeta[selectedDistrict]["facility_ids"];

    if (data) {
      if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
        districtFacilitiesData = data["results"]["rows"].filter((val) =>
          districtFacilities.includes(val[1])
        );
      }
    }

    if (districtFacilitiesData) {
      districtFacilities.map((id) => {
        facilitiesDataDict[`${id}`] = districtFacilitiesData.filter(
          (val) => val[1] == id
        );
      });
    }

    // // Now with the facility raw data for the facilities in the district
    // // Get the totals per facility
    // const facilitiesDataTotals = {};
    // Object.entries(facilitiesDataDict).forEach(([key, value]) => {
    //   facilitiesDataTotals[key] = processOrgDataTotal(value);
    // });

    // const processedData = sortDictionary(facilitiesDataTotals);
  }

  return facilitiesDataDict;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export function objectToArray(obj) {
  const res = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    res.push([key, obj[key]]);
  }
  return res;
}

export function getDataPerOrgUnitsTwo(orgUnitIds, data) {
  // const orgUnitIds = orgUnits.map((val) => val.id);
  // console.log("Printing organisation units");
  // console.log(orgUnitIds);
  const orgUnitData = {};

  if (data) {
    if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
      orgUnitIds.map((id) => {
        orgUnitData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
    // console.log("Printing out districts data");
    // console.log(orgUnitData);
    // console.log(Object.keys(orgUnitData));
  }
  return orgUnitData;
}

export function getOrgUnitDataTotalsTwo(orgUnitIds, data) {
  const orgUnitData = getDataPerOrgUnitsTwo(orgUnitIds, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = processOrgDataTotal(value);
  });

  return orgUnitDataTotals;
}

export function computeReportingTotals(
  facilitiesIdsList,
  data,
  districtFacilitiesMeta
) {
  const facilitiesDataTotals = getOrgUnitDataTotalsTwo(facilitiesIdsList, data);

  const facilitiesDataTotalsArray = objectToArray(facilitiesDataTotals);

  const districtFacilitiesReportingTotals = {};
  Object.keys(districtFacilitiesMeta).forEach(function (item, index) {
    districtFacilitiesReportingTotals[item] = facilitiesDataTotalsArray.filter(
      (val) => districtFacilitiesMeta[item]["facility_ids"].includes(val[0])
    ).length;
  });

  return districtFacilitiesReportingTotals;
}

export function computeReportingProportions(
  data,
  maptype,
  districtFacilitiesMeta,
  districts
) {
  let facilitiesDataTotals = null;

  const facilitiesIdsList =
    data && data["results"]["rows"] !== undefined
      ? [...new Set(data["results"]["rows"].map((val) => val[1]))]
      : [];

  const districtNumFacilities = {};
  for (const [key, value] of Object.entries(districtFacilitiesMeta)) {
    districtNumFacilities[key] = value["facility_ids"].length;
  }

  if (data && data["results"]["rows"] && maptype == "total") {
    facilitiesDataTotals = getOrgUnitDataTotalsTwo(facilitiesIdsList, data);

    const facilitiesDataTotalsArray = objectToArray(facilitiesDataTotals);

    const districtFacilitiesReportingTotals = {};
    Object.keys(districtFacilitiesMeta).forEach(function (item, index) {
      districtFacilitiesReportingTotals[item] =
        (facilitiesDataTotalsArray.filter((val) =>
          districtFacilitiesMeta[item]["facility_ids"].includes(val[0])
        ).length *
          100) /
        districtNumFacilities[item];
    });

    const districtFacilitiesReportingTotalsRenamed = {};
    Object.entries(districtFacilitiesReportingTotals).forEach(
      ([key, value]) => {
        const districtName = districts
          .filter((i) => i.id == key)
          .map((ou) => ou.name)[0];

        districtFacilitiesReportingTotalsRenamed[districtName] = parseFloat(
          value.toFixed(2)
        );
      }
    );

    return districtFacilitiesReportingTotalsRenamed;
  }
}

export function filterStartPeriodEndPeriodData(data, periods) {
  if (data && data["results"]["rows"]) {
    const startPeriodData = data["results"]["rows"].filter(
      (val) => val[2] == periods[0]
    );

    const startData = { results: { rows: startPeriodData } };

    const endPeriodData = data["results"]["rows"].filter(
      (val) => val[2] == periods[1]
    );

    const endData = { results: { rows: endPeriodData } };

    console.log("Printing start data");
    console.log(startData);

    console.log("Printing end data");
    console.log(endData);

    return [startData, endData];
  }
}

export function computeReportingPercentages(
  data,
  periods,
  districtFacilitiesMeta,
  districts
) {
  // Filter the out the data for periods
  const filteredData = filterStartPeriodEndPeriodData(data, periods);

  if (filteredData) {
    // console.log("Printing out the start period data");
    // console.log(filteredData[0]);

    // console.log("Printing out the end period data");
    // console.log(filteredData[1]);

    const startReporting = computeReportingProportions(
      filteredData[0],
      "total",
      districtFacilitiesMeta,
      districts
    );

    // const startReporting = useMemo(() => {
    //   return computeReportingProportions(
    //     filteredData[0],
    //     "total",
    //     districtFacilitiesMeta,
    //     districts
    //   );
    // }, [filteredData]);

    const endReporting = computeReportingProportions(
      filteredData[1],
      "total",
      districtFacilitiesMeta,
      districts
    );

    // const endReporting = useMemo(() => {
    //   return computeReportingProportions(
    //     filteredData[1],
    //     "total",
    //     districtFacilitiesMeta,
    //     districts
    //   );
    // }, [filteredData]);

    // console.log("Printing out the start reporting");
    // console.log(startReporting);

    // console.log("Printing out the end reporting");
    // console.log(endReporting);

    const reportingPercentages = {};
    Object.entries(startReporting).forEach(([key, value]) => {
      reportingPercentages[key] =
        ((endReporting[key] - startReporting[key]) /
          (startReporting[key] + 1)) *
        100;
    });

    // console.log("Printing out reporting percetange changes");
    // console.log(reportingPercentages);
    return reportingPercentages;
  }

  return;
}

export function filterMonthlyYearlyData(
  data,
  level,
  district,
  districtFacilitiesMeta
) {
  if (data && data["results"]["rows"] && data["results"]["rows"].length > 0) {
    const yearsMonths = [
      ...new Set(data["results"]["rows"].map((val) => val[2])),
    ];

    console.log(yearsMonths);

    const yearsMonthsProportionsDict = {};
    // yearsMonths.map((val) => {
    //   const facilityDataList = data["results"]["rows"].filter(
    //     (res) => res[2] == val
    //   );
    //   const facilityList = facilityDataList.map((val) => val[1]);
    //   const facilitySet = new Set(facilityList);

    //   yearsMonthsProportionsDict[val] =
    //     facilitySet.size / Object.keys(facilitiesMeta).length;
    // });
    if (level == "country") {
      // yearsMonths.map(
      //   (val) =>
      //     (yearsMonthsProportionsDict[val] =
      //       data["results"]["rows"].filter((res) => res[2] == val).length /
      //       Object.keys(facilitiesMeta).length)
      // );
      yearsMonths.map((val) => {
        const facilityDataList = data["results"]["rows"].filter(
          (res) => res[2] == val
        );
        const facilityList = facilityDataList.map((val) => val[1]);
        const facilitySet = new Set(facilityList);

        yearsMonthsProportionsDict[val] =
          facilitySet.size / Object.keys(facilitiesMeta).length;
      });
    } else if (level == "district") {
      // yearsMonths.map(
      //   (val) =>
      //     (yearsMonthsProportionsDict[val] =
      //       data["results"]["rows"].filter((res) => res[2] == val).length /
      //       districtFacilitiesMeta[district]["facility_ids"].length)
      // );
      yearsMonths.map((val) => {
        const facilityDataList = data["results"]["rows"].filter(
          (res) => res[2] == val
        );
        const facilityList = facilityDataList.map((val) => val[1]);
        const facilitySet = new Set(facilityList);

        yearsMonthsProportionsDict[val] =
          facilitySet.size /
          districtFacilitiesMeta[district]["facility_ids"].length;
      });
    }

    // console.log("Printing the proportion of reporting facilities");
    // console.log(yearsMonthsProportionsDict);

    return yearsMonthsProportionsDict;
  }
}

export function extractDistrictData(data, district, districtFacilitiesMeta) {
  let districtData = null;
  const districtFacilities = districtFacilitiesMeta[district]["facility_ids"];
  if (data && data["results"]["rows"] && data["results"]["rows"].length > 0) {
    districtData = data["results"]["rows"].filter((val) =>
      districtFacilities.includes(val[1])
    );

    return { results: { rows: districtData } };
  }
}

export function monthsToQuarters(months) {
  const q1 = ["01", "02", "03"];
  const q2 = ["04", "05", "06"];
  const q3 = ["07", "08", "09"];
  const y = months.map((m) => {
    const mth = m.slice(-2);
    if (q1.includes(mth)) {
      return m.substring(0, 4) + "Q1";
    } else if (q2.includes(mth)) {
      return m.substring(0, 4) + "Q2";
    } else if (q3.includes(mth)) {
      return m.substring(0, 4) + "Q3";
    } else {
      return m.substring(0, 4) + "Q4";
    }
  });
  return [...new Set(y)].sort();
}

export function periodBetween(startPeriod, endPeriod, periodType) {
  const months = monthsBetween(startPeriod, endPeriod);
  if (periodType == "monthly") {
    return months;
  } else {
    const quarters = monthsToQuarters(months);
    console.log(quarters);
    return quarters;
  }
}

export function getTimePeriodRange() {
  const d = new Date();
  const mth = d.getMonth();
  const yr = d.getFullYear();
  const currMth = mth < 10 ? "0" + mth : mth;
  const period = [moment(yr + "-01-01"), moment(yr + "-" + currMth + "-01")];

  return period;
}
