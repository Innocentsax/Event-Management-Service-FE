// EventContainer.js
// import Link from 'react-router-dom'
import React from "react";
import "./EventContainer.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";


function EventContainer({ date, day, eventName, description, imageUrl, ID }) {
  const navigate =  useNavigate();
  const handleViewMore = (e) => {
    const id = e.target.parentNode.id;
    navigate(`/events/viewevent?id=${ID}`)
    //window.location.href = `/events/viewevent/${ID}`;
  };

  return (
    <button onClick={handleViewMore} id={ID}>
      <div className="event-wrapper">
        <div className="event-container">
          <div
            className="image-container"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          <div className="event-details">
            <div className="event-title">
              <div className="cal-tag">
                <p className="calendar">{date}</p>
                <p>{day}</p>
              </div>      
              <div>
              <h4>{eventName}</h4>
              <p className="event-description">{description}</p>
              </div>
              
            </div>
            <div className="event-description">
             
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default EventContainer;
