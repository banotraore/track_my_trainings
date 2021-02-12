import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios
      .get("teams")
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    toggleModalSearch
  };

  return (
    <SidebarAndHeaderContext.Provider value={value}>{children}</SidebarAndHeaderContext.Provider>
  );
};

export default SidebarAndHeaderContextProvider;
