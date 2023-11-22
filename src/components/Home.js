import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setView, setHead } from "../state";
import BoxHeader from "./BoxHeader";
import Card from "./Card";
import { group_by_priority, group_by_status, group_by_user } from "./group";

const Home = () => {
  const dispatch = useDispatch();
  const grouping = useSelector((state) => state.grouping);
  const ordering = useSelector((state) => state.ordering);
  const data = useSelector((state) => state.data);
  const view = useSelector((state) => state.view);
  const head = useSelector((state) => state.head);

  useEffect(() => {
    PatchUser();
  }, []);

  useEffect(() => {
    if (data != {}) {
      if (ordering === "Priority") {
        const transformed = Object.values(
          data.tickets.reduce(
            (map, item) => ({
              ...map,
              [item.priority]: [...(map[item.priority] || []), item],
            }),
            {}
          )
        ).map((list) => list.map((item) => item));
        const priority_array = [].concat(...transformed);
        dispatch(setData({ tickets: priority_array, user: data.user }));
      } else {
        const transformed = Object.values(
          data.tickets.reduce(
            (map, item) => ({
              ...map,
              [item.title]: [...(map[item.title] || []), item],
            }),
            {}
          )
        ).map((list) => list.map((item) => item));
        const title_array = [].concat(...transformed);
        dispatch(setData({ tickets: title_array, user: data.user }));
      }

      if (grouping === "Status") {
        dispatch(setHead({ head: group_by_status }));
        const transformed = Object.values(
          data.tickets.reduce(
            (map, item) => ({
              ...map,
              [item.status]: [...(map[item.status] || []), item],
            }),
            {}
          )
        ).map((list) => list.map((item) => item));
        let status = [];
        group_by_status.map((st) => {
          transformed.map((tr) => {
            if (tr[0].status === st[1]) status.push(tr);
          });
        });
        dispatch(setView({ view: status }));
      } else if (grouping === "User") {
        dispatch(setHead({ head: group_by_user }));
        const transformed = Object.values(
          data.tickets.reduce(
            (map, item) => ({
              ...map,
              [item.userId]: [...(map[item.userId] || []), item],
            }),
            {}
          )
        ).map((list) => list.map((item) => item));
        let User = [];
        group_by_user.map((ur) => {
          transformed.map((tr) => {
            if (tr[0].userId === ur[1]) User.push(tr);
          });
        });
        dispatch(setView({ view: User }));
      } else {
        dispatch(setHead({ head: group_by_priority }));
        const transformed = Object.values(
          data.tickets.reduce(
            (map, item) => ({
              ...map,
              [item.priority]: [...(map[item.priority] || []), item],
            }),
            {}
          )
        ).map((list) => list.map((item) => item));
        let Priority = [];
        group_by_priority.map((pr) => {
          transformed.map((tr) => {
            if (tr[0].priority === pr[1]) Priority.push(tr);
          });
        });
        dispatch(setView({ view: Priority }));
      }
    }
  }, [ordering, grouping]);

  const PatchUser = () => {
    try {
      fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then((res) => res.json())
        .then((data) => {
          let userData;
          if (ordering === "Priority") {
            userData = [...data.tickets].sort((a, b) =>
              a.priority > b.priority ? 1 : -1
            );
          } else {
            userData = [...data.tickets].sort((a, b) =>
              a.title > b.title ? 1 : -1
            );
          }
          if (grouping === "Status") {
            dispatch(setHead({ head: group_by_status }));
            const transformed = Object.values(
              userData.reduce(
                (map, item) => ({
                  ...map,
                  [item.status]: [...(map[item.status] || []), item],
                }),
                {}
              )
            ).map((list) => list.map((item) => item));
            dispatch(setView({ view: transformed }));
          }

          dispatch(setData({ tickets: userData, user: data.users }));
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homeBox">
      {head.map((heading, indHead) => (
        <div key={indHead} className="userBox">
          <BoxHeader
            head={heading}
            count={indHead < view.length ? view[indHead].length : 0}
          />
          {indHead < view.length
            ? view[indHead].map((viewing, indView) => (
                <Card key={indView} view={viewing} />
              ))
            : null}
        </div>
      ))}
    </div>
  );
};

export default Home;
