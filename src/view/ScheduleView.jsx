import React, { useState, useEffect } from "react";
import "../components/TableBody.css";
import SchedulePopup from "../components/SchedulePopup";
import { useDataQuery } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ScheduleGuidelines from "../components/ScheduleGuidelines";

const TableHead = () => {
  return (
    <thead className="header">
      <tr
        style={{
          display: "grid",
          gridTemplateColumns: "10% 60% 15% 15%",
        }}
      >
        <th></th>
        <th>SUBSCRIBER LIST NAME</th>
        <th>ON DAY</th>
        <th>TIMEOUT</th>
      </tr>
    </thead>
  );
};

// query to read sub list available
const settingsQuery = {
  results: {
    resource: "dataStore/spph_app_08082022/settings",
    params: {
      skipMeta: false,
    },
  },
};

const fetchJobs = async () => {
  const res = await fetch("https://selenium-scheduler.herokuapp.com/schedule", {
    // const res = await fetch(`http://localhost:8080/schedule`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_SCHEDULER_API_KEY}`,
    },
  });
  return res.json();
};

const ScheduleView = () => {
  const { loading, error, data, refetch } = useDataQuery(settingsQuery);

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { isLoading: isJobLoading, refetch: jobRefetch } = useQuery(
    "jobs",
    fetchJobs,
    {
      onSuccess: (data) => {
        setJobs(data["jobs"]);
      },
    }
  );

  const [subListId, setSubListId] = useState("");

  const handleOnChange = (event) => {
    const { id } = event.target;
    setSubListId(id);
  };

  const deleteJob = async (id) => {
    await fetch(`https://selenium-scheduler.herokuapp.com/schedule/${id}`, {
      // await fetch(`http://localhost:8080/schedule/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_SCHEDULER_API_KEY}`,
      },
    });
    setJobs([]);
    jobRefetch();
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          verticalAlign: "right",
          width: "70%",
          marginTop: "40px",
        }}
      >
        <div className="table-wrapper">
          {!jobs && <div>Loading...</div>}
          <table className="panel">
            <TableHead />
            <tbody>
              {jobs &&
                jobs.map((job) => (
                  <tr
                    key={job.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "10% 60% 15% 15%",
                    }}
                  >
                    <td>
                      <input
                        key={job.list_id}
                        type="radio"
                        id={job.list_id}
                        onChange={handleOnChange}
                        checked={subListId === job.list_id}
                      ></input>
                    </td>
                    <td>{job.list_id.replaceAll("_", " ")}</td>
                    <td>{job.on}</td>
                    <td>{job.timeout}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button
          className="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          New
        </button>

        <button
          className="button"
          onClick={() => {
            if (subListId != "") {
              setDeleteOpen(true);
            }
          }}
          style={{ float: "right", marginRight: "0px" }}
        >
          Delete
        </button>

        <DeleteScheduledJob
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          deleteJob={deleteJob}
          subListId={subListId}
          setSubListId={setSubListId}
        />

        {data && (
          <SchedulePopup
            open={open}
            setOpen={setOpen}
            setJobs={setJobs}
            refetch={jobRefetch}
            subList={data.results}
            jobs={jobs}
          />
        )}
      </div>
      <ScheduleGuidelines />
    </>
  );
};

const DeleteScheduledJob = ({
  deleteOpen,
  setDeleteOpen,
  deleteJob,
  subListId,
  setSubListId,
}) => {
  return (
    <Dialog
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this job:{" "}
          <span style={{ fontWeight: "bold" }}>
            {subListId.replaceAll("_", " ")}
          </span>{" "}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="button"
          autoFocus
          onClick={() => setDeleteOpen(false)}
        >
          Cancel
        </button>
        <button
          className="button"
          onClick={() => {
            deleteJob(subListId);
            setSubListId("");
            setTimeout(() => {
              setDeleteOpen(false);
            }, 0);
          }}
        >
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleView;
