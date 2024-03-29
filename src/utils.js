import { fromPairs } from "lodash";
import facilitiesMeta from "./config/Facilities";
import moment from "moment";

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

/**
 * Function that returns a react plotly time series plot for country data.
 * @param {*} data - data dictionary of values over time
 * @param {*} periodType - time period type either monthly or quarterly
 * @returns
 */
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
/**
 * Function that returns a react plotly time series plot.
 * @param {*} data - data dictionary of values over time
 * @param {*} periodType - time period type either monthly or quarterly
 * @returns
 */
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

/**
 * This function creates a dynamic title string indicating the change from a time period
 *  and the percentage change if any
 * @param {*} data - time series dictionary
 * @param {*} periodDescription
 * @returns - a string
 */
export function processTitle(data, periodDescription = "") {
  const periods = Object.keys(data).sort();
  const start = periods[0];
  const end = periods[periods.length - 1];

  const current = data[end] || 0;
  const previous = data[start] || 0;
  let change = null;
  if (current !== 0) {
    if (previous == 0) {
      change = Number(
        (((current - previous) * 100) / (previous + 1)).toFixed(0)
      );
    } else {
      change = Number((((current - previous) * 100) / previous).toFixed(0));
    }
  } else {
    if (previous != 0) {
      change = Number((((current - previous) * 100) / previous).toFixed(0));
    } else {
      change = 0;
    }
  }

  if (change < 0) {
    return `decreased by ${change * -1}% ${periodDescription}`;
  } else if (change > 0) {
    return `increased by ${change}% ${periodDescription}`;
  } else {
    return `remained constant ${periodDescription}`;
  }
}

/**
 * This function returns an array of months between two time periods
 * @param  {...any} args
 * @returns - Array
 */
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

/**
 *  This function tranposes a 2d array of data values
 * @param {*} data - 2d data array of fetched raw data values
 * @returns - Array
 */
export function transpose(data) {
  if (data !== undefined && data.length > 0) {
    return data[0].map((x, i) => data.map((x) => x[i]));
  }
}

/**
 * This function turns a 2d array of raw data into a time series dictionary
 *  where the keys are the time periods and the values are the aggregated values for that time period
 * @param {*} data
 * @param {*} periodType
 * @returns - a dictionary
 */
// TODO: This code can be optimized
export function processOrgRawDataToTimeSeries(data, periodType = "monthly") {
  if (
    !data ||
    data === undefined ||
    data.length == 0 ||
    data[0].constructor !== Array
  ) {
    return {};
  }
  let data_transposed = transpose(data); // transpose the data
  let time = data_transposed[2]; // Get the raw time periods
  let values = data_transposed[3].map((val) => parseInt(val)); // Get the raw values
  let time_unique = Array.from(new Set(time)); // Get a list of unique time periods
  let time_dict = {}; // Create an empty dictionary
  let num_values =
    periodType == "quarterly"
      ? data_transposed[4].map((val) => parseFloat(val))
      : null; // Get the numerators
  let denom_values =
    periodType == "quarterly"
      ? data_transposed[5].map((val) => parseFloat(val))
      : null; // Get the denominators

  // Initalize the time dictionary
  for (let i = 0; i < time_unique.length; i++) {
    let time_i = time_unique[i];

    if (periodType == "monthly") {
      let x_arr = [];
      for (let j = 0; j < time.length; j++) {
        if (time[j] == time_i) {
          x_arr.push(values[j]);
        }
      }
      const sum = x_arr.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      time_dict[time_unique[i]] = sum;
    } else if (periodType == "quarterly") {
      let x_num_arr = [];
      let x_denom_arr = [];

      for (let j = 0; j < time.length; j++) {
        if (time[j] == time_i) {
          x_num_arr.push(num_values[j]);
          x_denom_arr.push(denom_values[j]);
        }
      }

      const num_sum = x_num_arr.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      const denom_sum = x_denom_arr.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      time_dict[time_unique[i]] = parseFloat(
        ((num_sum * 100) / denom_sum).toFixed(2)
      );
    }
  }

  return time_dict;
}

/**
 * The function computes indicator totals for a single organization unit
 * @param {*} data - data from a single organization unit
 * @param {*} type - variable denoting whether dealing with monthly or quarterly data
 * @returns - Number
 */
