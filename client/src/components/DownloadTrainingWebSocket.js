import React, { useEffect } from "react";

const DownloadTrainingWebSocket = (props) => {
  useEffect(() => {
    // the subscriptions.create() method is sending params to the subscribed action in my ExportChannel
    // to be sure that the event is only download once. right after the download the user socket is unsubscribe.
    // Subscriptions are only created when the training id changed
    props.cableApp.export = props.cableApp.cable.subscriptions.create(
      {
        channel: "ExportChannel",
        training_id: props.training_id,
      },
      {
        received: (data) => {
          // get the data from actioncable and create the calendar event
          const url = window.URL.createObjectURL(new Blob([data.training]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data.filename);
          document.body.appendChild(link);
          link.click();

          // then unsubscribe to insure that the calendar is download only once
          props.cableApp.export.unsubscribe();
        },
      }
    );
  }, [props.training_id]);

  return <div></div>;
};

export default DownloadTrainingWebSocket;
