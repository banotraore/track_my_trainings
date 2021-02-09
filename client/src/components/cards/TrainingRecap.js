import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Form,
  Row,
  Col,
} from "reactstrap";
import {
  useFormik,
  Formik,
  FormikProvider,
  Field,
  FieldArray,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";
import { customStyles } from "../../utils/Constants";

import { toast } from "react-toastify";
toast.configure();

const TrainingRecap = (props) => {
  const data = props.data;
  const disciplines = props.disciplines;
  const [trainingEditMode, setTrainingEditMode] = useState(false);

  const updateTraining = () => {
    if (trainingEditMode) {
      setTrainingEditMode(!trainingEditMode);
    } else {
      setTrainingEditMode(!trainingEditMode);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      id: data.id,
      training_disciplines_attributes: data.training_disciplines,
    },

    validationSchema: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        sets_num: Yup.number()
          .min(1, "Minimum 1")
          .max(50, "max 50")
          .integer()
          .required("Required"),
        reps_num: Yup.number()
          .min(1, "Minimum 1")
          .max(50, "max 50")
          .integer()
          .required("Required"),
      })
    ),

    onSubmit: (values) => {
      setTimeout(() => {
        updateTrainingDisciplines(values);
        formik.setSubmitting(false);
      }, 400);
    },
  });
  const updateTrainingDisciplines = (values) => {
    axios
      .patch(`trainings/${data.id}`, values)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error.response.data.exception);
        toast.error(error.response.data.exception, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <Modal
        modalClassName="modal-black"
        isOpen={props.modal}
        toggle={props.toggle}
        size="lg"
        onClosed={() => {
          setTrainingEditMode(false);
        }}
      >
        <ModalHeader toggle={props.toggle}>
          {data.title} {data.facility ? `- ${data.facility}` : null}{" "}
          {data.updatable && trainingEditMode && (
            <>
              <FontAwesomeIcon
                icon={faSave}
                size="2x"
                color="#f5d442"
                onClick={() => {
                  formik.handleSubmit();
                  updateTraining();
                }}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            </>
          )}
          {data.updatable && !trainingEditMode && (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                size="2x"
                color="#f5d442"
                onClick={() => {
                  updateTraining();
                }}
                style={{ marginLeft: 10, marginRight: 10 }}
              />
            </>
          )}
        </ModalHeader>
        {data.on_spikes && (
          <ModalBody style={{ color: "red" }}>
            {data.on_spikes ? "On Spikes" : "On Flat"}
          </ModalBody>
        )}

        {data.description && <ModalBody>{data.description}</ModalBody>}
        <ModalBody>
          <Form>
            <ModalBody>
              <Table>
                {formik.values.training_disciplines_attributes &&
                  formik.values.training_disciplines_attributes.length > 0 && (
                    <thead>
                      <tr>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>discipline</th>
                      </tr>
                    </thead>
                  )}

                <FormikProvider value={formik}>
                  <FieldArray name="values">
                    <tbody>
                      {formik.values.training_disciplines_attributes.length >
                        0 &&
                        formik.values.training_disciplines_attributes.map(
                          (trainingDiscipline, index) =>
                            data.updatable && trainingEditMode ? (
                              <tr key={index}>
                                <td>
                                  <>
                                    <Input
                                      name={`training_disciplines_attributes.${index}.sets_num`}
                                      onChange={formik.handleChange}
                                      type="number"
                                      min="1"
                                      className="form-control"
                                      value={trainingDiscipline.sets_num}
                                    />
                                    <ErrorMessage
                                      name={`training_disciplines_attributes.${index}.sets_num`}
                                      component="div"
                                      className="field-error"
                                      style={{ color: "red" }}
                                    />
                                  </>
                                </td>
                                <td>
                                  <>
                                    <Input
                                      name={`training_disciplines_attributes.${index}.reps_num`}
                                      onChange={formik.handleChange}
                                      type="number"
                                      min="1"
                                      className="form-control"
                                      value={trainingDiscipline.reps_num}
                                    />
                                    <ErrorMessage
                                      name={`training_disciplines_attributes.${index}.reps_num`}
                                      component="div"
                                      className="field-error"
                                      style={{ color: "red" }}
                                    />
                                  </>
                                </td>

                                <td>
                                  <>
                                    <Select
                                      styles={customStyles}
                                      value={disciplines.filter(
                                        (option) =>
                                          option.disciplinable_id ===
                                          trainingDiscipline.disciplinable_id
                                      )}
                                      onChange={(option) => {
                                        formik.setFieldValue(
                                          `training_disciplines_attributes.${index}.disciplinable_id`,
                                          option.disciplinable_id
                                        );
                                        formik.setFieldValue(
                                          `training_disciplines_attributes.${index}.disciplinable_type`,
                                          option.disciplinable_type
                                        );
                                        formik.setFieldValue(
                                          `training_disciplines_attributes.${index}.discipline`,
                                          option.name
                                        );
                                      }}
                                      instanceId="sortBySelect"
                                      options={disciplines}
                                      getOptionLabel={(option) => option.name}
                                      getOptionValue={(option) => option}
                                    />
                                    <ErrorMessage
                                      name={`training_disciplines_attributes.${index}.disciplinable_id`}
                                      component="div"
                                      className="field-error"
                                      style={{ color: "red" }}
                                    />
                                  </>
                                </td>
                              </tr>
                            ) : (
                              <tr key={index}>
                                <td>{trainingDiscipline.sets_num}</td>
                                <td>{trainingDiscipline.reps_num}</td>
                                <td>{trainingDiscipline.discipline}</td>
                              </tr>
                            )
                        )}
                    </tbody>
                  </FieldArray>
                </FormikProvider>
              </Table>
            </ModalBody>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              props.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TrainingRecap;
