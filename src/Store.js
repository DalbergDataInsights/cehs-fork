import { fromPairs, max, maxBy, sortBy, sum, uniq } from "lodash";
import { makeAutoObservable } from "mobx";
import moment from "moment";
import { colors } from "./Colors";
import { VisualizationData } from "./models/VisualizationData";

const fig = {
  2018: "rgb(185, 221, 241)",
  2019: "rgb(106, 155, 195)",
  2020: "rgb(200, 19, 60)",
};

export class Store {
  indicatorGroupSets = [];
  districts = [];
  organisationUnitLevels = [];
  geojson = new VisualizationData("map");
  geojson1 = new VisualizationData("map");
  acrossCountry = new VisualizationData("line");
  horizontalData = new VisualizationData("bar");
  horizontalData1 = new VisualizationData("bar");
  acrossDistrict = new VisualizationData("line");
  treeData = new VisualizationData("treemap");
  facilityData = new VisualizationData("line");
  currentParents = [];
  countryReport = new VisualizationData("line");
  countryMapData = new VisualizationData("map");
  countryMapData1 = new VisualizationData("map");
  districtReport = new VisualizationData("line");
  overview = [];
  rawGeojson = [];
  w = [];
  s = [];
  i = [];
  r = [];

  years = ["2018", "2019", "2020"];
  months = [
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

  selectedVariable = "1st_anc_visits";
  selectedIndicatorGroupSet = "";
  selectedIndicatorGroup = "";
  selectedIndicator = "";
  selectedDistrict = "";
  selectedLevel = "";
  country = "";
  countryAnalyticsTitle = "";
  districtAnalyticsTitle = "";
  currentFacility = "";
  page = "trends";
  currentPoint = 1;
  loading = false;
  selectedPolicy = "Keep outliers";
  selectedAnalysis = "Compare two months";
  period = [moment("2019-01-01"), moment("2020-01-31")];

  selectedPecentageOption = "1";
  selectedTotalOption = "1";
  selectedContributionOption = "1";
  dataSet = "";

  d2 = null;
  constructor(d2) {
    makeAutoObservable(this, {
      d2: false,
      years: false,
      months: false,
    });
    this.d2 = d2;
    if (this.shown) {
      this.loadIndicatorGroupSets();
    }
  }

  setIndicatorGroupSets = (val) => (this.indicatorGroupSets = val);
  setOrganisationUnitLevels = (val) => (this.organisationUnitLevels = val);
  setCountry = (val) => (this.country = val);
  setIndicatorGroups = (val) => (this.indicatorGroups = val);
  setDistricts = (val) => (this.districts = val);
  setCountryAnalyticsTitle = (val) => (this.countryAnalyticsTitle = val);
  setDistrictAnalyticsTitle = (val) => (this.districtAnalyticsTitle = val);
  setCurrentParents = (val) => (this.currentParents = val);
  setCurrentFacility = (val) => (this.currentFacility = val);
  setPage = (val) => (this.page = val);
  setOverview = (val) => (this.overview = val);
  setCurrentPoint = (val) => (this.currentPoint = val);
  setRawGeojson = (val) => (this.rawGeojson = val);
  setW = (val) => (this.w = val);
  setS = (val) => (this.s = val);
  setI = (val) => (this.i = val);
  setR = (val) => (this.r = val);

  setSelectedIndicatorGroupSet = (val) =>
    (this.selectedIndicatorGroupSet = val);
  setSelectedIndicatorGroup = (val) => (this.selectedIndicatorGroup = val);
  setSelectedIndicator = (val) => (this.selectedIndicator = val);
  setSelectedDistrict = (val) => (this.selectedDistrict = val);
  setSelectedLevel = (val) => (this.selectedLevel = val);
  setCountry = (val) => (this.country = val);
  setDataSet = (val) => (this.dataSet = val);
  load = () => (this.loading = true);
  unLoad = () => (this.loading = false);

  loadIndicatorGroupSets = async () => {
    this.load();
    if (this.d2) {
      const api = this.d2.Api.getApi();
      try {
        const iGroupsRequest = api.get("indicatorGroupSets", {
          fields:
            "id,name,indicatorGroups[id,name,indicators[id,name,description]]",
          paging: false,
        });

        const uLevelsRequest = api.get("organisationUnitLevels.json", {
          fields: "id,name,level",
          paging: false,
        });

        const topLevelRequest = api.get("organisationUnits.json", {
          level: 1,
          fields: "id",
        });

        const settingsRequest = api.get("dataStore/cehs/settings");

        const [
          { indicatorGroupSets },
          { organisationUnitLevels },
          { organisationUnits },
          { w, s, i, r, igs, gp, ind, district, level, country, dataset },
        ] = await Promise.all([
          iGroupsRequest,
          uLevelsRequest,
          topLevelRequest,
          settingsRequest,
        ]);
        this.setIndicatorGroupSets(indicatorGroupSets);
        this.setOrganisationUnitLevels(organisationUnitLevels);
        this.setCountry(organisationUnits[0].id);
        this.setW(w);
        this.setS(s);
        this.setI(i);
        this.setR(r);
        this.setSelectedIndicatorGroupSet(igs);
        this.setSelectedIndicatorGroup(gp);
        this.setSelectedIndicator(ind);
        this.setSelectedDistrict(district);
        this.setSelectedLevel(level);
        this.setCountry(country);
        this.setDataSet(dataset);
        await this.loadGeojson();
      } catch (error) {
        console.log(error);
      }
    }
    this.unLoad();
  };

  onIndicatorGroupSetChange = (value) => {
    this.selectedIndicatorGroupSet = value;
  };

  onIndicatorGroupChange = (value) => {
    this.selectedIndicatorGroup = value;
  };

  onIndicatorChange = async (value) => {
    this.selectedIndicator = value;
    if (this.page === "trends") {
      this.acrossCountry.load();
      const [countryData, countryTitle] = await Promise.all([
        this.loadYearlyData(this.country),
        this.loadTrendTitle(this.country),
      ]);
      this.acrossCountry.setData(countryData);
      this.acrossCountry.finish();
      this.setCountryAnalyticsTitle(countryTitle);
    } else if (this.page === "reports") {
      this.countryReport.load();
      const reportData = await this.loadReportData(this.country);
      this.countryReport.setData(reportData);
      this.countryReport.finish();
    }
    await this.onDistrictChange(this.selectedDistrict);
    await this.onLevelChange(this.selectedLevel);
  };

  onDistrictChange = async (value) => {
    this.selectedDistrict = value;
    if (this.page === "trends") {
      this.acrossDistrict.load();
      const [districtData, districtTitle] = await Promise.all([
        this.loadYearlyData(this.selectedDistrict),
        this.loadTrendTitle(this.selectedDistrict),
        this.loadTreeMapData(),
      ]);
      this.acrossDistrict.setData(districtData);
      this.acrossDistrict.finish();
      this.setDistrictAnalyticsTitle(districtTitle);
      await this.loadFacilityData(this.currentPoint);
    } else if (this.page === "reports") {
      this.districtReport.load();
      const reportData = await this.loadReportData(this.selectedDistrict);
      this.districtReport.setData(reportData);
      this.districtReport.finish();
    }
  };

  onAnalysisChange = (value) => {
    this.selectedAnalysis = value;
  };

  onLevelChange = async (value) => {
    this.selectedLevel = value;
    if (this.page === "trends") {
      await Promise.all([this.loadMapData(), this.loadMapData1()]);
    } else if (this.page === "reports") {
      await Promise.all([this.loadMapReport(), this.loadMapReport1()]);
    }
  };

  onPeriodChange = async (value) => {
    this.period = value;
    if (this.page === "overview") {
      await this.loadOverview();
    } else if (this.page === "trends") {
      await this.loadTrends();
    } else if (this.page === "reports") {
      this.loadReports();
    }
  };

  onPolicyChange = async (value) => {
    this.selectedPolicy = value;
    if (this.page === "overview") {
      await this.loadOverview();
    }
  };

  onPercentageOptionChange = async (value) => {
    this.selectedPecentageOption = value;
    await this.loadMapData();
  };
  onTotalOptionChange = async (value) => {
    this.selectedTotalOption = value;
    await this.loadMapData1();
  };
  onContributionOptionChange = async (value) => {
    this.selectedContributionOption = value;
    await this.loadTreeMapData();
    await this.loadFacilityData(1);
  };

  loadYearlyData = async (location) => {
    if (this.d2 && location) {
      let req1 = new this.d2.analytics.request().withSkipData(false);
      let req2 = new this.d2.analytics.request().withSkipData(false);
      let req3 = new this.d2.analytics.request().withSkipData(false);

      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitFilter([location]);
      req1.addPeriodDimension([...this.months.map((p) => `2018${p}`)]);

      req2.addDataFilter([this.selectedIndicator]);
      req2.addOrgUnitFilter([location]);
      req2.addPeriodDimension([...this.months.map((p) => `2019${p}`)]);

      req3.addDataFilter([this.selectedIndicator]);
      req3.addOrgUnitFilter([location]);
      req3.addPeriodDimension([...this.months.map((p) => `2020${p}`)]);

      const all = await Promise.all([
        this.d2.analytics.aggregate.get(req1),
        this.d2.analytics.aggregate.get(req2),
        this.d2.analytics.aggregate.get(req3),
      ]);

      return all.map((ind, i) => {
        const name = this.years[i];
        const x = ind.rows.map((r) => {
          return moment(r[0], "YYYYMM").format("MMM");
        });
        const y = ind.rows.map((r) => r[1]);
        return {
          name,
          x,
          y,
          hoverinfo: "x+y",
          type: "scatter",
          marker: {
            color: fig[name],
            size: 10,
            symbol: "square",
          },
          line: {
            width: 2,
          },
        };
      });
    }
  };

  loadMapData = async () => {
    this.horizontalData.load();
    this.geojson.load();
    try {
      const units = this.districts.map((ou) => ou.id);
      let ai = [moment(this.period[0]).format("YYYYMM")];
      let ar = [moment(this.period[1]).format("YYYYMM")];

      if (this.selectedPecentageOption === "2") {
        ai = [
          moment(this.period[0]).add(-2, "months").format("YYYYMM"),
          moment(this.period[0]).add(-1, "months").format("YYYYMM"),
          moment(this.period[0]).format("YYYYMM"),
        ];
        ar = [
          moment(this.period[1]).add(-2, "months").format("YYYYMM"),
          moment(this.period[1]).add(-1, "months").format("YYYYMM"),
          moment(this.period[1]).format("YYYYMM"),
        ];
      }

      const periods = uniq([...ai, ...ar]);
      let req1 = new this.d2.analytics.request().withSkipData(false);

      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitDimension(units);
      req1.addPeriodDimension(periods);

      const { rows } = await this.d2.analytics.aggregate.get(req1);

      const values = this.districts.map((unit) => {
        let current = 0;
        let previous = 0;
        const search1 = rows.filter(
          (r) => r[0] === unit.id && ai.indexOf(r[1]) !== -1
        );

        const search2 = rows.filter(
          (r) => r[0] === unit.id && ar.indexOf(r[1]) !== -1
        );

        if (this.selectedPecentageOption === "1") {
          if (search1.length > 0) {
            previous = Number(search1[0][2]);
          }
          if (search2.length > 0) {
            current = Number(search2[0][2]);
          }
        } else if (this.selectedPecentageOption === "2") {
          if (search1.length > 0) {
            previous = sum(search1.map((s) => Number(s[2]))) / 3;
          }
          if (search2.length > 0) {
            current = sum(search2.map((s) => Number(s[2]))) / 3;
          }
        }
        if (current !== 0) {
          return { unit: unit.name, value: (previous - current) / current };
        }
        return { unit: unit.name, value: 0 };
      });

      const data = {
        type: "choroplethmapbox",
        locations: this.districts.map((ou) => ou.name),
        z: values.map((v) => v.value),
        featureidkey: "properties.name",
        geojson: this.rawGeojson,
      };
      const sorted = sortBy(values, "value");
      const horizontalData = [
        {
          type: "bar",
          x: sorted.map((v) => v.value).slice(0, 10),
          y: sorted.map((v) => v.unit).slice(0, 10),
          marker: {
            color: "rgb(200, 19, 60)",
          },
          orientation: "h",
        },
      ];
      this.horizontalData.setData(horizontalData);
      this.geojson.setData([data]);
    } catch (error) {
      console.log(error);
    }
    this.horizontalData.finish();
    this.geojson.finish();
  };

  getMonths = (startDate, endDate) => {
    let months = [];
    const interim = startDate.clone();
    while (endDate >= interim) {
      months = [...months, interim.format("YYYYMM")];
      interim.add(1, "month");
    }
    return months;
  };

  loadGeojson = async () => {
    const api = this.d2.Api.getApi();
    if (this.selectedLevel) {
      const { organisationUnits } = await api.get("organisationUnits.json", {
        fields: "id,name",
        paging: false,
        level: this.selectedLevel,
      });
      const geojson = await api.get("organisationUnits.geojson", {
        level: this.selectedLevel,
      });
      this.setRawGeojson(geojson);
      this.setDistricts(organisationUnits);
    }
  };

  loadMapData1 = async () => {
    this.horizontalData1.load();
    this.geojson1.load();
    try {
      let periods = [moment(this.period[0]).format("YYYYMM")];
      if (this.selectedTotalOption !== "1") {
        periods = this.getMonths(
          moment(this.period[0]),
          moment(this.period[1])
        );
      }
      const units = this.districts.map((ou) => ou.id);

      let req1 = new this.d2.analytics.request().withSkipData(false);
      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitDimension(units);

      if (this.selectedTotalOption !== "1") {
        req1.addPeriodDimension(periods);
      } else {
        req1.addPeriodFilter(periods);
      }
      const { rows } = await this.d2.analytics.aggregate.get(req1);

      const values = this.districts.map((unit) => {
        let current = 0;
        const search1 = rows.filter((r) => r[0] === unit.id);
        if (this.selectedTotalOption === "1") {
          if (search1.length > 0) {
            current = Number(search1[0][1]);
          }
        } else if (this.selectedTotalOption === "2") {
          if (search1.length > 0) {
            current = sum(search1.map((d) => Number(d[2])));
          }
        } else if (this.selectedTotalOption === "3") {
          if (search1.length > 0) {
            current = sum(search1.map((d) => Number(d[2]))) / periods.length;
          }
        }

        if (current !== 0) {
          return { unit: unit.name, value: current };
        }
        return { unit: unit.name, value: 0 };
      });
      const data = {
        type: "choroplethmapbox",
        locations: this.districts.map((ou) => ou.name),
        z: values.map((v) => v.value),
        featureidkey: "properties.name",
        geojson: this.rawGeojson,
      };
      const sorted = sortBy(values, "value");
      const horizontalData = [
        {
          type: "bar",
          x: sorted.map((v) => v.value).slice(0, 10),
          y: sorted.map((v) => v.unit).slice(0, 10),
          orientation: "h",
        },
      ];
      this.horizontalData1.setData(horizontalData);
      this.geojson1.setData([data]);
    } catch (error) {
      console.log(error);
    }
    this.horizontalData1.finish();
    this.geojson1.finish();
  };

  loadTrendTitle = async (location) => {
    let current = 0;
    let previous = 0;
    const periods = this.period.map((p) => p.format("YYYYMM"));
    const indicators = [this.selectedIndicator];
    let req1 = new this.d2.analytics.request().withSkipData(false);
    req1.addDataFilter(indicators);
    req1.addOrgUnitFilter([location]);
    req1.addPeriodDimension(periods);

    const { rows } = await this.d2.analytics.aggregate.get(req1);

    const search1 = rows.find((r) => r[0] === periods[0]);
    const search2 = rows.find((r) => r[0] === periods[1]);

    if (search1) {
      previous = Number(search1[1]);
    }

    if (search2) {
      current = Number(search2[1]);
    }

    if (current !== 0) {
      const change = Number(
        (((current - previous) * 100) / previous).toFixed(0)
      );

      if (change < 0) {
        return `decreased by ${change * -1}% ${this.periodDescription}`;
      } else if (change > 0) {
        return `increased by ${change}% ${this.periodDescription}`;
      }
      return `remained constant ${this.periodDescription}`;
    }

    if (previous !== 0) {
      return `decreased by ${change * -1}% ${this.periodDescription}`;
    }

    return `remained constant ${this.periodDescription}`;
  };

  loadTreeMapData = async () => {
    this.treeData.load();
    const level = this.maxLevel - this.selectedLevel;
    let periods = [moment(this.period[0]).format("YYYYMM")];
    const colors = ["#e2d5d1", "#96c0e0", "#3c6792"];
    const iterator = colors[Symbol.iterator]();
    if (this.selectedContributionOption !== "1") {
      periods = this.getMonths(moment(this.period[0]), moment(this.period[1]));
    }
    const api = this.d2.Api.getApi();
    try {
      const { organisationUnits } = await api.get(
        `organisationUnits/${this.selectedDistrict}.json`,
        {
          includeDescendants: true,
          level,
          fields: "id,name",
        }
      );

      const units = organisationUnits.map((o) => o.id);
      const realUnits = fromPairs(organisationUnits.map((o) => [o.id, o.name]));

      let req1 = new this.d2.analytics.request().withSkipData(false);

      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitDimension(units);

      if (this.selectedContributionOption !== "1") {
        req1.addPeriodDimension(periods);
      } else {
        req1.addPeriodFilter(periods);
      }
      const {
        rows,
        metaData: { items },
      } = await this.d2.analytics.aggregate.get(req1);

      const without = rows.filter((r) => r[0] !== this.selectedDistrict);
      const organisations = uniq(without.map((r) => r[0]));
      const currentValues = organisations.map((ou) => {
        const search1 = without.filter((r) => r[0] === ou);
        if (this.selectedContributionOption === "1" && search1.length > 0) {
          return search1[0][1];
        } else if (this.selectedContributionOption === "2") {
          return sum(search1.map((d) => Number(d[2])));
        } else if (this.selectedContributionOption === "3") {
          return sum(search1.map((d) => Number(d[2]))) / periods.length;
        }
      });

      const values = [sum(currentValues), ...currentValues];
      const scaleMax = Number(
        Number((max(currentValues) / sum(currentValues)) * 100).toFixed(2)
      );
      const parents = ["", ...without.map(() => this.districtName)];
      const parentsIds = [
        items[this.selectedDistrict],
        ...organisations.map((u) => items[u]),
      ];
      this.setCurrentParents(parentsIds);
      const labels = [
        this.districtName,
        ...organisations.map((w) => realUnits[w]),
      ];
      const data = [
        {
          type: "treemap",
          labels,
          parents,
          values,
          // marker: {
          //   colors: [
          //     "#e2d5d1",
          //     "#96c0e0",
          //     "#3c6792",
          //     "#e2d5d1",
          //     "#96c0e0",
          //     "#3c6792",
          //   ],
          //   colorscale: "Cividis",
          //   cmin: 0,
          //   cmid: scaleMax / 3,
          //   cmax: scaleMax,
          // },
          branchvalues: "total",
          textinfo: "label+value+percent parent",
        },
      ];
      this.treeData.setData(data);
    } catch (error) {
      console.log(error);
    }
    this.treeData.finish();
  };

  loadFacilityData = async (pointNumber) => {
    this.setCurrentPoint(pointNumber);
    this.facilityData.load();
    if (pointNumber !== 0 && this.currentParents.length > 1) {
      const { uid, name } = this.currentParents[this.currentPoint];
      const data = await this.loadYearlyData(uid);
      this.setCurrentFacility(name);
      this.facilityData.setData(data);
    } else {
      this.facilityData.setData([]);
    }
    this.facilityData.finish();
  };

  loadReportData = async (location) => {
    const api = this.d2.Api.getApi();
    const periods = this.getMonths(this.period[0], this.period[1]);
    let req1 = new this.d2.analytics.request().withSkipData(false);
    req1.addDataFilter([`${this.dataSet}.REPORTING_RATE`]);
    req1.addOrgUnitFilter([location]);
    req1.addPeriodDimension(periods);

    let req2 = new this.d2.analytics.request().withSkipData(false);
    req2.addDataFilter([this.selectedIndicator]);
    req2.addOrgUnitDimension([`LEVEL-${this.maxLevel}`, location]);
    req2.addPeriodDimension(periods);

    const req3 = new this.d2.analytics.request();
    req3.withSkipData(true);
    req3.addOrgUnitDimension([`LEVEL-${this.maxLevel}`, location]);
    req3.addPeriodFilter([this.period[1].format("YYYYMM")]);

    const [rates, actual, units] = await Promise.all([
      this.d2.analytics.aggregate.get(req1),
      this.d2.analytics.aggregate.get(req2),
      api.get(
        `analytics.json?dimension=ou:LEVEL-${
          this.maxLevel
        };${location}&filter=pe:${this.period[1].format(
          "YYYYMM"
        )}&skipData=true&skipMeta=false`
      ),
    ]);

    const expected = units.metaData.dimensions.ou.length;

    const data = periods.map((p) => {
      const current = rates.rows.find((r) => r[0] === p);
      const reportedMore = actual.rows
        .filter((r) => r[1] === p && parseFloat(r[2]) > 0)
        .map((r) => r[0]).length;
      return {
        rate: !!current ? parseFloat(current[1]) : 0,
        actual: (reportedMore * 100) / expected,
      };
    });

    return [
      {
        name: "Percentage of facilities expected to report which reported on there 105-1 form",
        x: periods.map((p) => moment(p, "YYYYMM").format("MMM YYYY")),
        y: data.map((d) => d.rate),
        hoverinfo: "x+y",
        type: "scatter",
        marker: {
          color: "rgb(106, 155, 195)",
          size: 10,
          symbol: "square",
        },
        line: {
          width: 2,
        },
      },
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
  };

  loadMapReport = async () => {
    this.countryMapData.load();
    const units = this.districts.map((ou) => ou.id);

    const req = units.map((unit) => {
      const req1 = new this.d2.analytics.request().withSkipData(false);
      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitDimension([`LEVEL-${this.maxLevel}`, unit]);
      req1.addPeriodFilter([this.period[1].format("YYYYMM")]);
      return this.d2.analytics.aggregate.get(req1);
    });

    const all = await Promise.all(req);

    const z = all.map(
      ({
        rows,
        metaData: {
          dimensions: { ou },
        },
      }) => {
        const moreThanZero = uniq(
          rows.filter((r) => Number(r[1]) > 0).map((r) => r[0])
        ).length;

        return (moreThanZero / ou.length) * 100;
      }
    );

    const data = {
      type: "choroplethmapbox",
      locations: this.districts.map((ou) => ou.name),
      z,
      featureidkey: "properties.name",
      geojson: this.rawGeojson,
    };

    this.countryMapData.setData([data]);

    this.countryMapData.finish();
  };

  loadMapReport1 = async () => {
    this.countryMapData1.load();
    const units = this.districts.map((ou) => ou.id);

    const req = units.map((unit) => {
      const req1 = new this.d2.analytics.request().withSkipData(false);
      req1.addDataFilter([this.selectedIndicator]);
      req1.addOrgUnitDimension([`LEVEL-${this.maxLevel}`, unit]);
      req1.addPeriodFilter([this.period[1].format("YYYYMM")]);
      return this.d2.analytics.aggregate.get(req1);
    });

    const all = await Promise.all(req);

    const z = all.map(
      ({
        rows,
        metaData: {
          dimensions: { ou },
        },
      }) => {
        const moreThanZero = uniq(
          rows.filter((r) => Number(r[1]) > 0).map((r) => r[0])
        ).length;

        return (moreThanZero / ou.length) * 100;
      }
    );

    const data = {
      type: "choroplethmapbox",
      locations: this.districts.map((ou) => ou.name),
      z,
      featureidkey: "properties.name",
      geojson: this.rawGeojson,
    };

    this.countryMapData1.setData([data]);

    this.countryMapData1.finish();
  };

  loadOverview = async () => {
    let currentIndicators = this.w;
    if (this.selectedPolicy === "Correct outliers using SD") {
      currentIndicators = this.s;
    } else if (this.selectedPolicy === "Correct outliers using ICR") {
      currentIndicators = this.i;
    } else if (this.selectedPolicy === "Report") {
      currentIndicators = this.r;
    }
    if (currentIndicators.length > 0) {
      const period = this.period.map((p) => p.format("YYYYMM"));
      const api = this.d2.Api.getApi();
      const { organisationUnits } = await api.get("organisationUnits.json", {
        level: 1,
        fields: "id",
      });

      const ou = organisationUnits.map((u) => u.id);
      const req1 = new this.d2.analytics.request().withSkipData(false);
      req1.addDataDimension(currentIndicators);
      req1.addOrgUnitFilter(ou);
      req1.addPeriodDimension(period);
      const { rows } = await this.d2.analytics.aggregate.get(req1);

      const processed = currentIndicators.map((i, index) => {
        let current = 0;
        let previous = 0;
        let percentage = 0;
        const inds = rows.filter((r) => r[0] === i);
        const prev = inds.find(
          (ind) => ind[1] === this.period[0].format("YYYYMM")
        );
        const curr = inds.find(
          (ind) => ind[1] === this.period[1].format("YYYYMM")
        );

        if (prev) {
          previous = Number(prev[2]);
        }

        if (curr) {
          current = Number(curr[2]);
        }

        if (current !== 0) {
          percentage = ((current - previous) * 100) / current;
        }

        percentage =
          percentage < 0
            ? `${percentage.toFixed(1)}%`
            : `+${percentage.toFixed(1)}%`;
        const color = colors[index];
        return { ...color, total: current, percentage };
      });
      this.setOverview(processed);
    }
  };

  loadTrends = async () => {
    this.setPage("trends");
    this.onIndicatorGroupSetChange(this.selectedIndicatorGroupSet);
    await Promise.all([
      this.onIndicatorChange(this.selectedIndicator),
      this.onLevelChange(this.selectedLevel),
    ]);
  };

  loadReports = async () => {
    this.setPage("reports");
    this.onIndicatorGroupSetChange(this.selectedIndicatorGroupSet);
    await Promise.all([
      this.onIndicatorChange(this.selectedIndicator),
      this.onLevelChange(this.selectedLevel),
    ]);
  };

  get indicatorGroups() {
    const indicatorGroupSet = this.indicatorGroupSets.find(
      (i) => i.id === this.selectedIndicatorGroupSet
    );
    if (indicatorGroupSet) {
      return indicatorGroupSet.indicatorGroups;
    }
    return [];
  }

  get indicators() {
    const indicatorGroup = this.indicatorGroups.find(
      (i) => i.id === this.selectedIndicatorGroup
    );
    if (indicatorGroup) {
      return indicatorGroup.indicators;
    }
    return [];
  }

  get indicatorDescription() {
    const ind = this.indicators.find((i) => i.id === this.selectedIndicator);
    if (ind) {
      return ind.description;
    }
    return "";
  }

  get maxLevel() {
    if (this.organisationUnitLevels.length > 0) {
      return parseInt(maxBy(this.organisationUnitLevels, "level").level, 10);
    }
    return 4;
  }

  get periodDescription() {
    return `between ${this.period[0].format(
      "MMM-YYYY"
    )} and ${this.period[1].format("MMM-YYYY")}`;
  }

  get districtName() {
    const district = this.districts.find((d) => d.id === this.selectedDistrict);

    if (district) {
      return district.name;
    }

    return "";
  }
  get shown() {
    return this.page !== "overview";
  }
}
