import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as FaIcons from "react-icons/fa";
import EmailClient from "../email/EmailClient";
import { useDataQuery, useDataMutation } from "@dhis2/app-runtime";
import moment from "moment";


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


function SettingsPopup({ open, setOpen, onCreate, listRefetch }) {
  const [templateIds, setTemplateIds] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [emails, setEmails] = useState([]);
  const [names, setName] = useState([]);
  const [subscriberList, setSubscriberList] = useState([]);
  const [subscriber, setSubscriber] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [dateType, setDateType] = useState("");
  const [count, setCount] = useState(0);
  const [subListName, setSubListName] = useState("");

  const { loading, error, data, refetch } = useDataQuery(settingsQuery);

  // query to add subscribers list to store
  const createQuery = {
    resource: `dataStore/spph_app_08082022/settings`,
    type: "update",
    data: ({ subscriber }) => subscriber,
  };

  const [mutate] = useDataMutation(createQuery, {
    variables: {
      subscriber: subscriber,
    },
    onComplete: onCreate,
  });

  const district = useDataQuery(districtQuery);

  useEffect(() => {
    if (district.data) {
      setDistricts(district.data["results"]["organisationUnits"]);
    }
  }, [district.data]);

  useEffect(() => {
    EmailClient.getTemplateIdsList().then((response) => {
      setTemplateIds(response);
    });
  }, []);

  const handleDistrictChange = (e) => {
    const district = JSON.parse(event.target.value);
    setSelectedDistrict(district.id);
  };

  const handleOnEmailChange = (e) => {
    setEmails(e.target.value);
  };

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event.target)
    event.preventDefault();
    const formData = {};
    formData["id"] = count;
    formData["templateId"] = JSON.parse(event.target[1].value).id;
    formData["templateName"] = JSON.parse(event.target[1].value).name;
    formData["trendDateStart"] = event.target[3].value;
    formData["trendDateEnd"] = isNumeric(event.target[4].value)
      ? event.target[4].value
      : moment(event.target[4].value).endOf("month").format("YYYY-MM-DD");
    formData["monthOfInterest"] = event.target[5].value;
    formData["reportingYear"] = event.target[6].value;
    formData["recipientName"] = event.target[7].value;
    formData["recipientEmail"] = event.target[8].value;
    formData["orgUnit"] = JSON.parse(event.target[9].value).id;
    console.log(formData);


    const filteredArr = [...new Set([...subscriberList, formData])].filter(obj => isEmpty(obj) === true)
    console.log(filteredArr)

    if (Object.keys(formData).length > 0) {
      // update other recipients with recent selected template and reporting dates
      for (const i of filteredArr) {
        i.templateId = formData.templateId;
        i.templateName = formData.templateName;
        i.trendDateStart = formData.trendDateStart;
        i.trendDateEnd = formData.trendDateEnd;
        i.monthOfInterest = formData.monthOfInterest;
        i.reportingYear = formData.reportingYear;
      }
    }
    setSubscriberList(filteredArr);
    // const listName = `${formData.templateName}_${formData.trendDateStart}_${formData.trendDateEnd}`;
    const listName = subListName;
    var subDetails = {};
    subDetails[`${listName.replaceAll(" ", "_")}`] = filteredArr;

    // add new list to existing data to append
    if (data) {
      setSubscriber({ ...data["results"], ...subDetails });
    } else {
      setSubscriber(subDetails);
    }
  };

  // remove an added recipient
  const handleRemoveRecipient = (item) => {
    console.log('---- removing item -------')
    const newSubList = subscriberList;
    const indexOfObject = newSubList.findIndex(object => {
      return object === item;
    });
    newSubList.splice(indexOfObject, 1);

    setSubscriberList(newSubList);
  };

  console.log('---- sub list ------')
  console.log(subscriberList);

  
  // function to return months
  const getMonths = (start, end) =>
    Array.from({ length: end.diff(start, 'month') + 0 }).map((_, index) =>
      moment(start).add(index, 'month').format('MMM YYYY'),
    );
  
  // create start dates
  const startDates = getMonths(moment("2021-01-01", "YYYY-MM-DD"),moment())
  const getYears = (start, end) =>
    Array.from({ length: end.diff(start, 'year') + 1 }).map((_, index) =>
      moment(start).add(index, 'year').format('YYYY'),
    );
  const years = getYears(moment("2018", "YYYY"),moment())

  // create end dates dependent on the selected start date
  const endDates = selectedStartDate
    ? getMonths(
        moment(
          isNumeric(selectedStartDate) ? moment().add(selectedStartDate, 'month') : selectedStartDate
        ),
        moment()
      )
    : [];

  const handleStartDate = (e) => {
    setSelectedStartDate(e.target.value);
  }

  // setting the date type
  const handleDateType = (e) => {
    setDateType(e.target.value);
  }

  // clear name and email fields when adding recipients
  const clearFields = () => {
    document.getElementById("nametextfield").value = "";
    document.getElementById("emailtextfield").value = "";
  }

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
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // fullWidth
          maxWidth="md"
          PaperProps={{
            style: {
              backgroundColor: "white",
              boxShadow: "none",
              textColor: "white",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <p className="grap-header">Create a subscriber list</p>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} id="settings-form">
              <div>
                <h5 style={{ textAlign: "left", marginLeft: "10px" }}>
                  Specify subscriber list name:{" "}
                  <i style={{ color: "black", fontWeight: "300" }}>
                    {"(Should not contain special characters)"}
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
                  onBlur={validateName}
                ></input>
                <span role="alert" id="nameError" aria-hidden="true">
                  This name already exists
                </span>
                <br></br>
                <select style={{ textAlign: "left" }} required>
                  <option>Select template</option>
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
                  >
                    <option>Select date type</option>
                    <option>Months (MM YYYY)</option>
                    <option>Number of months from current </option>
                  </select>
                  <br></br>
                  <h5 style={{ textAlign: "left" }}>Trend line dates:</h5>
                  <select
                    onChange={handleStartDate}
                    style={{ display: "inline", marginLeft: "0px" }}
                    required
                  >
                    <option>Input start date</option>
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
                  <select required>
                    <option>Input end date</option>
                    {endDates &&
                      endDates.map((obj, index) => {
                        const dateObj =
                          dateType === "Months (MM YYYY)"
                            ? obj
                            : parseInt(
                                moment(obj).diff(moment(), "months", true)
                              );
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
                            {dateObj}
                          </option>
                        );
                      })}
                  </select>
                  {/* </span> */}
                  <br></br>
                  <h5 style={{ textAlign: "left" }}>
                    Facility level month of interest:
                  </h5>
                  <select required style={{ marginLeft: "0px" }}>
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
                  <h5 style={{ textAlign: "left" }}>
                    Reporting year of interest:
                  </h5>
                  <select
                    required
                    style={{ marginLeft: "0px", marginBottom: "10px" }}
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
                            value={JSON.stringify(obj)}
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
                  {subscriberList &&
                    [...subscriberList].reverse().map((item, index) => {
                      return (
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
                              required
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
                            {/* {index ? */}
                            <button
                              className="button"
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
                            {/* : null} */}
                          </td>
                        </tr>
                        // </div>
                      );
                    })}
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
                setCount(0);
                setSubscriberList([]);
                setSubscriber({});
                setTimeout(() => {
                  setOpen(false);
                  listRefetch();
                }, 2000);
              }}
              style={{ fontSize: ""}}
            >
              Save
            </button>
            <button
              className="button"
              autoFocus
              onClick={() => {
                setOpen(false);
                setSubscriberList([]);
                setSubscriber({});
              }}
              style={{ fontSize: "", marginRight:"35px"}}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

const isEmpty = (object) => Object.values(object).every(value => !!value);

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
}

export default SettingsPopup;
