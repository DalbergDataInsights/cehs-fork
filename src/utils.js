import { fromPairs } from "lodash";
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

export function processCountryData(data) {
  const years = ["2018", "2019", "2020", "2021"];
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

  const x = [
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

  return years.map((year) => {
    const y = months.map((m) => parseInt(data[`${year}${m}`]));
    return {
      name: year,
      x,
      y,
      hoverinfo: "x+y",
      type: "scatter",
      marker: {
        color: fig[year],
        size: 10,
        symbol: "square",
      },
      line: {
        width: 2,
      },
    };
  });
}

export function processTitle(startDate, endDate, data, periodDescription = "") {
  const current = data[endDate] || 0;
  const previous = data[startDate] || 0;
  if (current !== 0) {
    const change = Number((((current - previous) * 100) / current).toFixed(0));

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
  if (data) {
    return data[0].map((x, i) => data.map((x) => x[i]));
  }
}

export function processOrgRawDataToTimeSeries(data) {
  if (!data) {
    return {};
  }
  let data_tranposed = transpose(data); // tranpose the data
  let time = data_tranposed[2]; // Get the raw time periods
  let values = data_tranposed[3].map((val) => parseInt(val)); // Get the raw values
  let time_unique = Array.from(new Set(time)); // Get a list of unique time periods
  let time_dict = {}; // Create an empty dictionary

  // Initalize the time dictionary
  for (let i = 0; i < time_unique.length; i++) {
    let x = 0;
    let time_i = time_unique[i];
    for (let j = 0; j < time.length; j++) {
      if (time[j] == time_i) {
        x = x + values[j];
      }
    }
    time_dict[time_unique[i]] = x;
  }

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
  console.log("Printing organisation units");
  console.log(orgUnitIds);
  const orgUnitData = {};

  if (data) {
    if (data["results"]["rows"]) {
      orgUnitIds.map((id) => {
        orgUnitData[`${id}`] = data["results"]["rows"].filter(
          (val) => val[1] == id
        );
      });
    }
    console.log("Printing out districts data");
    console.log(orgUnitData);
    console.log(Object.keys(orgUnitData));
  }
  return orgUnitData;
}
