import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as FaIcons from "react-icons/fa";
import EmailClient from "../email/EmailClient";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import moment from "moment";

// districts query
const districtQuery = {
  results: {
    resource: "organisationUnits",
    params: {
      level: "3",
      paging: false,
      fields: "id,name",
    },
  },
};

// query to read current sub list available
const settingsQuery = {
  results: {
    resource: "dataStore/spph_app_08082022/settings",
    params: {
      skipMeta: false,
    },
  },
};

// query to add subscribers list to store
const createQuery = {
  resource: `dataStore/spph_app_08082022/settings`,
  type: "update",
  data: ({ subscriber }) => subscriber,
};

function EditSubList({
  editOpen,
  setEditOpen,
  onUpdate,
  subListId,
  subList,
  setSubList,
  listRefetch,
}) {
  const [templateIds, setTemplateIds] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [emails, setEmails] = useState("");
  const [names, setName] = useState("");
  const [subscriber, setSubscriber] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [dateType, setDateType] = useState("");
  const [template, setTemplate] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [count, setCount] = useState(Math.max(...subList.map((i) => i.id)) + 1);
  const [subListName, setSubListName] = useState(subListId);


  useEffect(() => {
    setSelectedStartDate(subList[0].trendDateStart);
    setSelectedEndDate(subList[0].trendDateEnd);
    setDateType(
      isNumeric(subList[0].trendDateStart)
        ? "Number of months from current"
        : "Months (MM YYYY)"
    );
    setTemplate({
      id: subList[0].templateId,
      name: subList[0].templateName,
    });
    setSelectedMonth(subList[0].monthOfInterest);
    setSelectedYear(subList[0].reportingYear);
    setCount(Math.max(...subList.map((i) => i.id)) + 1);
  }, [subList]);

  const { loading, error, data, refetch } = useDataQuery(settingsQuery);
  // update query
  const [mutate] = useDataMutation(createQuery, {
    variables: {
      subscriber: subscriber,
    },
    onComplete: onUpdate,
  });

  // districts data
  const district = useDataQuery(districtQuery);
  useEffect(() => {
    if (district.data) {
      setDistricts(district.data["results"]["organisationUnits"]);
    }
  }, [district.data]);

  // getting list of available templates
  useEffect(() => {
    EmailClient.getTemplateIdsList().then((response) => {
      setTemplateIds(response);
    });
  }, []);
  const initialTemplate = templateIds.filter(
    (i) => i.id === subList[0].templateId
  )[0];


  // ------- dates
  // create start dates
  const startDates = getMonths(moment("2021-01-01", "YYYY-MM-DD"), moment());

  const getYears = (start, end) =>
    Array.from({ length: end.diff(start, "year") + 1 }).map((_, index) =>
      moment(start).add(index, "year").format("YYYY")
    );
  const years = getYears(moment("2018", "YYYY"), moment());

  // create end dates dependent on the selected start date
  const endDates = selectedStartDate
    ? getMonths(
        moment(
          isNumeric(selectedStartDate) ? moment().add(selectedStartDate, 'month') : selectedStartDate
        ),
        moment()
      )
    : [];

  const currentEndDate = isNumeric(subList[0].trendDateEnd)
      ? subList[0].trendDateEnd
      : moment(subList[0].trendDateEnd).format("YYYY-MM" + "-01");

  // event handlers
  const handleStartDate = (e) => {
    setSelectedStartDate(e.target.value);
  };

  const handleDateType = (e) => {
    setDateType(e.target.value);
  };
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleOnEmailChange = (e) => {
    setEmails(e.target.value);
  };

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {};
    formData["id"] = count;
    formData["templateId"] = JSON.parse(event.target[0].value).id;
    formData["templateName"] = JSON.parse(event.target[0].value).name;
    formData["trendDateStart"] = event.target[2].value;
    formData["trendDateEnd"] = isNumeric(event.target[3].value)
      ? event.target[3].value
      : moment(event.target[3].value).endOf("month").format("YYYY-MM-DD");
    formData["monthOfInterest"] = event.target[4].value
    formData["reportingYear"] = event.target[3].value;
    formData["recipientName"] = event.target[6].value;
    formData["recipientEmail"] = event.target[7].value;
    formData["orgUnit"] = event.target[8].value;

    var filteredArr = [];
    filteredArr = [...new Set([...subList, formData])].filter(
      (obj) => isEmpty(obj) === true
    );
    if (Object.keys(formData).length > 0) {
      // update other recipients with selected template and reporting dates
      for (const i of filteredArr) {
        i.templateId = formData.templateId;
        i.templateName = formData.templateName;
        i.trendDateStart = formData.trendDateStart;
        i.trendDateEnd = formData.trendDateEnd;
        i.monthOfInterest = formData.monthOfInterest;
        i.reportingYear = formData.reportingYear;
      }
    }
    setSubList(filteredArr);

    // const listName = `${filteredArr[0].templateName}_${filteredArr[0].trendDateStart}_${filteredArr[0].trendDateEnd}`;
    const listName = subListName;
    var subDetails = {};
    subDetails[`${listName.replaceAll(" ", "_")}`] = filteredArr;

    // add new list to existing data
    if (data) {
      setSubscriber({ ...data["results"], ...subDetails });
    } else {
      setSubscriber(subDetails);
    }
  };

  console.log("---- subList ------");
  console.log(subList);
  console.log(subscriber);

  // remove recipient and update sub list
  const handleRemoveRecipient = (item) => {
    console.log("---- removing item -------");
    const newSubList = subList;
    const indexOfObject = newSubList.findIndex((object) => {
      return object === item;
    });
    newSubList.splice(indexOfObject, 1);
    setSubList([...newSubList]);

    // const listName = `${newSubList[0].templateName}_${newSubList[0].trendDStart}_${newSubList[0].trendDateEnd}`;
    const listName = subListName;
    var subDetails = {};
    subDetails[`${listName.replaceAll(" ", "_")}`] = newSubList;

    // add new list to existing data
    if (data) {
      setSubscriber({ ...data["results"], ...subDetails });
    } else {
      setSubscriber(subDetails);
    }
  };

  // clear name and email fields when adding recipients
  const clearFields = () => {
    document.getElementById("nametextfield").value = "";
    document.getElementById("emailtextfield").value = "";
  };

  // update static variables on save
  const updateOnSave = (subList) => {
    // update other recipients with selected template and reporting dates
    for (const i of subList) {
      i.templateId = template.id;
      i.templateName = template.name;
      i.trendDateStart = selectedStartDate;
      i.trendDateEnd = selectedEndDate;
      i.monthOfInterest = selectedMonth;
      i.reportingYear = selectedYear;
    }

    console.log(subList[0].templateName);

    // const listName = `${subList[0].templateName}_${subList[0].trendDateStart}_${subList[0].trendDateEnd}`;
    const listName = subListName;
    var subDetails = {};
    subDetails[`${listName.replaceAll(" ", "_")}`] = subList;

    // add new list to existing data
    if (data) {
      setSubscriber({ ...data["results"], ...subDetails });
    } else {
      setSubscriber(subDetails);
    }
  };

  useEffect(() => {
    updateOnSave(subList);
  }, [
    template,
    selectedStartDate,
    selectedEndDate,
    selectedMonth,
    selectedYear,
  ]);

  // validate subscriber list name, if exists then invalid
  const validateName = (e) => {
    e.preventDefault();

    const subListNameField = document.getElementById("sublistname");
    const nameError = document.getElementById("nameError");
    let valid = true;

    if (data) {
      if (Object.keys(data.results).includes(subListNameField.value)) {
        nameError.classList.add("visible");
        subListNameField.classList.add("invalid");
        nameError.setAttribute("aria-hidden", false);
        nameError.setAttribute("aria-invalid", true);
      } else {
        nameError.classList.remove("visible");
        subListNameField.classList.remove("invalid");
      }
    }
    return valid;
  };

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Dialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // fullWidth
          maxWidth="md"
          PaperProps={{
            style: {
              backgroundColor: "white",
              boxShadow: "none",
              textColor: "white",
              // width: "100%"
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <p className="grap-header">{"Edit a subscriber list"}</p>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} id="settings-form">
              <div style={{ fontSize: "12px" }}>
              <h5 style={{ textAlign: "left", marginLeft: "10px" }}>
                  Specify subscriber list name:{" "}
                  <i style={{ color: "black", fontWeight: "300" }}>
                    {"(Cannot contain special characters)"}
                  </i>
                </h5>
                <input
                  type="text"
                  id="sublistname"
                  placeholder="Write name here..."
                  style={{ height: "30px" }}
                  pattern="[A-Za-z0-9 ]+"
                  title="Subscriber list name cannot contain special characters"
                  required
                  onChange={(e) => setSubListName(e.target.value)}
                  defaultValue={subListId}
                  onBlur={validateName}
                ></input>
                <span role="alert" id="nameError" aria-hidden="true">
                  This name already exists
                </span>
                <br></br>
                <select
                  style={{ textAlign: "left" }}
                  defaultValue={JSON.stringify(initialTemplate)}
                  onChange={(e) => setTemplate(JSON.parse(e.target.value))}
                >
                  {/* <option>Select template</option> */}
                  {templateIds &&
                    templateIds.map((obj, index) => {
                      return (
                        <option
                          style={{
                            backgroundColor: "#fff",
                            font: "lato",
                            padding: "16px",
                            margin: "10px",
                          }}
                          key={index}
                          value={JSON.stringify(obj)}
                        >
                          {obj.name}
                        </option>
                      );
                    })}
                </select>
                <div
                  style={{
                    backgroundColor: "white",
                    boxSizing: "1px solid black",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <p className="graph-subheader">Set email data dates</p>
                  <select
                    style={{ justifyItems: "center", marginLeft: "0px" }}
                    onChange={handleDateType}
                    defaultValue={
                      isNumeric(subList[0].trendDateStart)
                        ? "Number of months from current"
                        : "Months (MM YYYY)"
                    }
                  >
                    <option>Select date type</option>
                    <option value="Months (MM YYYY)">Months (MM YYYY)</option>
                    <option value="Number of months from current">
                      Number of months from current
                    </option>
                  </select>
                  <br></br>
                  <h5 style={{textAlign:"left"}}>Trend line dates:</h5>
                  <select
                    onChange={handleStartDate}
                    defaultValue={subList[0].trendDateStart}
                    style={{ display: "inline", marginLeft: "0px" }}
                    required
                  >
                    <option>Input date</option>
                    {startDates &&
                      startDates.map((obj, index) => {
                        return (
                          <option
                            style={{
                              backgroundColor: "#fff",
                              font: "lato",
                              padding: "16px",
                              margin: "10px",
                            }}
                            key={index}
                            // value={moment(obj).format("YYYY-MM-DD")}
                            value={
                              dateType === "Months (MM YYYY)"
                                ? moment(obj).format("YYYY-MM-DD")
                                : parseInt(
                                    moment(obj).diff(moment(), "months", true)
                                  )
                            }
                          >
                            {dateType === "Months (MM YYYY)"
                              ? obj
                              : parseInt(
                                  moment(obj).diff(moment(), "months", true)
                                )}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    defaultValue={currentEndDate}
                    onChange={(e) => setSelectedEndDate(e.target.value)}
                  >
                    <option disabled hidden>
                      Input date
                    </option>
                    {endDates &&
                      endDates.map((obj, index) => {
                        return (
                          <option
                            style={{
                              backgroundColor: "#fff",
                              font: "lato",
                              padding: "16px",
                              margin: "10px",
                            }}
                            key={index}
                            // value={moment(obj).format("YYYY-MM-DD")}
                            value={
                              dateType === "Months (MM YYYY)"
                                ? moment(obj).format("YYYY-MM-DD")
                                : parseInt(
                                    moment(obj).diff(moment(), "months", true)
                                  )
                            }
                          >
                            {dateType === "Months (MM YYYY)"
                              ? obj
                              : parseInt(
                                  moment(obj).diff(moment(), "months", true)
                                )}
                          </option>
                        );
                      })}
                  </select>
                  <br></br>
                  <h5 style={{textAlign:"left"}}>Facility level month of interest:</h5>
                  <select
                    required
                    style={{ marginLeft: "0px" }}
                    defaultValue={
                      isNumeric(subList[0].monthOfInterest)
                        ? subList[0].monthOfInterest
                        : moment(subList[0].monthOfInterest).format(
                            "YYYY-MM" + "-01"
                          )
                    }
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option>Select month</option>
                    {startDates &&
                      startDates.map((obj, index) => {
                        return (
                          <option
                            style={{
                              backgroundColor: "#fff",
                              font: "lato",
                              padding: "16px",
                              margin: "10px",
                            }}
                            key={index}
                            // value={moment(obj).format("YYYY-MM-DD")}
                            value={
                              dateType === "Months (MM YYYY)"
                                ? moment(obj).format("YYYY-MM-DD")
                                : parseInt(
                                    moment(obj).diff(moment(), "months", true)
                                  )
                            }
                          >
                            {dateType === "Months (MM YYYY)"
                              ? obj
                              : parseInt(
                                  moment(obj).diff(moment(), "months", true)
                                )}
                          </option>
                        );
                      })}
                  </select>
                  <br></br>
                  <h5 style={{textAlign:"left"}}>Reporting year of interest:</h5>
                  <select
                    required
                    style={{ marginLeft: "0px" }}
                    defaultValue={subList[0].reportingYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option>Select year</option>
                    {years &&
                      years.map((obj, index) => {
                        return (
                          <option
                            style={{
                              backgroundColor: "#fff",
                              font: "lato",
                              padding: "16px",
                              margin: "10px",
                            }}
                            key={index}
                            // value={moment(obj).format("YYYY")}
                            value={
                              dateType === "Months (MM YYYY)"
                                ? moment(obj).format("YYYY")
                                : parseInt(
                                    moment(obj).diff(moment(), "year", true)
                                  )
                            }
                          >
                            {dateType === "Months (MM YYYY)"
                              ? moment(obj).format("YYYY")
                              : parseInt(
                                  moment(obj).diff(moment(), "year", true)
                                )}
                          </option>
                        );
                      })}
                  </select>
                  <p className="graph-subheader">Email recipients</p>
                  <label>
                    <input
                      type="text"
                      id="nametextfield"
                      placeholder="Input name ..."
                      onChange={handleOnNameChange}
                      style={{ marginLeft: "0px" }}
                      required
                    ></input>
                  </label>
                  <label>
                    <input
                      type="text"
                      id="emailtextfield"
                      placeholder="Input email ..."
                      onChange={handleOnEmailChange}
                      required
                    ></input>
                  </label>
                  <select onChange={handleDistrictChange}>
                    <option>Select district</option>
                    {districts &&
                      districts.map((obj, index) => {
                        return (
                          <option
                            style={{
                              backgroundColor: "#fff",
                              font: "lato",
                              padding: "16px",
                            }}
                            key={index}
                            value={obj.id}
                          >
                            {obj.name}
                          </option>
                        );
                      })}
                  </select>
                  <button
                    className="button"
                    type="submit"
                    style={{
                      width: "30px",
                      height: "30px",
                      alignItems: "center",
                      display: "inline",
                      backgroundColor: "#3498DB",
                      color: "white",
                    }}
                    onClick={() => {
                      setCount((pCount) => pCount + 1);
                      setTimeout(() => {
                        clearFields();
                      }, [0]);
                    }}
                  >
                    <FaIcons.FaPlus fontSize={"inherit"} />
                  </button>
                  {subList &&
                    subList.map((item, index) => {
                      return (
                        // <div style={{display:"flex", alignItems:"center", flexFlow:"row wrap"}}>
                        <tr key={item.id}>
                          <td
                            style={{
                              backgroundColor: "white",
                              marginLeft: "-15px",
                            }}
                          >
                            <label>
                              <input
                                type="text"
                                // id="nametextfield"
                                name="recipientName"
                                placeholder="Input name..."
                                defaultValue={item.recipientName}
                                onChange={handleOnNameChange}
                              ></input>
                            </label>
                            <label>
                              <input
                                type="text"
                                name="recipientEmail"
                                // id="emailtextfield"
                                placeholder="Input email..."
                                defaultValue={item.recipientEmail}
                                onChange={handleOnEmailChange}
                                style={{ verticalAlign: "middle" }}
                              ></input>
                            </label>
                            <select
                              defaultValue={item.orgUnit}
                              onChange={handleDistrictChange}
                            >
                              <option>Select district</option>
                              {districts &&
                                districts.map((obj, index) => {
                                  return (
                                    <option
                                      style={{
                                        backgroundColor: "#fff",
                                        font: "lato",
                                        padding: "16px",
                                      }}
                                      key={index}
                                      value={obj.id}
                                    >
                                      {obj.name}
                                    </option>
                                  );
                                })}
                            </select>
                            {index ? (
                              <button
                                className="button"
                                // type="button"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  alignItems: "center",
                                  display: "flex",
                                }}
                                onClick={() => handleRemoveRecipient(item)}
                              >
                                <FaIcons.FaMinus fontSize={"inherit"} />
                              </button>
                            ) : null}
                          </td>
                        </tr>
                        // </div>
                      );
                    })}
                  <br></br>
                </div>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <button
              className="button"
              onClick={() => {
                // Only update list if subscriber data exists
                if (Object.keys(subscriber).length > 0) {
                  mutate({ subscriber });
                }

                setTimeout(() => {
                  setSubscriber({});
                  setEditOpen(false);
                  listRefetch();
                }, 2000);
              }}
              style={{ fontSize: "12px" }}
            >
              Save
            </button>
            <button
              className="button"
              autoFocus
              onClick={() => {
                document.getElementById("settings-form").reset();
                setSubscriber({});
                setEditOpen(false);
                // location.reload();
              }}
              style={{ fontSize: "12px", marginRight: "5%" }}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

// ------- function to return months
const getMonths = (start, end) =>
  Array.from({ length: end.diff(start, "month") + 0 }).map((_, index) =>
    moment(start).add(index, "month").format("MMM YYYY")
  );

const isEmpty = (object) => Object.values(object).every((value) => !!value);

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
}

export default EditSubList;
