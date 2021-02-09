import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Col } from "reactstrap";
import axios from "axios";
import moment from "moment";
import TrainingRecap from "../cards/TrainingRecap";
import NewTrainingModal from "./trainings/NewTrainingModal";

const Calendar = () => {
  const [trainings, setTrainings] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalInfo, setModalInfo] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [newTrainingModal, setNewTrainingModal] = useState(false);
  const toggleNewTrainingModal = () => setNewTrainingModal(!newTrainingModal);
  const [newTrainingDate, setNewTrainingDate] = useState("");

  useEffect(() => {
    getAllTrainings();
  }, []);
  const getAllTrainings = () => {
    const requestOne = axios.get("trainings");
    const requestTwo = axios.get("disciplines");

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          setTrainings(responseOne.data.trainings);
          setDisciplines(responseTwo.data.disciplines);
          setLoading(false);
        })
      )
      .catch((error) => {
        // console.log(error);
        console.log(error.response);
      });
  };
  return (
    <div className="content">
      {!loading ? (
        <>
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
            eventClick={(info) => {
              setModalInfo({
                ...info.event.extendedProps,
                title: info.event.title,
                id: info.event._def.publicId,
              });

              toggle();
            }}
            timeZone="UTC"
            dateClick={(info) => {
              setNewTrainingDate(
                `${moment(info.dateStr).format("DD/MM/YYYY")} 18:00`
              );
              toggleNewTrainingModal();
            }}
          />

          {modalInfo && modalInfo.id && (
            <TrainingRecap
              toggle={toggle}
              className={`training-${modalInfo.id.slice(0, 7)}`}
              modal={modal}
              data={modalInfo}
              disciplines={disciplines}
            />
          )}

          <NewTrainingModal
            date={newTrainingDate}
            toggle={toggleNewTrainingModal}
            className="new-training mb-3"
            modal={newTrainingModal}
            updateCalendar={setTrainings}
            setTrainings={setTrainings}
            disciplines={disciplines}
          />
        </>
      ) : (
        <Col>
          <h2>Loading ...</h2>
        </Col>
      )}
    </div>
  );
};
export default Calendar;
