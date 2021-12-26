import PropTypes from "prop-types";
import React from "react";

import CheckInput from "../CheckInput/CheckInput";

const IterableOptions = ({ title, options }) => {
  const radioHtml = options.map((option, i) => {
    return (
      <div
        className="IterableOption d-flex flex-column align-items-center me-3"
        key={i}
      >
        <CheckInput
          checked={option.checked}
          handleChange={option.handleChange}
          name={option.name}
          type={option.type}
          value={option.value}
        />
        {option.icon}
        <span>{option.label}</span>
      </div>
    );
  });

  return (
    <div data-testid="IterableOptions" className="IterableOptions mb-3">
      <label>{title}</label>
      <div className="d-flex">{radioHtml}</div>
    </div>
  );
};

IterableOptions.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.any),
  handleChange: PropTypes.func,
};

IterableOptions.defaultProps = {
  handleChange: (e) => console.warn("unhandled change", e),
  options: [],
};

export default IterableOptions;
