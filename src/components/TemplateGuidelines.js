import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import gfm from "remark-gfm";
import guidelines from './Guidelines.md'

function TemplateGuidelines() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(guidelines)
      .then((res) => res.text())
      .then((text) => {setContent(text); console.log(text)});
  }, []);

  return (
    <div
      style={{
        width: "auto",
        boxSizing: "border-box",
        boxShadow: "1px 1px 1px 1px #999",
        borderRadius: "10px",
        marginLeft: "20px",
        padding: "5px",
        overflow: 'auto',
        // overflowX: 'hidden',
        // height: '67vh',
        marginTop: '50px',
        lineHeight: '1.5'
      }}
    >
      <ReactMarkdown children={content} 
      remarkPlugins={[gfm]}
      />
    </div>
  );
}

export default TemplateGuidelines;
