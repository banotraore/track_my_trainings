import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "./LoginContext";

export const SidebarAndHeaderContext = createContext();

const SidebarAndHeaderContextProvider = ({ children }) => {
  const [sidebarOpened, setsidebarOpened] = useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const [teams, setTeams] = useState([]);
  const [modalSearch, setmodalSearch] = useState(false);
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  const { user } = useContext(LoginContext);

  useEffect(() => {
    if (user.isLogged) {
      axios
        .get("teams")
        .then((response) => {
          setTeams(response.data.teams);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const value = {
    sidebarOpened,
    setsidebarOpened,
    toggleSidebar,
    teams,
    modalSearch,
    toggleModalSearch,
  };

  return (
    <SidebarAndHeaderContext.Provider value={value}>
      {children}
    </SidebarAndHeaderContext.Provider>
  );
};

export default SidebarAndHeaderContextProvider;
