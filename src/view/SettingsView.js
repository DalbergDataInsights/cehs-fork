import React, { useState, useEffect } from "react";
import TableHead from "../components/TableHead";
import "../components/TableBody.css";
import SettingsPopup from "../components/SettingsPopup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDataQuery } from "@dhis2/app-runtime";
import DeleteSubList from "../components/DeleteSubList";
import EditSubList from "../components/EditSubList";

// query to read sub list available
const settingsQuery = {
  results: {
    resource: "dataStore/spph_app_08082022/settings",
    params: {
      skipMeta: false,
    },
  },
};

const SettingsView = ({ onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({});
  const [subListId, setSubListId] = useState("");
  const [subList, setSubList] = useState([]);
  const [newSettingsData, setNewSettingsData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const { loading, error, data, refetch } = useDataQuery(settingsQuery);

  useEffect(() => {
    if (data) {
      setSettingsData(data.results);
    }
  }, [data]);

  // accounting for changes in the checked items in the table and set the respective states with correct data
  const handleOnChange = (event) => {
    const { id, checked } = event.target;
    const pickedSubList = JSON.parse(event.target.value);
    setSubList(pickedSubList);
    setSubListId(id);
    console.log(id);
  };

  const handleDelete = () => {
    console.log(subListId);
    const n = Object.keys(settingsData)
      .filter((key) => key !== subListId)
      .reduce((obj, key) => {
        obj[key] = settingsData[key];
        return obj;
      }, {});

    setNewSettingsData(n);

    console.log(`Deleting ${subListId}`);
  };

  // Reads text inputted in the search box and returns data containing searched text else
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      var filteredData = [];
      Object.entries(settingsData).filter(([key, item]) => {
        if (Object.values(...item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase())) {
            filteredData.push(key)
          };
      });
      setFilteredResults(filteredData);
    }
  };

  const subData = searchInput.length > 1 ? filteredResults: Object.keys(settingsData)

  return (
    <>
      <div style={{ alignItems: "center", verticalAlign: "right" }}>
        <input
          type="search"
          placeholder="Search here..."
          onChange = {(e) => searchItems(e.target.value)}
          value = {searchInput}
          style={{
            float: "right",
            marginRight: "0px",
          }}
        ></input>
        <div className="table-wrapper">
          <table className="panel">
            <TableHead />
            <tbody>
              {subData.map((key) => (
                <tr key={key} className="body-area">
                  <td>
                      <input
                        key={key}
                        type="radio"
                        id={key}
                        value={JSON.stringify(settingsData[key])}
                        onChange={handleOnChange}
                        checked={subListId === key}
                      ></input>
                  </td>
                  <td>{key.replaceAll("_", " ")}</td>
                  <td>
                    {settingsData[key].map((i) => i.recipientEmail).join(", ").length >  100 
                    ? settingsData[key].map((i) => i.recipientEmail).join(", ").slice(0, 100).concat('...'):
                    settingsData[key].map((i) => i.recipientEmail).join(", ")}
                  </td>
                  <td>{settingsData[key][0].templateName}</td>
                  <td>{settingsData[key][0].trendDateStart}</td>
                  <td>{settingsData[key][0].trendDateEnd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <button>create</button>  */}
        <button className="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create
        </button>
        <button className="button"
          onClick={() => {
            setEditOpen(true);
          }}
          style={{ float: "right", marginRight: "0px" }}
        >
          Edit
        </button>
        <button className="button"
          onClick={() => {
            handleDelete();
            setDeleteOpen(true);
          }}
          style={{ float: "right" }}
        >
          Delete
        </button>
        <SettingsPopup open={open} setOpen={setOpen} />
        <Dialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this list:
              <span style={{ fontWeight: "bold" }}>
                {subListId.replaceAll("_", " ")}
              </span>{" "}
              ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <DeleteSubList
              newSettingsData={newSettingsData}
              onUpdate={onUpdate}
              setDeleteOpen={setDeleteOpen}
              refetch={refetch}
            />
            <button className="button" autoFocus onClick={() => setDeleteOpen(false)}>
              Cancel
            </button>
          </DialogActions>
        </Dialog>
        {subList.length > 0 && 
        <EditSubList editOpen={editOpen} setEditOpen={setEditOpen} onUpdate={onUpdate} subListId={subListId} subList={subList} 
        setSubList={setSubList}
        listRefetch={refetch}/>
        }
      </div>
    </>
  );
};

export default SettingsView;