export function processOrgDataTotal(data, type = "monthly") {
  if (data.length == 0) {
    return 0;
  }

  if (type == "monthly") {
    const values = data.map((val) => val[3]);

    const valuesNumeric = values.map((val) => parseInt(val));
    const valuesReducer = (accumulator, curr) => accumulator + curr;
    if (valuesNumeric.length > 0) {
      return valuesNumeric.reduce(valuesReducer);
    } else {
      return 0;
    }
  } else if (type == "quarterly") {
    const nums = data.map((val) => val[4]);
    const denoms = data.map((val) => val[5]);

    const valuesNumericNum = nums.map((val) => parseFloat(val));
    const valuesNumericDenom = denoms.map((val) => parseFloat(val));
    const valuesReducer = (accumulator, curr) => accumulator + curr;
    if (valuesNumericNum.length > 0 && valuesNumericDenom.length > 0) {
      const num = valuesNumericNum.reduce(valuesReducer);
      const denom = valuesNumericDenom.reduce(valuesReducer);
      return parseFloat(((num * 100) / denom).toFixed(2));
    } else {
      return 0;
    }
  }
}

/**
 * The function filters out data per organization unit
 * @param {*} orgUnits - array of objects of organization units
 * @param {*} data - 2d array
 * @returns - dictionary containing organization unit id as key and the associated raw data
 *            fetched as the value
 */
export function getDataPerOrgUnits(orgUnits, data) {
  const orgUnitIds = orgUnits.map((val) => val.id);
  const orgUnitData = {};

  if (data) {
    if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
      orgUnitIds.map((id) => {
        orgUnitData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
  }
  return orgUnitData;
}

/**
 * Function to compute aggregated values (e.g totals) for all the organization units
 * @param {*} orgUnits - Array of objects of organization units
 * @param {*} data
 * @param {*} periodType - variable denoting whether a period is quarterly or monthly
 * @returns - dictionary of key value pairs of organization unit and associated totals
 */
export function getOrgUnitDataTotals(orgUnits, data, periodType = "monthly") {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = processOrgDataTotal(value, periodType);
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

/**
 * Function to sort the values in a 2d array by a particular column
 * @param {*} a  - 2d array to be sorted
 * @param {*} colIndex - index of the column whose values are used to sort the 2d array
 * @returns - sorted 2d array
 */
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

/**
 * Function to compute the percentage change in an indicator value for a single organisation unit
 * @param {*} data
 * @returns
 */
export function processOrgUnitDataPercent(data) {
  if (!data) {
    return 0;
  }
  const sortedData = sortByColumn(data, 2);
  const values = sortedData.map((val) => val[3]);
  const valuesNumeric = values.map((val) => parseInt(val));
  const percentChange =
    valuesNumeric[0] == 0
      ? ((valuesNumeric[valuesNumeric.length - 1] - valuesNumeric[0]) /
          (valuesNumeric[0] + 1)) *
        100
      : ((valuesNumeric[valuesNumeric.length - 1] - valuesNumeric[0]) /
          valuesNumeric[0]) *
        100;
  return parseFloat(percentChange.toFixed(2));
}

export function computeOrgUnitPercentOfAverage(data, orgUnit) {
  if (!data) {
    return 0;
  }
  const sortedData = sortByColumn(data, 2);
  const periods = [...new Set(sortedData.map((val) => val[2]))].sort();

  const startPeriod = periods[0];
  const endPeriod = periods[periods.length - 1];
  const startData = sortedData.filter((val) => val[2] == startPeriod);
  const endData = sortedData.filter((val) => val[2] == endPeriod);
  const startAverage = processOrgDataTotal(startData) / startData.length;
  const endAverage = processOrgDataTotal(endData) / endData.length;
  let value = null;

  if (startAverage && endAverage) {
    const num = ((endAverage - startAverage) * 100) / startAverage;
    value = parseFloat(num.toFixed(2));
  } else if (!startAverage && endAverage) {
    value = null;
  } else if (startAverage && !endAverage) {
    value = 0;
  }

  return value;
}

/**
 * Function to compute the percentage change in average value of an indicator
 * for organization units
 * @param {*} orgUnits
 * @param {*} data
 * @returns
 */
export function processDataPercentOfAverages(orgUnits, data) {
  if (!data) {
    return {};
  }

  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitAvChanges = {};

  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitAvChanges[key] = computeOrgUnitPercentOfAverage(value, key);
  });

  const orgUnitAvChangesRenamed = {};
  Object.entries(orgUnitAvChanges).forEach(([key, value]) => {
    const orgUnitName = orgUnits
      .filter((i) => i.id == key)
      .map((ou) => ou.name)[0];

    orgUnitAvChangesRenamed[orgUnitName] = value;
  });

  return orgUnitAvChangesRenamed;
}

/**
 * Function to compute the percentage change in an indicator value for organisation units
 * @param {*} orgUnits
 * @param {*} data
 * @returns
 */
export function getOrgUnitDataPercentageChanges(orgUnits, data) {
  const orgUnitData = getDataPerOrgUnits(orgUnits, data);
  const orgUnitDataPercentages = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataPercentages[key] = processOrgUnitDataPercent(value);
  });

  const orgUnitDataPercentagesRenamed = {};
  Object.entries(orgUnitDataPercentages).forEach(([key, value]) => {
    const orgUnitName = orgUnits
      .filter((i) => i.id == key)
      .map((ou) => ou.name)[0];

    orgUnitDataPercentagesRenamed[orgUnitName] = value;
  });

  return orgUnitDataPercentagesRenamed;
}

