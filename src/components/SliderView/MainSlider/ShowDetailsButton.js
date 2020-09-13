import React from "react";
import IconArrowDown from "../Icons/IconArrowDown";
import "./ShowDetailsButton.scss";

const ShowDetailsButton = ({ onClick }) => (
  <button onClick={onClick} className="show-details-button">
    <div className="text-center thumbarrow-sec">
      <img
        src={window.location.origin + "/assets/img/arrow-white.png"}
        className="thumbarrow thumbarrow-white"
      />
      <img
        src={window.location.origin + "/assets/img/arrow-red.png"}
        className="thumbarrow thumbarrow-red"
      />
    </div>

    {/* <span>
      <IconArrowDown />
    </span> */}
  </button>
);

export default ShowDetailsButton;
