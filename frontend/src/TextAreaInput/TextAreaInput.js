import PropTypes from "prop-types";
import React from "react";

const TextAreaInput = ({ name, value, handleChange, height, label }) => (
  <div className="mb-3" data-testid="TextAreaInput">
    <label className="form-label" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      onChange={handleChange}
      defaultValue={value}
      style={{ minHeight: height }}
      className="form-control"
    ></textarea>
  </div>
);

TextAreaInput.propTypes = {
  height: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
};

TextAreaInput.defaultProps = {
  height: "200px",
  label: null,
  name: null,
  value: null,

  handleChange: () => {},
};

export default TextAreaInput;
