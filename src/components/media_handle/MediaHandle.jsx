import React from "react";
import "./media_handle.css";

export const MediaHandle = () => {
  return (
    <div className="handle-cont">
      <div className="handle-sub-cont1">
        <div className="handle-sub-cont1-img">
          <img src="moneybag.svg" alt="moneybag" />
          <span className="eazy">EazyLend</span>
        </div>
        <div className="enquiries">
          <span>For more enquiries:</span>{" "}
          <span className="ml-1">helpsupport@easylend.com</span>
        </div>
      </div>
      <div className="handle-sub-cont2">
        <div>
          <span className="reserved">© 2023 EasyLend. All rights reserved</span>
        </div>
        <div className="handle-sub-cont2-icon">
          <i class="fab fa-instagram"></i>
          <i class="fab fa-twitter-square"></i>
          <i class="fab fa-youtube"></i>
        </div>
      </div>
    </div>
  );
};
