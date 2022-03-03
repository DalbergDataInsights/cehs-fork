import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
import { fromPairs } from "lodash";
import * as events from "./models/Events";
export function useAnalytics(sqlView, parameters) {
  const engine = useDataEngine();

  const key = Object.entries(parameters).flatMap((val) => {
    return val;
  });
  const conditions = Object.entries(parameters)
    .map(([col, val]) => {
      return `var=${col}:${val}`;
    })
    .join("&");
  const query = {
    analytics: {
      resource: `sqlViews/${sqlView}/data?${conditions}&paging=false`,
    },
  };
  return useQuery(["query", sqlView, ...key], async () => {
    const {
      analytics: {
        listGrid: { rows, headers },
      },
    } = await engine.query(query);

    if (headers.length === 2) {
      return fromPairs(rows);
    }
    return rows;
  });
}

export function loadDefaults() {
  const engine = useDataEngine();
  const query = {
    indicators: {
      resource: "dataElementGroups.json",
      params: {
        fields: "id,name,dataElements[id,name]",
        paging: false,
      },
    },
    levels: {
      resource: "organisationUnitLevels.json",
      params: {
        fields: "id,name,level",
        paging: false,
      },
    },
    root: {
      resource: "organisationUnits.json",
      params: {
        level: 1,
        fields: "id",
      },
    },
    settings: {
      resource: "dataStore/cehs/settings",
    },
    geojson: {
      resource: "organisationUnits.geojson",
      params: {
        level: 3,
      },
    },
    districts: {
      resource: "organisationUnits.json",
      params: {
        fields: "id,name",
        paging: false,
        level: 3,
      },
    },
  };
  return useQuery("defaults", async () => {
    const {
      indicators: { dataElementGroups },
      levels: { organisationUnitLevels },
      root: { organisationUnits },
      settings: { w, s, i, r, igs, gp, ind, district, level, country, dataset },
      geojson,
      districts: { organisationUnits: currentDistricts },
    } = await engine.query(query);
    events.setDataElementGroups(
      dataElementGroups.flatMap((de) => {
        if (String(de.name).includes("DDI")) {
          return [{ ...de, name: String(de.name).split("-")[1] }];
        }
        return [];
      })
    );
    events.setSelectedDataElementGroup("iI7zIId1f0M");
    events.setSelectedDataElement("TSOy1xPkAoB");
    events.setOrganisationUnitLevels(organisationUnitLevels);
    events.setCountry(organisationUnits[0].id);
    events.setW(w);
    events.setS(s);
    events.setI(i);
    events.setR(r);
    events.setSelectedIndicatorGroupSet(igs);
    events.setSelectedIndicatorGroup(gp);
    events.setSelectedIndicator(ind);
    events.setSelectedDistrict(district);
    events.setSelectedLevel(level);
    events.setCountry(country);
    events.setDataSet(dataset);
    events.setRawGeojson(geojson);
    events.setDistricts(currentDistricts);
    return dataset;
  });
}
