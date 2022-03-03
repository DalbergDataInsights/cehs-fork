import { domain } from "./Domain";

export const changeCurrentUser = domain.createEvent();
export const setIndicatorGroupSets = domain.createEvent();
export const setOrganisationUnitLevels = domain.createEvent();
export const setIndicatorGroups = domain.createEvent();
export const setDistricts = domain.createEvent();
export const setCountryAnalyticsTitle = domain.createEvent();
export const setDistrictAnalyticsTitle = domain.createEvent();
export const setCurrentParents = domain.createEvent();
export const setCurrentFacility = domain.createEvent();
export const setPage = domain.createEvent();
export const setOverview = domain.createEvent();
export const setCurrentPoint = domain.createEvent();
export const setRawGeojson = domain.createEvent();
export const setW = domain.createEvent();
export const setS = domain.createEvent();
export const setI = domain.createEvent();
export const setR = domain.createEvent();
export const setSelectedIndicatorGroupSet = domain.createEvent();
export const setSelectedIndicatorGroup = domain.createEvent();
export const setSelectedIndicator = domain.createEvent();
export const setSelectedDistrict = domain.createEvent();
export const setSelectedLevel = domain.createEvent();
export const setCountry = domain.createEvent();
export const setDataSet = domain.createEvent();
export const load = domain.createEvent();
export const unLoad = domain.createEvent();
export const setDataElementGroups = domain.createEvent();
export const setSelectedDataElement = domain.createEvent();
export const setSelectedDataElementGroup = domain.createEvent();
export const onPolicyChange = domain.createEvent();
export const onPeriodChange = domain.createEvent();
export const onPercentageOptionChange = domain.createEvent();
