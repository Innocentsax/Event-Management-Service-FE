import React, { useEffect, useState } from "react";
import "./HeroSection.css";
// import Search from "./Search.css";

const HeroSection = () => {
  const textArray = ["Connect to all the events happening around you."];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const typeText = () => {
      if (index <= textArray[0].length) {
        setText(textArray[0].substring(0, index));
        setIndex((prevIndex) => prevIndex + 1);
      }
      if (index === textArray[0].length) {
        setShowButton(true);
      }
    };

    const typingInterval = setInterval(typeText, 100); // Typing speed (100ms per character)

    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <div className="hero-wrapper">
      <div className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>{text}</h1>
            {showButton && (
              <button className="explore-btn">
                Explore More <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
