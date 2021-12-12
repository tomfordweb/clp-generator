import React from "react";
import PropTypes from "prop-types";
import "./IterableOptions.scss";

const IterableOptions = ({ title, options, handleChange }) => {
  const radioHtml = options.map((option, i) => {
    return (
      <div className="IterableOption" key={i}>
        <label htmlFor={option.name}>
          <input
            checked={option.checked}
            onChange={(e) =>
              handleChange({
                type: option.type,
                name: option.name,
                value: option.value,
                checked: e.target.checked,
              })
            }
            type={option.type}
            id={option.name}
            name={option.name}
          />
          <br />
          {option.icon}
          <span>{option.label}</span>
        </label>
      </div>
    );
  });

  return (
    <div data-testid="RadioOptions" className="IterableOptions form-control">
      <h3 className="title">{title}</h3>
      {radioHtml}
    </div>
  );
};

IterableOptions.propTypes = {};

IterableOptions.defaultProps = {};

export default IterableOptions;
