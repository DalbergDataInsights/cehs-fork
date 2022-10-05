import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function SchedulePopup({ open, setOpen, setJobs, refetch, subList, jobs }) {
  const publishJob = async (name, id, on, timeout) => {
    await fetch(`https://selenium-scheduler.herokuapp.com/schedule`, {
      // await fetch(`http://localhost:8080/schedule`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_SCHEDULER_API_KEY}`,
      },
      body: JSON.stringify({
        list_id: String(id),
        timeout: Number(timeout),
        on: Number(on),
      }),
    });
    setJobs([]);
    refetch();
    setOpen(false);
  };

  const [templateId, setTemplateId] = useState("");
  const [onTime, setOnTime] = useState("28");
  const [timeOut, setTimeOut] = useState("300");
  const [jobName, setJobName] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // validate job name, if exists then invalid
  const validateName = (e) => {
    e.preventDefault();

    const subListNameField = document.getElementById("sublistname");
    const nameError = document.getElementById("nameError");
    let valid = true;

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].name === subListNameField.value) {
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
            {"Schedule an email"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={() => {}} id="settings-form">
              <div>
                <h5 style={{ textAlign: "left" }}>
                  Specify subscriber list name
                </h5>
                <select
                  style={{ textAlign: "left", marginLeft: "0px" }}
                  onChange={(e) => handleChange(e, setTemplateId)}
                  required
                >
                  <option>Select list</option>
                  {subList &&
                    Object.keys(subList).map((obj, index) => {
                      return (
                        <option
                          style={{
                            backgroundColor: "#fff",
                            font: "lato",
                            padding: "16px",
                            margin: "10px",
                          }}
                          key={index}
                          value={obj}
                        >
                          {obj}
                        </option>
                      );
                    })}
                </select>
                <h5 style={{ textAlign: "left" }}>Specify send date</h5>
                <label>
                  <input
                    type="text"
                    id="nametextfield"
                    placeholder="Day to send emails out"
                    defaultValue={onTime}
                    onChange={(e) => handleChange(e, setOnTime)}
                    style={{ marginLeft: "0px" }}
                    required
                  ></input>
                </label>
                <h5 style={{ textAlign: "left" }}>
                  Specify timeout (in seconds)
                </h5>
                <label>
                  <input
                    type="text"
                    id="nametextfield"
                    placeholder="Timeout scheduled job"
                    defaultValue={timeOut}
                    onChange={(e) => handleChange(e, setTimeOut)}
                    style={{ marginLeft: "0px" }}
                    required
                  ></input>
                </label>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <button
              className="button"
              onClick={() => {
                publishJob(jobName, templateId, onTime, timeOut);
              }}
              style={{ fontSize: "12px" }}
            >
              Save
            </button>
            <button
              className="button"
              autoFocus
              onClick={() => {
                setOpen(false);
              }}
              style={{ fontSize: "12px", marginRight: "35px" }}
            >
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default SchedulePopup;
