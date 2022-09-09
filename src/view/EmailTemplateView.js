import React, { useState, useEffect } from "react";
import EmailClient from "../email/EmailClient";
import EmailTemplate from "../components/EmailTemplate";
import TemplateGuidelines from "../components/TemplateGuidelines";

const EmailTemplateView = () => {
  const [templateIds, setTemplateIds] = useState([]);
  const [template, setTemplate] = useState("<div></div>");
  const [templateView, setTemplateView] = useState("<div></div>");
  const [templateId, setTemplateId] = useState("");


  useEffect(() => {
    EmailClient.getTemplateIdsList().then((response) => {
      setTemplateIds(response);

      EmailClient.getTemplateHTML(response[0].id, response[0].versions).then(
        (t) => {
          setTemplateView(t);
        }
      );
      setTemplateId(response[0].id);
    });
  }, []);

  const handleChange = (event) => {
    const pickedTemplate = JSON.parse(event.target.value);
    console.log("---------pickedTemplate----");
    console.log(pickedTemplate.name);
    console.log(pickedTemplate);

    EmailClient.getTemplateHTML(
      pickedTemplate.id,
      pickedTemplate.versions
    ).then((response) => {
      setTemplateView(response);
    });
    setTemplateId(pickedTemplate.id);
  };

  const [editor, setEditor] = useState(<div></div>);
  useEffect(() => {
    setEditor(<EmailTemplate body={templateView} setTemplate={setTemplate} />);
  }, [templateView]);

  return (
    <>
      <div>
        Select template:
        <select onChange={handleChange}>
          {templateIds &&
            templateIds.map((obj, index) => {
              return (
                <option
                  style={{
                    backgroundColor: "#fff",
                  }}
                  key={index}
                  value={JSON.stringify(obj)}
                >
                  {obj.name}
                </option>
              );
            })}
        </select>
        <div style={{ width: "auto", margin: "0 auto",height:"calc(100% - 90px)"}}>{editor}</div>
        <div>
          <button className="button" style={{ float: "right", marginRight: "0px" }}>Cancel</button>
          <button className="button"
            style={{ float: "right" }}
            onClick={() => EmailClient.updateTemplateHTML(templateId, template)}
          >
            Save
          </button>
        </div>
      </div>
      <TemplateGuidelines />
    </>
  );
};

export default EmailTemplateView;
