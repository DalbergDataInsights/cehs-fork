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



const TableHead = () => {
  return (
    <thead className="header">
      <tr
        style={{
          display: "grid",
          gridTemplateColumns: "6% 30% 30% 17% 17%",
        }}
      >
        <th></th>
        <th>JOB NAME</th>
        <th>SUBSCRIBER LIST NAME</th>
        <th>ON</th>
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
  const res = await fetch("https://selenium-scheduler.herokuapp.com/schedule");
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
      method: "DELETE",
    });
    setJobs([]);
    jobRefetch();
  };

  if (jobs) {console.log(jobs)}

  return (
    <>
      <div
        style={{ alignItems: "center", verticalAlign: "right", width: "70%" }}
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
                      gridTemplateColumns: "6% 30% 30% 17% 17%",
                    }}
                  >
                    <td>
                      <input
                        key={job.name}
                        type="radio"
                        id={job.name}
                        onChange={handleOnChange}
                        checked={subListId === job.name}
                      ></input>
                    </td>
                    <td>{job.name}</td>
                    <td>{job.id.replaceAll("_", " ")}</td>
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
            // deleteJob(subListId);
            setDeleteOpen(true);
          }}
          style={{ float: "right", marginRight:"0px" }}
        >
          Delete
        </button>

        <DeleteScheduledJob 
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          deleteJob={deleteJob}
          subListId={subListId}
        />

        {data && 
          <SchedulePopup
            open={open}
            setOpen={setOpen}
            setJobs={setJobs}
            refetch={jobRefetch}
            subList={data.results}
            jobs={jobs}
          />
        }
      </div>
    </>
  );
};

const DeleteScheduledJob = ({deleteOpen, setDeleteOpen, deleteJob, subListId}) => {
  return (
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
          Do you really want to delete this job:{" "}
          <span style={{ fontWeight: "bold" }}>
            {subListId.replaceAll("_", " ")}
          </span>{" "}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className="button"
          onClick={() => {
            deleteJob(subListId);
            setTimeout(() => {
              setDeleteOpen(false);
            }, 0);
          }}
        >
          Delete
        </button>
        <button className="button" autoFocus onClick={() => setDeleteOpen(false)}>
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default ScheduleView;
