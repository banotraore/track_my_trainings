import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const NotFound = () => {
  return (
    <Container className="text-center">
      <h1 className="h1 mt-0 mb-4 display-1 text-muted mb-5">404</h1>
      <h4 className="h4 mt-0 mb-4 text-muted font-weight-normal mb-7">
        Not found...
      </h4>

      <Link to="/">
        <Button color="secondary ">Home page</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
