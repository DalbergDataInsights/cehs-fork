const indicatorMeta = [
  {
    key: "1st_anc_visits",
    displayName: "1st ANC Visits",
    function: "single",
    numerator: { dataElementId: "Q9nSogNmKPt", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "vitamin_a1__nutrition_female",
    displayName: "1st doses of vitamin A to female U5",
    function: "single",
    numerator: { dataElementId: "vI52cxgsBNv", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "vitamin_a1__nutrition_male",
    displayName: "1st doses of vitamin A to male U5",
    function: "single",
    numerator: { dataElementId: "vI52cxgsBNv", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "vitamin_a1",
    displayName: "1st doses of vitamin A to U5",
    function: "single",
    numerator: { dataElementId: "vI52cxgsBNv", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "vitamin_a2__nutrition_female",
    displayName: "2nd doses of vitamin A to female U5",
    function: "single",
    numerator: { dataElementId: "A2ZOozUNmDz", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "vitamin_a2__nutrition_male",
    displayName: "2nd doses of vitamin A to male U5",
    function: "single",
    numerator: { dataElementId: "A2ZOozUNmDz", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "vitamin_a2",
    displayName: "2nd doses of vitamin A to U5",
    function: "single",
    numerator: { dataElementId: "A2ZOozUNmDz", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "NUT",
  },
  {
    key: "4th_anc_visits",
    displayName: "4th ANC Visits",
    function: "single",
    numerator: { dataElementId: "RnLOFSYaAhp", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "abortions_other",
    displayName: "Abortions not related to GBV",
    function: "single",
    numerator: { dataElementId: "FlRxDBHWGid", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "abortions_gbv",
    displayName: "Abortions related to GBV",
    function: "single",
    numerator: { dataElementId: "TvqHbq8AKc7", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "anc_initiated_hiv",
    displayName: "ANC initiated on ART",
    function: "single",
    numerator: { dataElementId: "L4pwIgSDdG6", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "anc_tested_hiv",
    displayName: "ANC tested HIV",
    function: "single",
    numerator: { dataElementId: "uALBQG7TFhq", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "anc_tested_hiv_positive",
    displayName: "ANC tested HIV positive",
    function: "single",
    numerator: { dataElementId: "uzlQdD84jNj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "bcg",
    displayName: "BCG doses to U1",
    function: "single",
    numerator: { dataElementId: "MxAg9De4cra", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "bcg__u1_outreach",
    displayName: "BCG doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "MxAg9De4cra", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "bcg__u1_static",
    displayName: "BCG doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "MxAg9De4cra", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "births",
    displayName: "Deliveries in unit",
    function: "single",
    numerator: { dataElementId: "idXOxt69W0e", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "births_fresh_stillbirth",
    displayName: "Deliveries in unit - fresh stillbirth",
    function: "single",
    numerator: { dataElementId: "T8W0wbzErSF", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "births_live",
    displayName: "Deliveries in unit - live",
    function: "single",
    numerator: { dataElementId: "fEz9wGsA6YU", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "births_macerated_stillbirth",
    displayName: "Deliveries in unit - macerated stillbirth",
    function: "single",
    numerator: { dataElementId: "ULL9lX3DO7V", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "dpt1",
    displayName: "DPT1 doses to U1",
    function: "single",
    numerator: { dataElementId: "Ys31ug5E3f1", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "dpt1__u1_outreach",
    displayName: "DPT1 doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "Ys31ug5E3f1", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "dpt1__u1_static",
    displayName: "DPT1 doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "Ys31ug5E3f1", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "dpt3",
    displayName: "DPT3 doses to U1",
    function: "single",
    numerator: { dataElementId: "ujs4ipzA4tb", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "dpt3__u1_outreach",
    displayName: "DPT3 doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "ujs4ipzA4tb", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "dpt3__u1_static",
    displayName: "DPT3 doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "ujs4ipzA4tb", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hiv_positive_linked",
    displayName: "HIV positive linked to care",
    function: "single",
    numerator: { dataElementId: "VmVKCCYeHiF", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "hei_given_arv",
    displayName: "HIV-exposed infants receiving ARV",
    function: "single",
    numerator: { dataElementId: "OUGMxrtXxri", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "hiv_positive_mother_before_anc",
    displayName: "HIV-positive mothers aware of their status before ANC1",
    function: "single",
    numerator: { dataElementId: "b78oMBcC5R8", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "hpv1",
    displayName: "HPV1 doses to girls",
    function: "single",
    numerator: { dataElementId: "Gtk7tbHfVfj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hpv1__community",
    displayName: "HPV1 doses to girls (community)",
    function: "single",
    numerator: { dataElementId: "Gtk7tbHfVfj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hpv1__school",
    displayName: "HPV1 doses to U1 (school)",
    function: "single",
    numerator: { dataElementId: "Gtk7tbHfVfj", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hpv2",
    displayName: "HPV2 doses to girls",
    function: "single",
    numerator: { dataElementId: "zcT0YplhdAB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hpv2__community",
    displayName: "HPV2 doses to girls (community)",
    function: "single",
    numerator: { dataElementId: "zcT0YplhdAB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "hpv2__school",
    displayName: "HPV2 doses to girls (school)",
    function: "single",
    numerator: { dataElementId: "zcT0YplhdAB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "injuries_gbv",
    displayName: "Injuries related to GBV",
    function: "single",
    numerator: { dataElementId: "bRYoCXTmJCB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "ipd_attendance",
    displayName: "IPD attendance",
    function: "single",
    numerator: { dataElementId: "UwnR5kr982Y", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "GENERAL",
  },
  {
    key: "malaria_cases",
    displayName: "Malaria cases",
    function: "single",
    numerator: { dataElementId: "fUflbWWhouR", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
  },
  {
    key: "malaria_deaths",
    displayName: "Malaria deaths",
    function: "single",
    numerator: { dataElementId: "IoZCByEDSnX", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MAL",
  },
  {
    key: "mat_initiated_hiv",
    displayName: "Mat initiated on ART",
    function: "single",
    numerator: { dataElementId: "KDoEmOjpYnL", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "maternal_deaths",
    displayName: "Maternal deaths",
    function: "single",
    numerator: { dataElementId: "F8Iz6QcexWB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "maternal_deaths__a20",
    displayName: "Maternal deaths (above 20)",
    function: "single",
    numerator: { dataElementId: "F8Iz6QcexWB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "maternal_deaths__u20",
    displayName: "Maternal deaths (under 20)",
    function: "single",
    numerator: { dataElementId: "F8Iz6QcexWB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "maternity_admissions",
    displayName: "Maternity Admissions",
    function: "single",
    numerator: { dataElementId: "JY0M7eC2N42", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "contraceptives_male_condom",
    displayName: "Men using male condoms",
    function: "single",
    numerator: { dataElementId: "bkCFVYMFMed", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_male_condom__fp_contraception_u20",
    displayName: "Men using male condoms (under 20)",
    function: "single",
    numerator: { dataElementId: "bkCFVYMFMed", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "breastfed_1st_hour",
    displayName: "Mothers breastfeeding after delivery",
    function: "single",
    numerator: { dataElementId: "XXZZbU4B2N3", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "mr1",
    displayName: "MR1 doses to U1",
    function: "single",
    numerator: { dataElementId: "WAjgHQVxVVm", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "mr1__u1_outreach",
    displayName: "MR1 doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "WAjgHQVxVVm", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "mr1__u1_static",
    displayName: "MR1 doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "WAjgHQVxVVm", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "newborn_deaths",
    displayName: "Newborn deaths",
    function: "single",
    numerator: { dataElementId: "hrTskGHP0Av", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "pcv1",
    displayName: "PCV1 doses to U1",
    function: "single",
    numerator: { dataElementId: "NbG01i1Md55", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pcv1__u1_outreach",
    displayName: "PCV1 doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "NbG01i1Md55", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pcv1__u1_static",
    displayName: "PCV1 doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "NbG01i1Md55", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pcv3",
    displayName: "PCV3 doses to U1",
    function: "single",
    numerator: { dataElementId: "QHawVF72X6E", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pcv3__u1_outreach",
    displayName: "PCV3 doses to U1 (outreach)",
    function: "single",
    numerator: { dataElementId: "QHawVF72X6E", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pcv3__u1_static",
    displayName: "PCV3 doses to U1 (static)",
    function: "single",
    numerator: { dataElementId: "QHawVF72X6E", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "pnc_initiated_hiv",
    displayName: "PNC initiated on ART",
    function: "single",
    numerator: { dataElementId: "kGC9MVJppnk", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "pnc_tested_hiv",
    displayName: "PNC tested HIV",
    function: "single",
    numerator: { dataElementId: "L0kzvUuDu0M", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "pnc_tested_hiv_positive",
    displayName: "PNC tested HIV positive",
    function: "single",
    numerator: { dataElementId: "eerKMtKyYZt", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "postnatal_visits",
    displayName: "Postnatal Visits",
    function: "single",
    numerator: { dataElementId: "LJ8MLXHctGs", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "MNCH",
  },
  {
    key: "sti_other",
    displayName: "STI cases not related to SGBV",
    function: "single",
    numerator: { dataElementId: "KaqDbaq0Yce", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "sti_other__fp_stds_female",
    displayName: "STI cases not related to SGBV (female)",
    function: "single",
    numerator: { dataElementId: "KaqDbaq0Yce", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "sti_other__fp_stds_male",
    displayName: "STI cases not related to SGBV (male)",
    function: "single",
    numerator: { dataElementId: "KaqDbaq0Yce", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "sti_gbv",
    displayName: "STI cases related to SGBV",
    function: "single",
    numerator: { dataElementId: "Cw3RNymXWjr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "sti_gbv__fp_stds_female",
    displayName: "STI cases related to SGBV (female)",
    function: "single",
    numerator: { dataElementId: "Cw3RNymXWjr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "sti_gbv__fp_stds_male",
    displayName: "STI cases related to SGBV (male)",
    function: "single",
    numerator: { dataElementId: "Cw3RNymXWjr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
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
    key: "tb_cases_registered__tb_female_a5",
    displayName: "TB cases registered in treatment unit (females over five)",
    function: "single",
    numerator: { dataElementId: "vSaFiVhebVQ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "tb_cases_registered__tb_female_u5",
    displayName: "TB cases registered in treatment unit (females under five)",
    function: "single",
    numerator: { dataElementId: "vSaFiVhebVQ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "tb_cases_registered__tb_male_a5",
    displayName: "TB cases registered in treatment unit (males over five)",
    function: "single",
    numerator: { dataElementId: "vSaFiVhebVQ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "tb_cases_registered__tb_male_u5",
    displayName: "TB cases registered in treatment unit (males under five)",
    function: "single",
    numerator: { dataElementId: "vSaFiVhebVQ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "TB",
  },
  {
    key: "td1__nonpregnant",
    displayName: "TD1 doses (nonpregnant)",
    function: "single",
    numerator: { dataElementId: "oj4ttY118Fg", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "td1__pregnant",
    displayName: "TD1 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "oj4ttY118Fg", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "td2__nonpregnant",
    displayName: "TD2 doses (nonpregnant)",
    function: "single",
    numerator: { dataElementId: "OrKSwpDxQaJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "td2__pregnant",
    displayName: "TD2 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "OrKSwpDxQaJ", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "td3__nonpregnant",
    displayName: "TD3 doses (nonpregnant)",
    function: "single",
    numerator: { dataElementId: "vMZQxa2plDI", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "td3__pregnant",
    displayName: "TD3 doses (pregnant)",
    function: "single",
    numerator: { dataElementId: "vMZQxa2plDI", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "EPI",
  },
  {
    key: "tested_hiv",
    displayName: "Tested HIV",
    function: "single",
    numerator: { dataElementId: "vFHITfiDo9g", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "tested_hiv_positive",
    displayName: "Tested HIV positive",
    function: "single",
    numerator: { dataElementId: "B404cBe6vUa", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "HIV",
  },
  {
    key: "contraceptives_female_condom",
    displayName: "Women using female condoms",
    function: "single",
    numerator: { dataElementId: "Onpo1O1A7jr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_female_condom__fp_contraception_u20",
    displayName: "Women using female condoms (under 20)",
    function: "single",
    numerator: { dataElementId: "Onpo1O1A7jr", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_emergency__fp_emergency_all",
    displayName: "Women using oral emergency contraceptives",
    function: "single",
    numerator: { dataElementId: "b2mZpqmL8VB", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_lofemenal",
    displayName: "Women using oral lo-femenal contraceptives",
    function: "single",
    numerator: { dataElementId: "dt0srLW7MmK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_lofemenal__fp_contraception_u20",
    displayName: "Women using oral lo-femenal contraceptives (under 20)",
    function: "single",
    numerator: { dataElementId: "dt0srLW7MmK", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_microgynon",
    displayName: "Women using oral microgynon contraceptives",
    function: "single",
    numerator: { dataElementId: "A3r248imZ1L", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_microgynon__fp_contraception_u20",
    displayName: "Women using oral microgynon contraceptives (under 20)",
    function: "single",
    numerator: { dataElementId: "A3r248imZ1L", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_ovrette",
    displayName: "Women using oral ovrette contraceptives",
    function: "single",
    numerator: { dataElementId: "dyfJZ2Llr6F", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_ovrette__fp_contraception_u20",
    displayName: "Women using oral ovrette contraceptives (under 20)",
    function: "single",
    numerator: { dataElementId: "dyfJZ2Llr6F", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_other",
    displayName: "Women using other oral contraceptives",
    function: "single",
    numerator: { dataElementId: "NXCJqj7Edfo", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
  },
  {
    key: "contraceptives_oral_other__fp_contraception_u20",
    displayName: "Women using other oral contraceptives (under 20)",
    function: "single",
    numerator: { dataElementId: "NXCJqj7Edfo", function: "single" },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
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
  },
  {
    key: "11121",
    displayName: "OPD attendance",
    function: "nansum",
    numerator: {
      dataElementId: [["sv6SeKroHPV", "sQ4EexvvhVe"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "GENERAL",
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
  },
  {
    key: "11130",
    displayName: "Women using iuds (under 20)",
    function: "nansum",
    numerator: {
      dataElementId: [["jSQRBvez5Pq", "zhTC6HT9No2"]],
      function: "nansum",
    },
    denominator: { dataElementId: 1, function: "single" },
    group: "FP",
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
  },
];

export default indicatorMeta;
