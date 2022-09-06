import React from "react";
import { useState, useEffect } from "react";
// import "../App.css";
import EmailClient from "../email/EmailClient";
import { useHistory } from "react-router-dom";
import { useDataQuery } from "@dhis2/app-runtime";

// query to read sub list available from datastore
const settingsQuery = {
  results: {
    resource: "dataStore/spph_app_08082022/settings",
    params: {
      skipMeta: false,
    },
  },
};

function SendEmailView({ setEmailTargets }) {
  const [meta, setMeta] = useState([]);
  const [template, setTemplate] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [emails, setEmails] = useState([]);

  const [settingsData, setSettingsData] = useState({});
  const { loading, error, data, refetch } = useDataQuery(settingsQuery);

  useEffect(() => {
    if (data) {
      setSettingsData(data.results);
    }
  }, [data]);

  const history = useHistory();

  // if there is a search value filter data else return entire data
  const addressData =
    searchInput.length > 1 ? filteredResults : Object.keys(settingsData);

  // select all items in the table
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setMeta(
      addressData
        .map((li) => settingsData[li])
        .reduce((current, next) => current.concat(next), [])
    );
    setTemplate(addressData.map((li) => li));
  };

  // deselect all checked items in the table
  const handleDeselectAll = () => {
    setIsCheckAll(isCheckAll);
    setMeta([]);
    setTemplate([]);
  };

  // accounting for changes in the checked items in the table and set the respective states with correct data
  const handleOnChange = (event) => {
    const { id, checked, value } = event.target;
    const pickedEmail = JSON.parse(event.target.value);
    setMeta([...meta, ...pickedEmail]);
    setTemplate([...template, id]);

    if (!checked) {
      setTemplate(template.filter((item) => item !== id));
      setMeta(
        meta.filter(
          (item) =>
            !pickedEmail.find(
              (id) => JSON.stringify(item) === JSON.stringify(id)
            )
        )
      );
    }
  };

  // Reads text inputted in the search box and returns data containing searched text else
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      var filteredData = [];
      Object.entries(settingsData).filter(([key, item]) => {
        if (
          Object.values(...item)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        ) {
          filteredData.push(key);
        }
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(settingsData));
    }
  };

  return (
    <>
      <div id="emails" style={{ display: "none" }}>
        {emails.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
      <div style={{ width: "50vw" }}>
        <div>
          <input
            type="search"
            placeholder="Search here..."
            onChange={(e) => searchItems(e.target.value)}
            value={searchInput}
            style={{ float: "right", marginRight: "0px" }}
          ></input>
        </div>
        <div className="table-wrapper">
          <table className="panel" style={{ height: "50px" }}>
            <thead className="header">
              <tr>
                <th>Subscribers List</th>
              </tr>
            </thead>
            <tbody>
              {addressData.map((item, index) => (
                <tr
                  key={item}
                  className="body-area"
                  style={{ gridTemplateColumns: "100%" }}
                >
                  <td>
                    <label>
                      <input
                        key={item}
                        type="checkbox"
                        id={item}
                        value={JSON.stringify(settingsData[item])}
                        name="meta"
                        onChange={handleOnChange}
                        checked={template.includes(item)}
                      ></input>
                      {item.replaceAll("_", " ")}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleSelectAll}>Select all</button>
        <button onClick={handleDeselectAll}>Deselect all</button>
        <button
          style={{ float: "right", marginRight: "0px" }}
          onClick={() => {
            setDisabled(true);

            const sentEmails = [];
            // we will use simple caching to not overspam sendgrid endpoint
            const variablesCache = {};

            const payload = meta;
            payload.forEach((metaItem, index) => {
              if (!(metaItem.templateId in variablesCache)) {
                // since we are talking to the endpoint and we cannot really place await since
                // it will just put async one level higher, we need to responve only after fetching
                // the data, hence we use then
                EmailClient.getTemplateVariables(metaItem.templateId).then(
                  (variables) => {
                    variablesCache[metaItem.templateId] = variables;
                    sentEmails.push({
                      ...metaItem,
                      variables: variablesCache[metaItem.templateId],
                    });

                    // if (index >= payload.length - 1) {
                    if (payload.length === sentEmails.length) {
                      // when all emails are processed, we just load another view
                      // we need another view because we need to fetch data
                      // we can only use queries at the top level of components
                      setEmailTargets(sentEmails);
                      history.push("process");
                    }
                  }
                );
              }
            });
          }}
          disabled={disabled}
        >
          Send email
        </button>
      </div>
    </>
  );
}

export default SendEmailView;
