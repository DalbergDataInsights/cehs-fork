import React, { useState, useEffect } from "react";
import "../components/TableBody.css";
import SchedulePopup from "../components/SchedulePopup";
import { useDataQuery } from "@dhis2/app-runtime";
import { useQuery } from "react-query";

const TableHead = () => {
  return (
    <thead className="header">
      <tr
        style={{
          display: "grid",
          gridTemplateColumns: "10% 30% 30% 30%",
        }}
      >
        <th></th>
        <th>ID</th>
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
  const res = await fetch("http://localhost:8080/schedule");
  return res.json();
};

const SettingsView = () => {
  const { loading, error, data, refetch } = useDataQuery(settingsQuery);

  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

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
    await fetch(`http://localhost:8080/schedule/${id}`, {
      method: "DELETE",
    });
    setJobs([]);
    jobRefetch();
  };

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
                    key={job.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "10% 30% 30% 30%",
                    }}
                  >
                    <td>
                      <input
                        key={job.id}
                        type="radio"
                        id={job.id}
                        onChange={handleOnChange}
                        checked={subListId === job.id}
                      ></input>
                    </td>
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
            deleteJob(subListId);
          }}
          style={{ float: "right" }}
        >
          Delete
        </button>

        <SchedulePopup
          open={open}
          setOpen={setOpen}
          setJobs={setJobs}
          refetch={jobRefetch}
        />
      </div>
    </>
  );
};

export default SettingsView;
