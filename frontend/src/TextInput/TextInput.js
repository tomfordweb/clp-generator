import React, { useState } from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, name, type, handleChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        data-testid={"form-control-" + name}
        onChange={(e) => handleChange(name, e.target.value)}
        name={name}
        id={name}
        type={type}
      />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "number"]),
};

TextInput.defaultProps = {
  name: null,
  value: "",
  handleChange: () => {},
  type: "text",
  label: null,
};

export default TextInput;
