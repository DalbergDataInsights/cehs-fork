import React from "react";

export const ThreeLines = ({ onClick }) => (
  <div onClick={onClick} style={{ cursor: "pointer" }}>
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
      }}
    />
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
      }}
    />
    <div
      style={{
        width: "1.7vw",
        height: "5px",
        backgroundColor: "rgb(34, 94, 140)",
        margin: "6px 0px",
        transition: "all 0.5s ease 0s",
      }}
    />
  </div>
);
