import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function SchedulePopup({ open, setOpen, setJobs, refetch, subList }) {
  const publishJob = async (id, on, timeout) => {
    await fetch(`http://localhost:8080/schedule/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(id),
        timeout: Number(timeout),
        on: Number(on),
      }),
    });
    setJobs([]);
    refetch();
    setOpen(false);
  };

  const [tempalteId, setTemplateId] = useState("");
  const [onTime, setOnTime] = useState("28");
  const [timeOut, setTimeOut] = useState("300");

  const handleChange = (e, setter) => {
    setter(e.target.value);
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
            {"Create a subscriber list"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={() => {}} id="settings-form">
              <div style={{ fontSize: "12px" }}>
                <p style={{ textAlign: "left", fontWeight: "bold" }}>
                  Specify subscriber list ID
                </p>
                <select style={{ textAlign: "left", marginLeft:"0px"}} onChange={(e) => handleChange(e, setTemplateId)}required>
                  <option>Select ID</option>
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
                          value={JSON.stringify(obj)}
                        >
                          {obj}
                        </option>
                      );
                    })}
                </select>
                <p style={{ textAlign: "left", fontWeight: "bold" }}>
                  Specify send date
                </p>
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
                <p style={{ textAlign: "left", fontWeight: "bold" }}>
                  Specify timeout (in seconds)
                </p>
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
                publishJob(tempalteId, onTime, timeOut);
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
