import React, { useState } from "react";
import "./LoadMoreButton.css";

function LoadMoreButton({ onLoadMore, onPrevPage, page }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoadMore();
    }, 1500);
  };

  const handlePrevPage = () => {
    onPrevPage();
  };

  return (
    <div className="load-more-container">
      {page > 0 && (
        <button className="prev-page-button" onClick={handlePrevPage}>
          Prev Page
        </button>
      )}
      <button
        className={`load-more-button ${isLoading ? "loading" : ""}`}
        onClick={handleLoadMore}
      >
        {isLoading ? "Loading..." : "Load More Events"}
      </button>
    </div>
  );
}

export default LoadMoreButton;