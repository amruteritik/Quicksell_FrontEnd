import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircleIcon from "@mui/icons-material/Circle";

const Card = (props) => {
  return (
    <div className="boxContent">
      <div className="boxFirst">
        <div className="boxCam">{props.view.id}</div>
        <img
          className="image"
          src={`/images/${props.view.userId}.jpeg`}
          alt="im"
        ></img>
      </div>
      <div className="boxTitle">{props.view.title}</div>
      <div className="icon">
        <div className="iconBox1">
          <MoreHorizIcon />
        </div>
        <div className="iconBox2">
          <CircleIcon />
          <div className="featureContent">Feature Request</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
