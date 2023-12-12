import "./Search.css";
import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    eventTitle: "",
    location: "",
    startDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <div className="search-form-container">
      <h2>Find Events</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="input-container">
          <label htmlFor="eventTitle">What are you looking for?</label>
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            value={searchCriteria.eventTitle}
            onChange={handleInputChange}
            placeholder="Search events"
          />
        </div>
        <div className="input-container">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchCriteria.location}
            onChange={handleInputChange}
            placeholder="Lagos, Nigeria"
            className="search-input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="startDate">When</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={searchCriteria.startDate}
            onChange={handleInputChange}
            placeholder="Any date"
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button" id="search-btn">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
