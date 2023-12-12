import React, { useCallback, useEffect, useState } from "react";
import "./EventDetails.css";
import axios from "axios";
import EventContainer from "../EventContainer/EventContainer";
import { useNavigate, useParams } from "react-router-dom";
import { FetchingData } from "../FetchingData";

function EventDetails() {
  //const [loading,setLoading] = useState(true)
  const navigation =  useNavigate();
  const [eventData, setEventData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventStartDate: new Date().toISOString(),
    eventEndDate: new Date().toISOString(),
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [customStyles,setCustomSyles]=  useState({
    backgroundImage:""
  })

  const eventId = window.location.href.split("=")[1];

  const purchaseTicket =()=>{
    let target = "/events/book?id="+eventId;
    console.log(target)
    navigation(target)
    
  }

  let [otherEventsData, setOtherEventsData] = useState([]);

  function splitDescription(description, numSentences) {
    const sentences = description.split(". ");
    const shortenedDescription = sentences.slice(0, numSentences).join(". ");

    if (sentences.length > numSentences) {
      return `${shortenedDescription}...`;
    }

    return shortenedDescription;
  }

  const [background, setBackgoundImage]=useState({backgroundImage:""});

  useEffect(() => {

    const api = axios.create({
      baseURL: "http://localhost:8099/api/v1",
      withCredentials: true,
    });
    api
      .get("/event/view/"+eventId)

      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setEventData(response.data);
        let bannerPath = "url"
        setBackgoundImage(response.data.banner)

        setLoading(false);
        // setTimeout(()=>{
        //     setLoading(false);
        // }, 2000)
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        setLoading(false);
        otherEvents();
      });
  }, []);


  const otherEvents = () => {
    axios
      .get("http://localhost:8099/api/v1/event/other-events-you-may-like")
      .then((response) => {
        let res = response.data;
        const formattedEventData = res.map((event) => ({
          ...event,
          startDateTime:
            new Date(event.startDateTime).toDateString().split(" ")[1] +
            " " +
            new Date(event.startDateTime).toDateString().split(" ")[2],
          endDateTime: new Date(event.endDateTime).toDateString(),
        }));

        setOtherEventsData(formattedEventData);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  function convertDate(date) {
    const input = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const output = input.toLocaleDateString("en-US", options);
    return output;
  }

  return (
    <div className="event-details" style={{background}} >
      <div className="event-img-cont">
        <img className="event-img" src="" alt="" />
      </div>
      
      <div className="div">
        <div className="overlap">
          <p className="eko-all-night-pool">
            {eventData.eventTitle}
            <br />
            {eventData.category}
          </p>
        
          <div className="text-wrapper-2">
            <a href="#">← Go Back</a>
          </div>
          <div className="group">
            <div className="overlap-group">
              <div className="date-time">Date &amp; Time</div>
              <p className="p">{convertDate(eventData.startDateTime)}</p>
              <div className="text-wrapper-3">
                <a href="#">+ Add to Calendar</a>
              </div>
              <button className="frame">
                <div className="text-wrapper-4" href="#" onClick={purchaseTicket}>
                  Buy Ticket
                </div>
              </button>
              <button className="div-wrapper">
                <div className="text-wrapper-4">Save Ticket</div>
              </button>
            </div>
          </div>
        </div>
        <div className="text-wrapper-14">Description</div>
        <p className="lorem-ipsum-dolor">
          {eventData.eventDescription}
        </p>
        <div className="text-wrapper-15">Date and Time</div>
        <div className="frame-2">
          <p className="div-2">
            <span className="span">
              Start Date
              <br />
            </span>{" "}
            <span className="text-wrapper-16">
              {convertDate(eventData.startDateTime)}
            </span>
          </p>
          <p className="div-2">
            <span className="span">
              End Date
              <br />
            </span>{" "}
            <span className="text-wrapper-16">
              {convertDate(eventData.endDateTime)}
            </span>
          </p>
          <p className="div-2">
            <span className="span">
              Time
              <br />
            </span>{" "}
            <span className="text-wrapper-16">09/06/2022</span>
          </p>
        </div>
        <p className="text-wrapper-17">How to contact the organizer</p>
        <p className="pleace-visit-https">
          <span className="text-wrapper-18">Please visit </span>
          <span className="text-wrapper-19">
            <a href="https://samplewebsite.com/contact-us">
              https://samplewebsite.com/contact-us
            </a>
          </span>
          <span className="text-wrapper-18">
            {" "}
            or refer to the FAQ section for all questions.
          </span>
        </p>
        <div className="overlap-2"></div>
        <div className="description">
          <div className="text-wrapper-20">Event Location</div>
        </div>
        <div className="date-time-2">
          <div className="text-wrapper-20">Share with Friends</div>
        </div>
        <a href="https://google.com`  ">
          <img
            className="img"
            src="src/assets/images/social-links.png"
            alt="Social Links"
          />
        </a>
        <div class="group-2">
          <p class="text-wrapper-21">Other event you might like</p>
        </div>
        <div class="frame-wrapper">
          {otherEventsData.length > 0 ? (
            <div className="event-container-wrapper">
              {otherEventsData.map((event) => (
                <EventContainer
                  ID={event.eventId}
                  date={event.startDateTime}
                  eventName={event.eventTitle}
                  description={splitDescription(event.eventDescription, 2)}
                  imageUrl={event.banner}
                />
              ))}
            </div>
          ) : (
            <p>No other events to display.</p>
          )}
        </div>
      </div>
      {loading && <FetchingData text="Fetching data ..."/>}
    </div>
  );
}

export default EventDetails;
