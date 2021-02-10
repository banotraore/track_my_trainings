// Dynamically switch to the default base url based on the environnement
const prod = {
  url: {
    API_URL: "https://trackmytrainings.herokuapp.com/api/v1",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:3000/api/v1",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

// styles for react-select
export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "green" : "blue",
  }),

  control: (styles) => ({ ...styles, backgroundColor: "white" }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(2[0-9]{3}) (0[0-9]|1[0-9]|2[0123])\:([012345][0-9])$/;

export const API_WS_ROOT = `${process.env.REACT_APP_ACTION_CABLE}`;
