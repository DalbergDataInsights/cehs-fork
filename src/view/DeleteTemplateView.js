import React, { useState, useEffect } from "react";
import EmailClient from "../email/EmailClient";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../components/TableHead.css";

const DeleteTemplateView = () => {
  const [templateIds, setTemplateIds] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    EmailClient.getTemplateIdsList().then((response) => {
      setTemplateIds(response);
      setTemplateId(response[0].id);
    });
  }, []);

  const handleOnChange = (event) => {
    const pickedTemplate = JSON.parse(event.target.value);
    setTemplateId(pickedTemplate.id);
    setTemplateName(pickedTemplate.name);
  };

  return (
    <>
      <div style={{justifyContent:"left" }}>
        {/* <p>Select template to delete: </p> */}
        <table className="panel" style={{ width: "15vw" }}>
          <thead className="header">
            <tr className="area" style={{ gridTemplateColumns: "20% 80%" }}>
              <th></th>
              <th>Template name</th>
            </tr>
          </thead>
          <tbody>
            {templateIds &&
              templateIds.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="body-area"
                    style={{ gridTemplateColumns: "20% 80%" }}
                  >
                    <td>
                      <input
                        key={index}
                        type="radio"
                        id={item.template}
                        value={JSON.stringify(item)}
                        name="address"
                        onChange={handleOnChange}
                      ></input>
                    </td>
                    <td>{item.name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button className="button" style={{ float: "right" }} onClick={() => setOpen(true)}>
          Delete
        </button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation Alert"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this template:
              <span style={{ fontWeight: "bold" }}>{templateName}</span> ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className="button"
              onClick={() => {
                EmailClient.deleteTemplate(templateId);
                window.setTimeout(function () {
                  location.reload();
                }, 1000);
              }}
            >
              Delete
            </button>
            <button className="button" autoFocus onClick={() => setOpen(false)}>
              Cancel
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default DeleteTemplateView;
