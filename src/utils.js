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
    const y = months.map((m) => data[`${year}${m}`] || "");
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
