import React, { useState, useRef, useEffect } from "react";
import Dropinput from "./Dropinput";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setGroup, setOrder, setData } from "../state";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [opengroup, setOpengroup] = useState(false);
  const [openorder, setOpenorder] = useState(false);

  const dispatch = useDispatch();

  const grouping = useSelector((state) => state.grouping);
  const ordering = useSelector((state) => state.ordering);
  const data = useSelector((state) => state.data);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current) {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
          setOpengroup(false);
          setOpenorder(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);
  }, []);

  const HandleDispatchGroup = (val) => {
    dispatch(setGroup({ val }));
  };

  const HandleDispatchOrder = (val) => {
    dispatch(setOrder({ val }));
    let userData;
    if (val === "Priority") {
      userData = [...data.tickets].sort((a, b) =>
        a.priority > b.priority ? 1 : -1
      );
    } else {
      userData = [...data.tickets].sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    dispatch(setData({ tickets: userData, user: data.user }));
  };

  const handleclick = () => {
    setOpen(!open);
  };

  const handlegroup = () => {
    if (openorder) setOpenorder(!openorder);
    setOpengroup(!opengroup);
  };

  const handleorder = () => {
    if (opengroup) setOpengroup(!opengroup);
    setOpenorder(!openorder);
  };

  return (
    <div className="navbar" ref={menuRef}>
      <div onClick={handleclick} className="input">
        <Dropinput />
      </div>
      <div className={`dropdown ${open ? "active" : "inactive"}`}>
        <div className="group">
          <Typography>Grouping</Typography>
          <div className="inputbox" onClick={handlegroup}>
            <div className="boxinputgroup">
              <Typography>Group</Typography>
              <KeyboardArrowRightIcon />
            </div>
            <div className={`groupdrop ${opengroup ? "active" : "inactive"}`}>
              <div className="list">
                <div
                  className="listitem"
                  onClick={() => HandleDispatchGroup("Status")}
                >
                  Status
                </div>
                <div
                  className="listitem"
                  onClick={() => HandleDispatchGroup("User")}
                >
                  User
                </div>
                <div
                  className="listitem"
                  onClick={() => HandleDispatchGroup("Priority")}
                >
                  Priority
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order">
          <Typography>Ordering</Typography>
          <div className="inputbox" onClick={handleorder}>
            <div className="boxinputorder">
              <Typography>Order</Typography>
              <KeyboardArrowRightIcon />
            </div>
            <div className={`orderdrop ${openorder ? "active" : "inactive"}`}>
              <div className="list">
                <div
                  className="listitem"
                  onClick={() => HandleDispatchOrder("Title")}
                >
                  Title
                </div>
                <div
                  className="listitem"
                  onClick={() => HandleDispatchOrder("Priority")}
                >
                  Priority
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
