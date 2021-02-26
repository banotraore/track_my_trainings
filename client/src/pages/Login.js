import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();

function Login() {
  const { user, dispatch } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    if (user.isLogged) {
      // if the user is already logged redirect it/her to the homepage
      history.push("/");
    }
  }, [user]);
  const Url = {
    login: "auth/sign_in",
  };

  function postLogin(e) {
    axios
      .post(Url.login, e)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: "IS_LOGGED",
          user: {
            isLogged: true,
            id: response.data.data.id,
          },
        });
        toast.success("Connected", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      })
      .catch((e) => {
        // console.log(e);
        // console.log(e.response);
        e.response.data.errors.forEach((element) => {
          toast.error(element, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        });
      });
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Required"),

        password: Yup.string().max(50).required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          postLogin(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Container style={{ marginTop: "15px", marginBottom: "15px" }}>
          <Row style={{ justifyContent: "center", textAlign: "center" }}>
            <Col>
              <Card style={{ margin: "30px" }}>
                <CardBody>
                  <CardTitle tag="h4">
                    If{" "}
                    <strong className="mb-2 text-warning">
                      you're a coach,{" "}
                    </strong>
                    try these credentials.{" "}
                    <strong className="mb-2 text-warning">
                      email: zizou@trackmytrainings.com, password: password{" "}
                    </strong>
                  </CardTitle>
                </CardBody>
                <CardBody>
                  <CardTitle tag="h4">
                    If{" "}
                    <strong className="mb-2 text-info">
                      you're an athlete,{" "}
                    </strong>
                    try these credentials.{" "}
                    <strong className="mb-2 text-info">
                      email: johndoe@trackmytrainings.com, password: password{" "}
                    </strong>
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Card style={{ margin: "30px" }}>
                  <CardBody>
                    <Row>
                      <Col xs={4}>
                        <CardTitle tag="h5">Connexion</CardTitle>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="email"
                      />

                      <ErrorMessage
                        name={"email"}
                        component="div"
                        className="field-error"
                        style={{ color: "red" }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Password</Label>

                      <Input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="password"
                      />
                      <ErrorMessage
                        name={"password"}
                        component="div"
                        className="field-error"
                        style={{ color: "red" }}
                      />
                    </FormGroup>

                    <Row
                      style={{
                        marginTop: "25px",
                        marginBottom: "25px",
                      }}
                    >
                      <Col>
                        <Button
                          color="secondary"
                          type="submit"
                          block
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}

export default Login;
