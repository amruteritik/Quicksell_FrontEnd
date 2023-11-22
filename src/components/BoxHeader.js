import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const BoxHeader = (props) => {
  return (
    <div className="boxHeader">
      <CircleOutlinedIcon />
      <div className="headerName">
        {props.head[0]}
        <span>{props.count}</span>
      </div>
      <AddIcon />
      <MoreHorizIcon />
    </div>
  );
};

export default BoxHeader;
