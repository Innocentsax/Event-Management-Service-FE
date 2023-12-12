import React, { useState } from "react";
import "./button.css";
import { Link } from "react-router-dom";

function Button() {
  return (
    <button type="button" className="btn"><Link to="/create_event">Create Event</Link> </button>
  );
}

export default Button;
