import React, {useState} from 'react';
import EmailClient from '../email/EmailClient';

function NewTemplateView() {
  const [templateName, setTemplateName] = useState("");
  
  const handleOnChange = (event) => {
    setTemplateName(event.target.value);
  }

  const clearFields = () => {
    document.getElementById("namefield").value = "";
  }

  return (
    <>
    <div>
    New template name:
    <input 
    type="text" 
    id="namefield"
    placeholder="Write template name here..." 
    style={{height: '30px'}}
    onChange={handleOnChange}>
    </input>
    <div>
    <button className="button"
        onClick={() => {
            EmailClient.newTemplate(templateName);
            console.log(templateName);
            setTimeout(() => {clearFields()},[1000]);
            
        }}
        style={{float: 'right'}}
        >
        Create new
        </button>
        </div>
        </div>
    </>
  )
}

export default NewTemplateView