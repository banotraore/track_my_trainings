import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Col } from "reactstrap";
import axios from "axios";

const Calendar = () => {
  const [trainings, setTrainings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTrainings();
  }, []);
  const getAllTrainings = () => {
    axios
      .get("trainings")
      .then((response) => {
        console.log(response);
        setTrainings(response.data.trainings);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content">
      {!loading ? (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialView="dayGridMonth"
          editable
          selectable
          events={trainings}
          firstDay={1}
          height="auto"
          // locale="fr"
        />
      ) : (
        <Col>
          <h2>Loading ...</h2>
        </Col>
      )}
    </div>
  );
};
export default Calendar;
