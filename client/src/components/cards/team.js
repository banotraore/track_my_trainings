import React, { useContext } from "react";

import { Media } from "reactstrap";
import { Link } from "react-router-dom";
import Image from "../../assets/running.png";
import { SidebarAndHeaderContext } from "../../context/SidebarAndHeaderContext";

const Team = (props) => {
  const { name, slug } = props;
  const { sidebarOpened, toggleSidebar } = useContext(SidebarAndHeaderContext);

  return (
    <Media className="align-items-center mb-2">
      <img className="mr-2" src={Image} width={50} alt="" />
      <Media body>
        <h6 className="fs-0 mb-0">
          <Link
            style={{ color: "white" }}
            className="stretched-link"
            to={`/teams/${slug}`}
            onClick={() => {
              if (sidebarOpened) {
                toggleSidebar();
              }
            }}
          >
            {name}
          </Link>
        </h6>
      </Media>
    </Media>
  );
};

export default Team;
