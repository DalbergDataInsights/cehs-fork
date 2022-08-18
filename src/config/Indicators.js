const indicatorMeta = [
  {
    key: "1st_anc_visits",
    displayName: "1st ANC Visits",
    function: "single",
    numerator: { dataElementId: "Q9nSogNmKPt", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "vitamin_a1",
    displayName: "1st doses of vitamin A to U5",
    function: "single",
    numerator: { dataElementId: "vI52cxgsBNv", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "vitamin_a2",
    displayName: "2nd doses of vitamin A to U5",
    function: "single",
    numerator: { dataElementId: "A2ZOozUNmDz", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "4th_anc_visits",
    displayName: "4th ANC Visits",
    function: "single",
    numerator: { dataElementId: "RnLOFSYaAhp", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "abortions_other",
    displayName: "Abortions not related to GBV",
    function: "single",
    numerator: { dataElementId: "FlRxDBHWGid", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "abortions_gbv",
    displayName: "Abortions related to GBV",
    function: "single",
    numerator: { dataElementId: "TvqHbq8AKc7", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "anc_initiated_hiv",
    displayName: "ANC initiated on ART",
    function: "single",
    numerator: { dataElementId: "L4pwIgSDdG6", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "anc_tested_hiv",
    displayName: "ANC tested HIV",
    function: "single",
    numerator: { dataElementId: "uALBQG7TFhq", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "anc_tested_hiv_positive",
    displayName: "ANC tested HIV positive",
    function: "single",
    numerator: { dataElementId: "uzlQdD84jNj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "bcg",
    displayName: "BCG doses to U1",
    function: "single",
    numerator: { dataElementId: "MxAg9De4cra", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "births",
    displayName: "Deliveries in unit",
    function: "single",
    numerator: { dataElementId: "idXOxt69W0e", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "births_fresh_stillbirth",
    displayName: "Deliveries in unit - fresh stillbirth",
    function: "single",
    numerator: { dataElementId: "T8W0wbzErSF", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "births_live",
    displayName: "Deliveries in unit - live",
    function: "single",
    numerator: { dataElementId: "fEz9wGsA6YU", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "births_macerated_stillbirth",
    displayName: "Deliveries in unit - macerated stillbirth",
    function: "single",
    numerator: { dataElementId: "ULL9lX3DO7V", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "dpt1",
    displayName: "DPT1 doses to U1",
    function: "single",
    numerator: { dataElementId: "Ys31ug5E3f1", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },

  {
    key: "dpt3",
    displayName: "DPT3 doses to U1",
    function: "single",
    numerator: { dataElementId: "ujs4ipzA4tb", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },

  {
    key: "hiv_positive_linked",
    displayName: "HIV positive linked to care",
    function: "single",
    numerator: { dataElementId: "VmVKCCYeHiF", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "hei_given_arv",
    displayName: "HIV-exposed infants receiving ARV",
    function: "single",
    numerator: { dataElementId: "OUGMxrtXxri", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "hiv_positive_mother_before_anc",
    displayName: "HIV-positive mothers aware of their status before ANC1",
    function: "single",
    numerator: { dataElementId: "b78oMBcC5R8", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "hpv1",
    displayName: "HPV1 doses to girls",
    function: "single",
    numerator: { dataElementId: "Gtk7tbHfVfj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },

  {
    key: "hpv2",
    displayName: "HPV2 doses to girls",
    function: "single",
    numerator: { dataElementId: "zcT0YplhdAB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "injuries_gbv",
    displayName: "Injuries related to GBV",
    function: "single",
    numerator: { dataElementId: "bRYoCXTmJCB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "ipd_attendance",
    displayName: "IPD attendance",
    function: "single",
    numerator: { dataElementId: "UwnR5kr982Y", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "GENERAL",
    reportingFrequency: "monthly",
  },
  {
    key: "malaria_cases",
    displayName: "Malaria cases",
    function: "single",
    numerator: { dataElementId: "fUflbWWhouR", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
    reportingFrequency: "monthly",
  },
  {
    key: "malaria_deaths",
    displayName: "Malaria deaths",
    function: "single",
    numerator: { dataElementId: "IoZCByEDSnX", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
    reportingFrequency: "monthly",
  },
  {
    key: "mat_initiated_hiv",
    displayName: "Mat initiated on ART",
    function: "single",
    numerator: { dataElementId: "KDoEmOjpYnL", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "maternal_deaths",
    displayName: "Maternal deaths",
    function: "single",
    numerator: { dataElementId: "F8Iz6QcexWB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "maternity_admissions",
    displayName: "Maternity Admissions",
    function: "single",
    numerator: { dataElementId: "JY0M7eC2N42", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_male_condom",
    displayName: "Men using male condoms",
    function: "single",
    numerator: { dataElementId: "bkCFVYMFMed", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },

  {
    key: "breastfed_1st_hour",
    displayName: "Mothers breastfeeding after delivery",
    function: "single",
    numerator: { dataElementId: "XXZZbU4B2N3", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "mr1",
    displayName: "MR1 doses to U1",
    function: "single",
    numerator: { dataElementId: "WAjgHQVxVVm", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "newborn_deaths",
    displayName: "Newborn deaths",
    function: "single",
    numerator: { dataElementId: "hrTskGHP0Av", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "pcv1",
    displayName: "PCV1 doses to U1",
    function: "single",
    numerator: { dataElementId: "NbG01i1Md55", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "pcv3",
    displayName: "PCV3 doses to U1",
    function: "single",
    numerator: { dataElementId: "QHawVF72X6E", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "pnc_initiated_hiv",
    displayName: "PNC initiated on ART",
    function: "single",
    numerator: { dataElementId: "kGC9MVJppnk", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "pnc_tested_hiv",
    displayName: "PNC tested HIV",
    function: "single",
    numerator: { dataElementId: "L0kzvUuDu0M", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "pnc_tested_hiv_positive",
    displayName: "PNC tested HIV positive",
    function: "single",
    numerator: { dataElementId: "eerKMtKyYZt", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "postnatal_visits",
    displayName: "Postnatal Visits",
    function: "single",
    numerator: { dataElementId: "LJ8MLXHctGs", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
    reportingFrequency: "monthly",
  },
  {
    key: "sti_other",
    displayName: "STI cases not related to SGBV",
    function: "single",
    numerator: { dataElementId: "KaqDbaq0Yce", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "sti_gbv",
    displayName: "STI cases related to SGBV",
    function: "single",
    numerator: { dataElementId: "Cw3RNymXWjr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },

  {
    key: "tb_cases_registered",
    displayName: "TB cases registered in treatment unit",
    function: "single",
    numerator: { dataElementId: "vSaFiVhebVQ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "td1__pregnant",
    displayName: "TD1 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "oj4ttY118Fg", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "td2__pregnant",
    displayName: "TD2 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "OrKSwpDxQaJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "td3__pregnant",
    displayName: "TD3 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "vMZQxa2plDI", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "tested_hiv",
    displayName: "Tested HIV",
    function: "single",
    numerator: { dataElementId: "vFHITfiDo9g", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "tested_hiv_positive",
    displayName: "Tested HIV positive",
    function: "single",
    numerator: { dataElementId: "B404cBe6vUa", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_female_condom",
    displayName: "Women using female condoms",
    function: "single",
    numerator: { dataElementId: "Onpo1O1A7jr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_emergency__fp_emergency_all",
    displayName: "Women using oral emergency contraceptives",
    function: "single",
    numerator: { dataElementId: "b2mZpqmL8VB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_oral_lofemenal",
    displayName: "Women using oral lo-femenal contraceptives",
    function: "single",
    numerator: { dataElementId: "dt0srLW7MmK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_oral_microgynon",
    displayName: "Women using oral microgynon contraceptives",
    function: "single",
    numerator: { dataElementId: "A3r248imZ1L", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "contraceptives_oral_ovrette",
    displayName: "Women using oral ovrette contraceptives",
    function: "single",
    numerator: { dataElementId: "dyfJZ2Llr6F", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },

  {
    key: "contraceptives_oral_other",
    displayName: "Women using other oral contraceptives",
    function: "single",
    numerator: { dataElementId: "NXCJqj7Edfo", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "opd_attendance",
    displayName: "OPD attendance",
    function: "single",
    numerator: {
      dataElementId: "sv6SeKroHPV",
      function: "single",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "GENERAL",
    reportingFrequency: "monthly",
  },

  {
    key: "CHM-001",
    displayName: "% of adults using any family planning method",
    function: "single",
    numerator: { dataElementId: "qWmp6ar4GSS", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-002",
    displayName: "% of preg women  attended atleast 4 ANCs ",
    function: "single",
    numerator: { dataElementId: "YWdurab8GUI", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-003",
    displayName: "% of preg women who attended at least 8 ANCs ",
    function: "single",
    numerator: { dataElementId: "oUPfUoCx8T5", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-004",
    displayName: "% of deliveries at home",
    function: "single",
    numerator: { dataElementId: "BWa5OKXBnKL", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-005",
    displayName: "% of preg women who died during pregnancy",
    function: "single",
    numerator: { dataElementId: "LZUjkfqaS6i", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-006",
    displayName: "% of preg with danger signs reffered",
    function: "single",
    numerator: { dataElementId: "t4szt7SkmvK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHM-007",
    displayName: "% of preg /lactating Women with red MUAC ",
    function: "single",
    numerator: { dataElementId: "JXmW20dcD9g", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-001",
    displayName: "% of children < 1m who were reported dead ",
    function: "single",
    numerator: { dataElementId: "ulVTa8n0dg9", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-002",
    displayName: "% of children btn  1m - 11m reported dead",
    function: "single",
    numerator: { dataElementId: "YyQbpCGHVLM", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-003",
    displayName: "% of children btn 1-5 years reported dead",
    function: "single",
    numerator: { dataElementId: "XTtgKWbb33s", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-004",
    displayName: "% of children under 5 reported dead ",
    function: "single",
    numerator: { dataElementId: "SQnc564dMyJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-005",
    displayName: "% of Children < 5yrs  received vitamin A  last 6m",
    function: "single",
    numerator: { dataElementId: "hjBYMet9ETI", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-006",
    displayName: "% of Children < 5yrs dewormed in  last 6 m",
    function: "single",
    numerator: { dataElementId: "kIzWZ061Ill", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-007",
    displayName: "%  of Children under 5 years with red MUAC",
    function: "single",
    numerator: { dataElementId: "YIlcfeW64TE", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-008",
    displayName: "%  of Children under 5 years with Oedema",
    function: "single",
    numerator: { dataElementId: "mLTfdnIAJSw", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-009",
    displayName: "%  of  Children who are reffered ",
    function: "single",
    numerator: { dataElementId: "Xlgeqv69eW2", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHC-010",
    displayName: "% of children with up- to- date immunization",
    function: "single",
    numerator: { dataElementId: "x8pMRKVTDOS", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHC",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHHTB-001",
    displayName: "% of HIV positive patients not on treatment",
    function: "single",
    numerator: { dataElementId: "E8XlkjxceMj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHHTB",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHHTB-002",
    displayName: "% of TB patients not on TB treatment",
    function: "single",
    numerator: { dataElementId: "iWQC5FP1Rmx", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHHTB",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHHTB-003",
    displayName: "% of household members who sleep under LLIN",
    function: "single",
    numerator: { dataElementId: "y87CFusc2mJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHHTB",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHW-001",
    displayName: "% of households with latrines ",
    function: "single",
    numerator: { dataElementId: "yRiGyQaKGcK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHW",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHW-002",
    displayName: "% of households with Improved  latrines ",
    function: "single",
    numerator: { dataElementId: "BVDdlVEOeQc", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHW",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHW-003",
    displayName: "% of households with handwashing facilities ",
    function: "single",
    numerator: { dataElementId: "Y6yqbwGyNcK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHW",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHW-004",
    displayName: "% of households with source safe drinking water  ",
    function: "single",
    numerator: { dataElementId: "E7d7CloQiMS", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHW",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHW-005",
    displayName: "% of households that are open defeacation free ",
    function: "single",
    numerator: { dataElementId: "nuhYCiiGmuH", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHW",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-001",
    displayName: "% of sick Children 2m - 5Yrs with Diarrhoea",
    function: "single",
    numerator: { dataElementId: "SBxgVBZ0T2b", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-002",
    displayName: "% of children 2m -5yrs  treated with ORS- Zinc",
    function: "single",
    numerator: { dataElementId: "ABuRNqtTQHJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-003",
    displayName: "% of children 2m -5yrs  treated within 24hrs",
    function: "single",
    numerator: { dataElementId: "pgooppftLQK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-004",
    displayName: "% of Children 2m - 5yrs cases with fever",
    function: "single",
    numerator: { dataElementId: "RHuJknb2sD7", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-005",
    displayName: "% of Children 2m - 5yrs cases received RDT",
    function: "single",
    numerator: { dataElementId: "hwsCAW8hwZO", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-006",
    displayName: "% of Sick Children 2m-5yrs  confirmed Malaria",
    function: "single",
    numerator: { dataElementId: "KH0dvtNaChi", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-007",
    displayName: "% of Sick children 2m- 5yrs  received ACT",
    function: "single",
    numerator: { dataElementId: "MWsPBMIage8", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-008",
    displayName: "% of Sick children 2m -5yrs  fever + danger signs",
    function: "single",
    numerator: { dataElementId: "I1HTSWsnWJF", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-009",
    displayName: "% of Sick children 2m - 5yr treated  rectals",
    function: "single",
    numerator: { dataElementId: "uMtDg4qZ2oX", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-010",
    displayName: "%  of Sick children 2m - 5yr treated within 24hrs",
    function: "single",
    numerator: { dataElementId: "xVdeHPQQKwl", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-011",
    displayName: "% of Sick children  managed and recovered",
    function: "single",
    numerator: { dataElementId: "JcuxnUSICw6", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-012",
    displayName: "% of sick Children 2m - 5 Yrs fast breathing",
    function: "single",
    numerator: { dataElementId: "cCWGBZlz3HC", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-013",
    displayName: "% of Sick children 2m -5yrs received amoxicn",
    function: "single",
    numerator: { dataElementId: "rNSO5Vup5T5", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-014",
    displayName: "% of Sick children 2m - 5yrs treated for pneumonia",
    function: "single",
    numerator: { dataElementId: "WQSsE382g5f", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHICCM-015",
    displayName: "% of Children < 5yrs referred to the Health Unit",
    function: "single",
    numerator: { dataElementId: "dWTxe9qIabU", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHICCM",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-001",
    displayName: "% of villages - stock out 1st line anti-Malarials",
    function: "single",
    numerator: { dataElementId: "zxJWUgIuj9U", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-002",
    displayName: "% of villages with Stock out of RDTs",
    function: "single",
    numerator: { dataElementId: "vNDI3f5tsgw", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-003",
    displayName: "% of villages -  stock out 1st line anti-Malarial",
    function: "single",
    numerator: { dataElementId: "auoxfH4Zd0I", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-004",
    displayName: "% of villages with Stock out of Amoxycillin",
    function: "single",
    numerator: { dataElementId: "uQvu8YoYATz", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-005",
    displayName: "% of villages with stock out of ORS+ Zinc",
    function: "single",
    numerator: { dataElementId: "ru3AnD3BORA", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHSTOCK-006",
    displayName: "% of villages with Stock out of Misoprostol",
    function: "single",
    numerator: { dataElementId: "AxmRemQZ1Ve", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHSTOCK",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHFP-001",
    displayName: "% of villages with Stock out of Injectable DMPA",
    function: "single",
    numerator: { dataElementId: "Kg5Znm1bTU5", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHFP",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHFP-002",
    displayName: "% of villages with Stock out of Oral Contraceptive",
    function: "single",
    numerator: { dataElementId: "kaYaDO3oOMb", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHFP",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHFP-003",
    displayName: "% of villages with Stock out of Condoms",
    function: "single",
    numerator: { dataElementId: "QEspB5XVXVV", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHFP",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHFP-004",
    displayName: "% of villages with stock out Progestin Only Pills",
    function: "single",
    numerator: { dataElementId: "dDOwE0917GX", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHFP",
    reportingFrequency: "quarterly",
  },
  {
    key: "CHFP-005",
    displayName: "% of villages with stock out of Em. Contraceptives",
    function: "single",
    numerator: { dataElementId: "R1juTYAlQcq", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "CHFP",
    reportingFrequency: "quarterly",
  },

  {
    key: "11109",
    displayName: "1st & 2nd doses of vitamin A to female U5",
    function: "nansum",
    numerator: {
      dataElementId: ["vI52cxgsBNv", "A2ZOozUNmDz"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11110",
    displayName: "1st & 2nd doses of vitamin A to male U5",
    function: "nansum",
    numerator: {
      dataElementId: ["vI52cxgsBNv", "A2ZOozUNmDz"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11111",
    displayName: "1st & 2nd doses of vitamin A to U5",
    function: "nansum",
    numerator: {
      dataElementId: ["vI52cxgsBNv", "A2ZOozUNmDz"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11112",
    displayName: "Low weight births",
    function: "nansum",
    numerator: {
      dataElementId: [["MzqiroyuhJh", "bl6lQqygEK1", "P1MyPWVxi5T"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11113",
    displayName: "Malaria cases treated",
    function: "nansum",
    numerator: {
      dataElementId: [
        [
          "PV8F3aPDKCu",
          "YBXFadujBCQ",
          "qR6OsOxADKt",
          "sDDBGMsrw6z",
          "S97lGebltuo",
        ],
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
    reportingFrequency: "monthly",
  },
  {
    key: "11114",
    displayName: "Malaria tests",
    function: "nansum",
    numerator: {
      dataElementId: [["lQXr10kZXrB", "RGDv14C4Cdw"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
    reportingFrequency: "monthly",
  },
  {
    key: "11115",
    displayName: "MAM cases identified",
    function: "nansum",
    numerator: {
      dataElementId: [["zm2QCkywpqX", "zm2QCkywpqX"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11116",
    displayName: "Mat tested HIV",
    function: "nansum",
    numerator: {
      dataElementId: [["SPctnmpC7W6", "lqlyPEh4beG"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "11117",
    displayName: "Mat tested HIV positive",
    function: "nansum",
    numerator: {
      dataElementId: [["AUfFbS7cWFd", "jHqJsOlZWZG"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "11118",
    displayName: "Mothers initiated on ART",
    function: "nansum",
    numerator: {
      dataElementId: ["L4pwIgSDdG6", "KDoEmOjpYnL", "kGC9MVJppnk"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "11119",
    displayName: "Mothers tested for HIV",
    function: "nansum",
    numerator: {
      dataElementId: [
        "uALBQG7TFhq",
        ["SPctnmpC7W6", "lqlyPEh4beG"],
        "L0kzvUuDu0M",
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "11120",
    displayName: "Mothers tested HIV-positive",
    function: "nansum",
    numerator: {
      dataElementId: [
        "uzlQdD84jNj",
        ["AUfFbS7cWFd", "jHqJsOlZWZG"],
        "eerKMtKyYZt",
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
    reportingFrequency: "monthly",
  },
  {
    key: "11122",
    displayName: "SAM cases identified",
    function: "nansum",
    numerator: {
      dataElementId: [["dgnUFBzt87d", "LX6uCvQ7a7W", "zvJyAAeman2"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
    reportingFrequency: "monthly",
  },
  {
    key: "11123",
    displayName: "TB cases registered in treatment unit (females)",
    function: "nansum",
    numerator: {
      dataElementId: ["vSaFiVhebVQ", "vSaFiVhebVQ"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "11124",
    displayName: "TB cases registered in treatment unit (males)",
    function: "nansum",
    numerator: {
      dataElementId: ["vSaFiVhebVQ", "vSaFiVhebVQ"],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "11125",
    displayName: "TD4-5 doses (nonpregnant)",
    function: "nansum",
    numerator: {
      dataElementId: [["Jd24EcGuIvS", "fyTVWlH6jqm"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "11126",
    displayName: "TD4-5 doses (pregnant)",
    function: "nansum",
    numerator: {
      dataElementId: [["Jd24EcGuIvS", "fyTVWlH6jqm"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
    reportingFrequency: "monthly",
  },
  {
    key: "11127",
    displayName: "Women using injectable contraceptives",
    function: "nansum",
    numerator: {
      dataElementId: [
        ["ZVKD2XRg6Ab", " Fat3y7a43qY", "iodD0RgSRoD", "O3dDxoUjSqo"],
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11128",
    displayName: "Women using injectable contraceptives (under 20)",
    function: "nansum",
    numerator: {
      dataElementId: [
        ["ZVKD2XRg6Ab", "Fat3y7a43qY", "iodD0RgSRoD", "O3dDxoUjSqo"],
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11129",
    displayName: "Women using iuds",
    function: "nansum",
    numerator: {
      dataElementId: [["jSQRBvez5Pq", "zhTC6HT9No1"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11131",
    displayName: "Women using natural contraception methods",
    function: "nansum",
    numerator: {
      dataElementId: [["VHi82Mcd77w", "ibfLXaygcNS", "HnSiI2XX2Sy"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11132",
    displayName: "Women using natural contraception methods (under 20)",
    function: "nansum",
    numerator: {
      dataElementId: [["VHi82Mcd77w", "ibfLXaygcNS", "HnSiI2XX2Sy"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11133",
    displayName: "Women using oral contraceptives - excl. Levono",
    function: "nansum",
    numerator: {
      dataElementId: [
        "NXCJqj7Edfo",
        "A3r248imZ1L",
        "dt0srLW7MmK",
        "dyfJZ2Llr6F",
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
  {
    key: "11134",
    displayName: "Women using oral contraceptives - excl. Levono (under 20)",
    function: "nansum",
    numerator: {
      dataElementId: [
        "NXCJqj7Edfo",
        "A3r248imZ1L",
        "dt0srLW7MmK",
        "dyfJZ2Llr6F",
      ],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
    reportingFrequency: "monthly",
  },
];

export default indicatorMeta;
