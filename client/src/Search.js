import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default function Search(props) {
  return (
    <div>
      <input id="searchInput"
        onChange={props.onChange}
        placeholder="Type Your Ticket Name....."
      ></input>
    </div>
  );
}