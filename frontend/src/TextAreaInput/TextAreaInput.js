import PropTypes from "prop-types";
import React from "react";

const TextAreaInput = ({ name, value, handleChange, height, label }) => (
  <div className="mb-3">
    <label className="form-label" htmlFor={name}>
      {label}
    </label>
    <textarea
      id={name}
      defaultValue={value}
      onChange={(e) =>
        console.log({
          name: name,
          value: e.target.value,
        })
      }
      style={{ minHeight: height }}
      className="form-control"
    ></textarea>
  </div>
);

TextAreaInput.propTypes = {
  height: PropTypes.string,
};

TextAreaInput.defaultProps = {
  height: "200px",
  handleChange: () => {},
};

export default TextAreaInput;
