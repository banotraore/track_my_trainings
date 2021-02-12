import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Input, ListGroup, ListGroupItem } from "reactstrap";
import { SidebarAndHeaderContext } from "../context/SidebarAndHeaderContext";

const Autocomplete = (props) => {
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = useState(false);
  // What the user has entered
  const [userInput, setUserInput] = useState("");
  const { toggleModalSearch } = useContext(SidebarAndHeaderContext);

  const history = useHistory();

  const onChange = (e) => {
    const { suggestions } = props;
    const userInput = e.currentTarget.value;
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion].name);
      toggleModalSearch();
      history.push(`/teams/${filteredSuggestions[activeSuggestion].slug}`);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions && filteredSuggestions.length) {
      suggestionsListComponent = (
        <ListGroup>
          {filteredSuggestions.map((suggestion, index) => {
            let className = "suggestion";

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }

            return (
              <ListGroupItem
                className={className}
                key={index}
                onClick={onClick}
              >
                {" "}
                {suggestion.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      );
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>Nothing found</em>
        </div>
      );
    }
  }

  return (
    <>
      <Input
        placeholder="LOOKING FOR A TEAM?"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        autoFocus={true}
      />

      {suggestionsListComponent}
    </>
  );
};

export default Autocomplete;
