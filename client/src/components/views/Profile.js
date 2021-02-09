import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Input,
  Label,
  Button,
  FormGroup,
} from "reactstrap";
import { useFormik, FormikProvider, Form } from "formik";

import * as Yup from "yup";
import Image from "../../assets/track-lanes.jpg";
import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

const Profile = () => {
  const [profileInfos, setProfileInfos] = useState({});

  const bgStyle = {
    backgroundImage: `url(${Image})`,
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  useEffect(() => {
    getProfileInfos();
  }, []);

  const getProfileInfos = () => {
    axios
      .get("my-profile")
      .then((response) => {
        setProfileInfos(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateProfile = (values) => {
    axios
      .patch("auth", values)
      .then((response) => {
        setProfileInfos(response.data.data);

        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      });
  };

  const updatePassword = (values) => {
    axios
      .put("auth/password", values)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });

        passwordFormik.resetForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profileInfos.email,
      first_name: profileInfos.first_name,
      last_name: profileInfos.last_name,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      first_name: Yup.string()
        .min(3, "min 3 letters")
        .max(50, "max 50 letters")
        .required("Required"),
      last_name: Yup.string()
        .min(3, "min 3 letters")
        .max(50, "max 50 letters")
        .required("Required"),
    }),

    onSubmit: (values) => {
      setTimeout(() => {
        updateProfile(values);
        // alert(JSON.stringify(values, null, 2));
        formik.setSubmitting(false);
      }, 400);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "min 6 letters")
        .max(50, "max 50 letters")
        .required("Required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "differents passwords")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setTimeout(() => {
        updatePassword(values);
        // alert(JSON.stringify(values, null, 2));
        passwordFormik.setSubmitting(false);
      }, 400);
    },
  });

  return (
    <div className="content ">
      <Card>
        <CardHeader style={{ padding: 0, marginTop: 10, marginBottom: 10 }}>
          <div
            style={bgStyle}
            className="bg-holder rounded-soft rounded-bottom-0 bg-dark"
          ></div>
        </CardHeader>
      </Card>

      <Row noGutters>
        <Col xs="12" md="8">
          <Card className="mb-3" style={{ height: "100%" }}>
            <CardHeader> Profile </CardHeader>

            <CardBody>
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col lg={6}>
                      <FormGroup>
                        <Label for="first_name" className="form-label">
                          Prénom
                        </Label>
                        <Input
                          name="first_name"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.first_name}
                        />

                        <p style={{ color: "red" }}>
                          {formik.errors.first_name}
                        </p>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <Label for="last_name" className="form-label">
                        Nom de famille
                      </Label>
                      <Input
                        name="last_name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                      />

                      <p style={{ color: "red" }}>{formik.errors.last_name}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label for="email" className="form-label">
                        Email
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />

                      <p style={{ color: "red" }}>{formik.errors.email}</p>
                    </Col>
                  </Row>

                  <Col xs={12} justify="end">
                    <Row>
                      <Col>
                        <Button
                          color="secondary"
                          type="submit"
                          disabled={formik.isSubmitting}
                        >
                          Mettre à jour le profil
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Form>
              </FormikProvider>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="4">
          <Card className="mb-3" style={{ height: "100%" }}>
            <CardHeader> Mis à jour du mot de passe</CardHeader>

            <CardBody className="bg-light">
              <FormikProvider value={passwordFormik}>
                <Form onSubmit={passwordFormik.handleSubmit}>
                  <Row>
                    <Col>
                      <Label for="password" className="form-label">
                        Nouveau mot de passe
                      </Label>
                      <Input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        value={passwordFormik.values.password}
                      />

                      <p style={{ color: "red" }}>
                        {passwordFormik.errors.password}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="password_confirmation" className="form-label">
                        Confirmation du nouveau mot de passe
                      </Label>
                      <Input
                        name="password_confirmation"
                        type="password"
                        className="form-control"
                        onChange={passwordFormik.handleChange}
                        onBlur={passwordFormik.handleBlur}
                        value={passwordFormik.values.password_confirmation}
                      />

                      <p style={{ color: "red" }}>
                        {passwordFormik.errors.password_confirmation}
                      </p>
                    </Col>
                  </Row>
                  <Col xs={12} justify="end">
                    <Button
                      color="secondary"
                      type="submit"
                      block
                      disabled={passwordFormik.isSubmitting}
                    >
                      Mettre à jour le mot de passe
                    </Button>
                  </Col>
                </Form>
              </FormikProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
