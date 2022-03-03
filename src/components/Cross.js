import React from "react";

export const Cross = ({ onClick }) => (
  <div onClick={onClick} style={{ cursor: "pointer" }}>
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        transform: "rotate(-45deg) translate(-9px, 6px)",
      }}
    />
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        opacity: "0",
      }}
    />
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
        transform: "rotate(45deg) translate(-8px, -8px)",
      }}
    />
  </div>
);
