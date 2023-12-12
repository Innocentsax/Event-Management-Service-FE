import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";
import UpcomingEventsSection from "../UpcomingEvents/UpcomingEventsSection";
import EventContainer from "../EventContainer/EventContainer";
import Midd from "../Midd/Midd";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

import React, { useState, useEffect } from "react";
import Search from "./Search";

import axios from "axios";

function SearchAPI() {
  let [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All Category");
  const [searchCriteria, setSearchCriteria] = useState({
    eventTitle: "",
    location: "",
    startDate: "",
  });

  const [page, setPage] = useState(0);

  function splitDescription(description, numSentences) {
    const sentences = description.split(". ");
    const shortenedDescription = sentences.slice(0, numSentences).join(". ");

    if (sentences.length > numSentences) {
      return `${shortenedDescription}...`;
    }

    return shortenedDescription;
  }

  useEffect(() => {
    fetchSearchResults();
  }, [category, searchCriteria, page]);

  const fetchSearchResults = () => {
    setLoading(true);

    axios
      .get("http://localhost:8099/api/v1/event/search", {
        params: {
          ...searchCriteria,
          category: category,
          page: page,
        },
      })
      .then((response) => {
        let res = response.data.content;
        const formattedEventData = res.map((event) => ({
          ...event,
          startDateTime:
            new Date(event.startDateTime).toDateString().split(" ")[1] +
            " " +
            new Date(event.startDateTime).toDateString().split(" ")[2],
          endDateTime: new Date(event.endDateTime).toDateString(),
        }));

        setSearchResults(formattedEventData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <HeroSection />
      <Search
        onSearch={(newSearchCriteria) => {
          setSearchCriteria(newSearchCriteria);
        }}
      />

      <Midd />

      <UpcomingEventsSection category={category} setCategory={setCategory} />

      {loading ? (
        <p className="home-text">Loading...</p>
      ) : (
        <div className="grid-container">
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((result) => (
              <EventContainer
                ID={result.eventId}
                date={result.startDateTime}
                eventName={result.eventTitle}
                description={splitDescription(result.eventDescription, 2)}
                imageUrl={result.banner}
              />
            ))
          ) : (
            <p className="home-text">No search results found.</p>
          )}
        </div>
      )}

      <LoadMoreButton
        onLoadMore={handleLoadMore}
        onPrevPage={handlePrevPage}
        page={page}
      />
    </>
  );
}

export default SearchAPI;