/**
 * Function to sort an object basing on the values
 * @param {*} data
 * @returns
 */
export function sortDictionary(data) {
  if (data) {
    let items = Object.keys(data).map(function (key) {
      return [key, data[key]];
    });

    items = items.sort(function (first, second) {
      return second[1] - first[1];
    });
    return items;
  } else {
    return [];
  }
}

/**
 * Function to convert data from country level to a time series object
 * @param {*} data
 * @param {*} level
 * @param {*} periodType
 * @returns
 */
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

/**
 * Function to convert data from a district to a time series object
 * @param {*} data
 * @param {*} districts
 * @param {*} level
 * @param {*} selectedDistrict
 * @param {*} periodType
 * @returns
 */
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

/**
 * The function filters the data for all facilities in a selected district. Returning the facility and raw data as key value pairs
 * @param {*} data - 2d array of data from level 5
 * @param {*} level - String specifying the organisation level for the data
 * @param {*} districtFacilitiesMeta
 * @param {*} selectedDistrict
 * @param {*} periodType
 * @returns a dictionary where the key is the facililty and the value is the raw data for that facility
 */

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

/**
 * Function to get the data
 * @param {*} orgUnitIds
 * @param {*} data
 * @returns
 */

export function getDataPerOrgUnitsTwo(orgUnitIds, data) {
  const orgUnitData = {};

  if (data) {
    if (data["results"]["rows"] && data["results"]["rows"].length > 0) {
      orgUnitIds.map((id) => {
        orgUnitData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
  }
  return orgUnitData;
}

/**
 * Function to compute organization data totals - without renaming the organization units
 * @param {*} orgUnitIds
 * @param {*} data
 * @returns
 */
export function getOrgUnitDataTotalsTwo(orgUnitIds, data) {
  const orgUnitData = getDataPerOrgUnitsTwo(orgUnitIds, data);
  const orgUnitDataTotals = {};
  Object.entries(orgUnitData).forEach(([key, value]) => {
    orgUnitDataTotals[key] = processOrgDataTotal(value);
  });

  return orgUnitDataTotals;
}

/**
 * Function to compute the reporting totals for all districts
 * @param {*} facilitiesIdsList
 * @param {*} data
 * @param {*} districtFacilitiesMeta
 * @returns
 */
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

/**
 * Function the copmuter the reporting propertions for the districts
 * @param {*} data
 * @param {*} maptype
 * @param {*} districtFacilitiesMeta
 * @param {*} districts
 * @returns
 */
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

/**
 * Function to extract data from the start and end of a specified period
 * @param {*} data
 * @param {*} periods
 * @returns
 */
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

    return [startData, endData];
  }
}

/**
 * Function to compute the percentage change in reporting proportions for districts
 * @param {*} data
 * @param {*} periods
 * @param {*} districtFacilitiesMeta
 * @param {*} districts
 * @returns
 */
export function computeReportingPercentages(
  data,
  periods,
  districtFacilitiesMeta,
  districts
) {
  // Filter the out the data for periods
  const filteredData = filterStartPeriodEndPeriodData(data, periods);

  if (filteredData) {
    const startReporting = computeReportingProportions(
      filteredData[0],
      "total",
      districtFacilitiesMeta,
      districts
    );

    const endReporting = computeReportingProportions(
      filteredData[1],
      "total",
      districtFacilitiesMeta,
      districts
    );

    const reportingPercentages = {};
    Object.entries(startReporting).forEach(([key, value]) => {
      if (startReporting[key] == 0) {
        reportingPercentages[key] =
          ((endReporting[key] - startReporting[key]) * 100) /
          (startReporting[key] + 1);
      } else {
        reportingPercentages[key] =
          ((endReporting[key] - startReporting[key]) * 100) /
          startReporting[key];
      }
    });

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

    const yearsMonthsProportionsDict = {};

    if (level == "country") {
      yearsMonths.map((val) => {
        const facilityDataList = data["results"]["rows"].filter(
          (res) => res[2] == val
        );
        const facilityList = facilityDataList.map((val) => val[1]);
        const facilitySet = new Set(facilityList);

        yearsMonthsProportionsDict[val] = parseFloat(
          (
            (facilitySet.size * 100) /
            Object.keys(facilitiesMeta).length
          ).toFixed(2)
        );
      });
    } else if (level == "district") {
      yearsMonths.map((val) => {
        const facilityDataList = data["results"]["rows"].filter(
          (res) => res[2] == val
        );
        const facilityList = facilityDataList.map((val) => val[1]);
        const facilitySet = new Set(facilityList);

        yearsMonthsProportionsDict[val] = parseFloat(
          (
            (facilitySet.size * 100) /
            districtFacilitiesMeta[district]["facility_ids"].length
          ).toFixed(2)
        );
      });
    }

    return yearsMonthsProportionsDict;
  }
}

/**
 * Function to extract data for a particular district
 * @param {*} data
 * @param {*} district - district of interest
 * @param {*} districtFacilitiesMeta - meta data of the facilities in districts
 * @returns
 */
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

/**
 * Function that converts an array of months to an array of quarters
 * @param {*} months - array of date months e.g 202001
 * @returns - array of data quarters e.g 2020Q1
 */
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

/**
 * Function to return the list of months or quarters between the start month and end month
 * @param {*} startPeriod
 * @param {*} endPeriod
 * @param {*} periodType - string denoting whether months or quarters
 * @returns list
 */
export function periodBetween(startPeriod, endPeriod, periodType) {
  const months = monthsBetween(startPeriod, endPeriod);
  if (periodType == "monthly") {
    return months;
  } else {
    const quarters = monthsToQuarters(months);
    return quarters;
  }
}

/**
 * Function to get the time period from the start of current calendar year
 * to the current month
 * @returns period - list of start month and end month
 */
export function getTimePeriodRange() {
  const d = new Date();
  console.log(`Printing out the month:${d.getMonth()}`);
  const mth = d.getMonth() == 1 ? 12 : d.getMonth() - 1;
  const yr = d.getMonth() == 1 ? d.getFullYear() - 1 : d.getFullYear();
  const currMth = mth < 10 ? "0" + mth : mth;
  const period = [moment(yr + "-01-01"), moment(yr + "-" + currMth + "-01")];
  return period;
}

export function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

export function processNansum(data, multiplicator = 1) {
  if (!data || data === undefined) {
    return;
  }
  const timePeriods = [...new Set(data.map((val) => val[2]))];
  const orgUnits = [...new Set(data.map((val) => val[1]))];
  const processedData = [];
  timePeriods.forEach((pe, index) => {
    orgUnits.forEach((org, idx) => {
      const dataPeriodOrg = data.filter((val) => val[2] == pe && val[1] == org);
      const dataPeriodOrgValue = dataPeriodOrg.map((val) => parseFloat(val[3]));
      processedData.push([
        "",
        org,
        pe,
        dataPeriodOrgValue.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0) * multiplicator,
      ]);
    });
  });

  return { results: { rows: processedData } };
}

