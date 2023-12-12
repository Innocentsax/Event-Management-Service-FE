import "./UpcomingEventsSection.css";

import axios from "axios";
import React, { useState, useEffect } from "react";

const UpcomingEventsSection = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8099/api/v1/event/all_event_category"
      )
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  return (
    <section className="upcoming-events-section">
      <div className="events-filter_container">
        <h2>Upcoming Events</h2>
        <div className="button-container">
          <div className="button">
            <select value={category} onChange={handleCategoryChange}>
              <option value="All Category" className="category">
                All Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;