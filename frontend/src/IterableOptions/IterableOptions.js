import "./IterableOptions.scss";

import PropTypes from "prop-types";
import React from "react";

import CheckInput from "../CheckInput/CheckInput";

const IterableOptions = ({ title, options, handleChange }) => {
  const radioHtml = options.map((option, i) => {
    return (
      <div className="IterableOptions" key={i}>
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
        <br />
        {option.icon}
        <span>{option.label}</span>
      </div>
    );
  });

  return (
    <div data-testid="RadioOptions" className="IterableOptions">
      <h3 className="title">{title}</h3>
      {radioHtml}
    </div>
  );
};

IterableOptions.propTypes = {};

IterableOptions.defaultProps = {};

export default IterableOptions;