export function findPosition(meta, key) {
  //takes in results.headers
  let searchIndex = -1;
  meta.forEach((d, index) => {
    if (d.name === key) {
      searchIndex = index;
    }
  });
  return searchIndex;
}

/**
 *  Function that adds districts and null values as key value pairs for districts
 *  where no data is reported
 * @param {*} districts - list of district objects
 * @param {*} data - dictionary of the districts and their associated values
 */
export function postProcessData(districts, data) {
  if (!data || data == null) {
    return;
  }
  districts.forEach((district) => {
    if (
      data[district.name] === undefined ||
      isNaN(data[district.name]) ||
      data[district.name] == null
    ) {
      data[district.name] = 0;
    }
  });
  return data;
}

export const customColorScale = [
  [0, "rgb(128,128,128)"],
  [0.0, "rgb(165,0,38)"],
  [0.111111111111, "rgb(215,48,39)"],
  [0.222222222222, "rgb(244,109,67)"],
  [0.333333333333, "rgb(253,174,97)"],
  [0.444444444444, "rgb(254,224,144)"],
  [0.555555555556, "rgb(224,243,248)"],
  [0.666666666667, "rgb(171,217,233)"],
  [0.777777777778, "rgb(116,173,209)"],
  [0.888888888889, "rgb(69,117,180)"],
  [1.0, "rgb(33,102,172)"],
];
