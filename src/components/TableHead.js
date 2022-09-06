import React from "react";
import "./TableHead.css";


const Tablehead = ({ toggleSelectAll, allSelected }) => {
  return (
    <thead className="header">
      <tr className="area">
        <th>
        </th>
        <th>Name</th>
        <th>Email List</th>
        <th>Template Name</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
    </thead>
  );
};
export default Tablehead;
