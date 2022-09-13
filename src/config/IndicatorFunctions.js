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

export function weightedAverage({
  numerator,
  denominator,
  multiplier,
  divisor,
}) {
  const numerators = multiplyVectors(numerator, multiplier);
  const denominators = multiplyVectors(denominator, divisor);

  const sameDenominatorNumerator = [];
  const denominatorTotal = denominators.reduce((a, b) => a * b, 1);

  for (let i = 0; i < numerators.length; i++) {
    sameDenominatorNumerator.push(
      (numerators[i] * denominatorTotal) / denominators[i]
    );
  }

  const numeratorTotal = sameDenominatorNumerator.reduce((a, b) => a + b, 0);

  return numeratorTotal / (denominatorTotal * numerator.length);
}

// TODO: you probably could make a multi-dimensional aggregation function
// several steps though:
// 1: Build an index (just concat strings of every dimension)
// 2: Get all unique indecies
// 3: Aggregate the same way you do it here
// extra: then your [dim] will become a list and you will need to unwrap it
export function aggregate(meta, data, dim, f = weightedAverage, plug = {}) {
  // aggregate list of dictionaries grouping by dimension
  // you can pass any aggregate function, it will transpose the expected data format for you
  let pos = -1;
  if (dim instanceof Array) {
    //["pe", "ou"]
    // first define unique index
    data = data.map((el) => {
      const index = dim.map((k) => el[findPosition(meta, k)]).join("+");
      el.push(index); // [dx, ou, pe, val, nom, mul, den, div, index] <- [pe] = "2018"
      return el;
    });
    pos = data[0].length - 1;
  } else {
    pos = findPosition(meta, dim);
  }
  // return a list of all unique values of the position
  const uniqueDim = [...new Set(data.map((element) => element[pos]))];

  const out = [];
  for (const ud of uniqueDim) {
    // filter so that all the values of specific elements are corresponding value
    // if the dimension is an orgUnit, it will return list of N dicts where
    // N is a number of periods (and other dimensions) passed
    // be careful to first filter initial data by the data element dimension
    const aggTarget = data.filter((element) => element[pos] === ud);

    out.push({
      [dim]: ud,
      value: aggTarget.length > 0 ? f(transposeAndCast(meta, aggTarget)) : NaN,
      ...plug, // you can plug things like variable ID it will be the same for each element
    });
  }

  return out;
}

export function processNansum(data, multiplicator = 1) {
  if (!data || data === undefined) {
    return;
  }
  const timePeriods = [...new Set(data.map((val) => val[2]))];
  const orgUnits = [...new Set(data.map((val) => val[1]))];
  // const dataElements = [...new Set(data.map((val) => val[0]))];
  // const d = dataElements.join("_");

  //Iterate over the timePeriods and  orgUnits
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

export function processRatioNansum({
  data,
  numeratorIds,
  denominatorIds,
  multiplicator = 1,
  divisor = 1,
}) {
  const numeratorData = data.filter((val) => numeratorIds.includes(val[0]));
  const denominatorData = data.filter((val) => denominatorIds.includes(val[0]));

  const processedNumeratorData = processNansum(numeratorData, multiplicator);
  const processedDenominatorData = processNansum(denominatorData, divisor);

  const timePeriods = [...new Set(data.map((val) => val[2]))];
  const orgUnits = [...new Set(data.map((val) => val[1]))];

  const finalData = [];
  timePeriods.forEach((pe, index) => {
    orgUnits.forEach((org, index) => {
      console.log(pe, org);
      const dataPeriodOrgNum = processedNumeratorData.filter(
        (val) => val[2] == pe && val[1] == org
      );
      const dataPeriodOrgDen = processedDenominatorData.filter(
        (val) => val[2] == pe && val[1] == org
      );
      finalData.push([
        "",
        org,
        pe,
        parseFloat(
          (dataPeriodOrgNum[0][3] / dataPeriodOrgDen[0][3]).toFixed(3)
        ),
      ]);
    });
  });

  return finalData;
}
