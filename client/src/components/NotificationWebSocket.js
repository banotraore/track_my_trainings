import React, { useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
const NotificationWebSocket = (props) => {
  const { user } = useContext(LoginContext);

  useEffect(() => {
    props.cableApp.notification = props.cableApp.cable.subscriptions.create(
      {
        channel: "NotificationChannel",
        id: user.id,
      },
      {
        received: (data) => {
          props.setNotifications((prevState) => [...prevState, data]);
        },
      }
    );
  }, []);

  return <div></div>;
};

export default NotificationWebSocket;
