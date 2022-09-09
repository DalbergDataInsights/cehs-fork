import React, {useState} from 'react';
import EmailClient from '../email/EmailClient';

function NewTemplateView() {
  const [templateName, setTemplateName] = useState("");
  
  const handleOnChange = (event) => {
    setTemplateName(event.target.value);
  }

  return (
    <>
    <div>
    New template name:
    <input 
    type="text" 
    placeholder="Write template name here..." 
    style={{height: '30px'}}
    onChange={handleOnChange}>
    </input>
    <div>
    <button className="button"
        onClick={() => {
            EmailClient.newTemplate(templateName);
            console.log(templateName);
            // window.setTimeout(function(){location.reload()},1000)
            
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