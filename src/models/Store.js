import moment from "moment";
import { domain } from "./Domain";
import * as events from "./Events";
export const $store = domain
  .createStore({
    currentUser: "",
    indicator: "",
    years: ["2018", "2019", "2020"],
    months: [
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
    ],
    selectedVariable: "1st_anc_visits",
    selectedDataElementGroup: "",
    selectedIndicatorGroupSet: "",
    selectedIndicatorGroup: "",
    selectedIndicator: "",
    selectedDataElement: "",
    dataElementGroups: [],
    selectedDistrict: "",
    selectedLevel: "",
    country: "",
    countryAnalyticsTitle: "",
    districtAnalyticsTitle: "",
    currentFacility: "",
    page: "trends",
    currentPoint: 1,
    loading: false,
    selectedPolicy: "Keep outliers",
    selectedAnalysis: "Compare two months",
    period: [moment("2021-01-01"), moment("2021-12-31")],
    selectedPercentageOption: "1",
    selectedTotalOption: "1",
    selectedContributionOption: "1",
    dataSet: "",
  })
  .on(events.setSelectedVariable, (state, val) => {
    return { ...state, selectedVariable: val };
  })
  .on(events.changeCurrentUser, (state, user) => {
    return { ...state, currentUser: user };
  })
  .on(events.setIndicatorGroupSets, (state, val) => {
    return { ...state, indicatorGroupSets: val };
  })
  .on(events.setDataElementGroups, (state, val) => {
    return { ...state, dataElementGroups: val };
  })
  .on(events.setSelectedDataElement, (state, val) => {
    return { ...state, selectedDataElement: val };
  })
  .on(events.setSelectedDataElementGroup, (state, val) => {
    return { ...state, selectedDataElementGroup: val };
  })
  .on(events.setOrganisationUnitLevels, (state, val) => {
    return { ...state, organisationUnitLevels: val };
  })
  .on(events.setCountry, (state, val) => {
    return { ...state, country: val };
  })
  .on(events.setIndicatorGroups, (state, val) => {
    return { ...state, indicatorGroups: val };
  })
  .on(events.setDistricts, (state, val) => {
    return { ...state, districts: val };
  })
  .on(events.setCountryAnalyticsTitle, (state, val) => {
    return { ...state, countryAnalyticsTitle: val };
  })
  .on(events.setDistrictAnalyticsTitle, (state, val) => {
    return { ...state, districtAnalyticsTitle: val };
  })
  .on(events.setCurrentParents, (state, val) => {
    return { ...state, currentParents: val };
  })
  .on(events.setCurrentFacility, (state, val) => {
    return { ...state, currentFacility: val };
  })
  .on(events.setPage, (state, val) => {
    return { ...state, page: val };
  })
  .on(events.setOverview, (state, val) => {
    return { ...state, overview: val };
  })
  .on(events.setCurrentPoint, (state, val) => {
    return { ...state, currentPoint: val };
  })
  .on(events.setRawGeojson, (state, val) => {
    return { ...state, rawGeojson: val };
  })
  .on(events.setW, (state, val) => {
    return { ...state, w: val };
  })
  .on(events.setS, (state, val) => {
    return { ...state, s: val };
  })
  .on(events.setI, (state, val) => {
    return { ...state, i: val };
  })
  .on(events.setR, (state, val) => {
    return { ...state, r: val };
  })
  .on(events.setSelectedIndicatorGroupSet, (state, val) => {
    return { ...state, selectedIndicatorGroupSet: val };
  })
  .on(events.setSelectedIndicatorGroup, (state, val) => {
    return { ...state, selectedIndicatorGroup: val };
  })
  .on(events.setSelectedIndicator, (state, val) => {
    return { ...state, selectedIndicator: val };
  })
  .on(events.setSelectedDistrict, (state, val) => {
    return { ...state, selectedDistrict: val };
  })
  .on(events.setSelectedLevel, (state, val) => {
    return { ...state, selectedLevel: val };
  })
  .on(events.setCountry, (state, val) => {
    return { ...state, country: val };
  })
  .on(events.setDataSet, (state, val) => {
    return { ...state, dataSet: val };
  })
  .on(events.load, (state) => {
    return { ...state, loading: true };
  })
  .on(events.unLoad, (state) => {
    return { ...state, loading: false };
  })
  .on(events.onPeriodChange, (state, val) => {
    return { ...state, period: val };
  })
  .on(events.onPercentageOptionChange, (state, val) => {
    return { ...state, selectedPercentageOption: val };
  })
  .on(events.onPolicyChange, (state, val) => {
    let foundElement = undefined;
    if (state.selectedDataElementGroup) {
      const deGroup = state.dataElementGroups.find(
        (deg) => deg.id === state.selectedDataElementGroup
      );
      if (deGroup) {
        const element = deGroup.dataElements.find(
          (de) => de.id === state.selectedDataElement
        );
        const name = String(element.name)
          .replace(state.selectedPolicy, val)
          .split(".")[1];
        foundElement = deGroup.dataElements.find((de) => {
          return String(de.name).includes(name);
        });
      }
    }

    if (foundElement) {
      return {
        ...state,
        selectedPolicy: val,
        selectedDataElement: foundElement.id,
      };
    }
    return { ...state, selectedPolicy: val };
  });

export const $selectedDataElements = $store.map((state) => {
  if (state.selectedDataElementGroup) {
    const deGroup = state.dataElementGroups.find(
      (deg) => deg.id === state.selectedDataElementGroup
    );
    if (deGroup) {
      return deGroup.dataElements.flatMap((de) => {
        if (String(de.name).includes(state.selectedPolicy)) {
          return [
            {
              ...de,
              name: String(de.name).replace(` - ${state.selectedPolicy}`, ""),
            },
          ];
        }
        return [];
      });
    }
  }
  return [];
});

export const $indicatorDescription = $store.map((state) => {
  if (state.selectedDataElement) {
    const deGroup = state.dataElementGroups.find(
      (deg) => deg.id === state.selectedDataElementGroup
    );
    const found = deGroup.dataElements.find(
      (de) => de.id === state.selectedDataElement
    );

    return found ? String(found.name).split(".")[1].split("-")[0] : "";
  }
  return "";
});
