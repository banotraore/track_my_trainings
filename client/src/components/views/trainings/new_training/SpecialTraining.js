import React from "react";

import Datetime from "react-datetime";
import { useFormik, FormikProvider, FieldArray, ErrorMessage } from "formik";

import * as Yup from "yup";
import axios from "axios";
import {
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Button,
  Input,
} from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { customStyles, dateRegex } from "../../../../utils/Constants";

toast.configure();

const SpecialTraining = (props) => {
  const data = props.newTraining;
  const disciplines = data.disciplines;
  const athletes = props.athletes;

  const createNewTraining = (values) => {
    axios
      .post(`multiple-trainings`, { training: values })
      .then((response) => {
        formik.resetForm();

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // add the new training to the general calendar
        // but the training discipline are not display without reloading the page
        data.updateCalendar((prevState) => [
          ...prevState,
          { ...response.data.training },
        ]);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        toast.error("error", {
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      trainable_type: "Athlete",
      trainable_id: [""],
      date: data.date,
      description: "",
      on_spikes: false,
      training_disciplines_attributes: [
        {
          sets_num: 1,
          reps_num: 1,
          exercice_order: 0,
          disciplinable_type: "",
          disciplinable_id: "",
        },
      ],
    },
    validationSchema: Yup.object({
      trainable_id: Yup.array()
        .min(1, "Pick at least 1 athlete")
        .of(
          Yup.string()
            .oneOf(
              athletes.map((item) => item.id),
              "Unvalid athlete"
            )
            .required("Required")
        ),
      date: Yup.string().matches(dateRegex).required("Required"),
      on_spikes: Yup.boolean().oneOf([true, false], "True or false only"),
      description: Yup.string()
        .min(10, "min 10 letters")
        .max(1000, "max 1000 letters"),
      training_disciplines_attributes: Yup.array().of(
        Yup.object().shape({
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
          exercice_order: Yup.number()
            .min(0, "Minimum 0")
            .max(50, "max 50")
            .integer(),

          disciplinable_id: Yup.string()
            .oneOf(
              disciplines.map((item) => item.disciplinable_id),
              "type non valide"
            )
            .required("Required"),
          disciplinable_type: Yup.string()
            .oneOf(
              disciplines.map((item) => item.disciplinable_type),
              "type non valide"
            )
            .required("Required"),
        })
      ),
    }),

    onSubmit: (values) => {
      setTimeout(() => {
        createNewTraining(values);
        // alert(JSON.stringify(values, null, 2));
        formik.setSubmitting(false);
      }, 400);
    },
  });
  console.log("formik values", formik.values && formik.values);

  return (
    <FormikProvider value={formik}>
      <CardBody tag={Form} onSubmit={formik.handleSubmit}>
        <Row form>
          <Col>
            <FormGroup>
              <Label for="start_time_from" className="form-label">
                Start Date{" "}
              </Label>
             
              <Datetime
                value={formik.values.date}
                dateFormat="DD/MM/YYYY"
                timeFormat="HH:mm"
                timeConstraints={{ minutes: { step: 15 } }}
                utc={true}
                onChange={(dateFromValue) => {
                  formik.setFieldValue(
                    "date",
                    dateFromValue.format("DD/MM/YYYY HH:mm")
                  );
                }}
                inputProps={{
                  className: "form-control form-control-sm",
                  placeholder: formik.values.date,
                  id: "schedule-start-date",
                  readOnly: true,
                }}
              />
              <ErrorMessage
                name={"date"}
                component="div"
                className="field-error"
                style={{ color: "red" }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="trainable_id" className="form-label">
                Athletes
              </Label>

              <Select
                styles={customStyles}
                onChange={(option) => {
                  formik.setFieldValue(
                    "trainable_id",
                    option.map((item) => item.id)
                  );
                }}
                isMulti
                instanceId="sortBySelect"
                options={athletes}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option}
              />
            </FormGroup>

            <ErrorMessage
              name={"trainable_id"}
              component="div"
              className="field-error"
              style={{ color: "red" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check>
              <Label check>
                <Input
                  name="on_spikes"
                  type="checkbox"
                  onChange={formik.handleChange}
                  checked={formik.values.on_spikes}
                />
                On Spikes
              </Label>
            </FormGroup>

            <ErrorMessage
              name={"on_spikes"}
              component="div"
              className="field-error"
              style={{ color: "red" }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="inddescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </FormGroup>
            <ErrorMessage
              name={"description"}
              component="div"
              className="field-error"
              style={{ color: "red" }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FieldArray name="training_disciplines_attributes">
              {({ remove, push }) => (
                <>
                  {formik.values.training_disciplines_attributes.length > 0 &&
                    formik.values.training_disciplines_attributes.map(
                      (training_discipline, index) => (
                        <Row key={index}>
                          <Col>
                            <FormGroup>
                              <Label for="sets_num">Set nums</Label>
                              <Input
                                onChange={formik.handleChange}
                                type="number"
                                min="1"
                                name={`training_disciplines_attributes.${index}.sets_num`}
                                value={training_discipline.sets_num}
                                id={`sets_num${training_discipline.id}`}
                              />
                            </FormGroup>
                            <ErrorMessage
                              name={`training_disciplines_attributes.${index}.sets_num`}
                              component="div"
                              className="field-error"
                            />
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label for="reps_num">Rep nums</Label>
                              <Input
                                onChange={formik.handleChange}
                                type="number"
                                min="1"
                                name={`training_disciplines_attributes.${index}.reps_num`}
                                value={training_discipline.reps_num}
                                id={`reps_num${training_discipline.id}`}
                              />
                            </FormGroup>
                            <ErrorMessage
                              name={`training_disciplines_attributes.${index}.reps_num`}
                              component="div"
                              className="field-error"
                            />
                          </Col>

                          <Col>
                            <FormGroup>
                              <Label for="disciplines" className="form-label">
                                Discipline
                              </Label>
                              <Select
                                styles={customStyles}
                                onChange={(option) => {
                                  formik.setFieldValue(
                                    `training_disciplines_attributes.${index}.disciplinable_id`,
                                    option.disciplinable_id
                                  );
                                  formik.setFieldValue(
                                    `training_disciplines_attributes.${index}.disciplinable_type`,
                                    option.disciplinable_type
                                  );
                                  // set up the exercice order
                                  formik.setFieldValue(
                                    `training_disciplines_attributes.${index}.exercice_order`,
                                    index
                                  );
                                }}
                                instanceId="sortBySelect"
                                options={disciplines}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option}
                              />
                            </FormGroup>
                            {/* <ErrorMessage
                                name={`training_disciplines_attributes.${index}.disciplinable_type`}
                                component="div"
                                className="field-error"
                              /> */}

                            <ErrorMessage
                              name={`training_disciplines_attributes.${index}.disciplinable_id`}
                              component="div"
                              className="field-error"
                              style={{ color: "red" }}
                            />
                          </Col>

                          <Col xs="1" md="1" lg="1" style={{ margin: "auto" }}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="lg"
                              onClick={() => remove(index)}
                            />
                          </Col>
                        </Row>
                      )
                    )}

                  <Button
                    type="button"
                    onClick={() =>
                      push({
                        disciplinable_type: "",
                        disciplinable_id: "",
                        sets_num: 1,
                        reps_num: 1,
                      })
                    }
                  >
                    Add a discipline
                  </Button>
                </>
              )}
            </FieldArray>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button
              color="secondary"
              size="lg"
              type="submit"
              block
              disabled={formik.isSubmitting}
            >
              Create
            </Button>
          </Col>
        </Row>
      </CardBody>
    </FormikProvider>
  );
};

export default SpecialTraining;
