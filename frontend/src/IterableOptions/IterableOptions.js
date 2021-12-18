import PropTypes from "prop-types";
import React from "react";

import CheckInput from "../CheckInput/CheckInput";

const IterableOptions = ({ title, options, handleChange }) => {
  const radioHtml = options.map((option, i) => {
    return (
      <div
        className="IterableOption d-flex flex-column align-items-center me-3"
        key={i}
      >
        <CheckInput
          checked={option.checked}
          name={option.name}
          type={option.type}
          value={option.value}
          handleChange={(e) =>
            handleChange({
              type: "checkbox-group",
              name: e.name,
              value: e.value,
              checked: e.checked,
            })
          }
        />
        {option.icon}
        <span>{option.label}</span>
      </div>
    );
  });

  return (
    <div data-testid="IterableOptions" className="IterableOptions">
      <h4 className="title">{title}</h4>
      <div className="d-flex">{radioHtml}</div>
    </div>
  );
};

IterableOptions.propTypes = {
  title: PropTypes.string,
  options: PropTypes.any,
  handleChange: PropTypes.func,
};

IterableOptions.defaultProps = {};

export default IterableOptions;
