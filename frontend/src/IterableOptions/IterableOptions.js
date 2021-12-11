import React from "react";
import PropTypes from "prop-types";

const IterableOptions = ({ options, handleChange }) => {
  const radioHtml = options.map((option, i) => {
    return (
      <div className="RadioOptions" key={i}>
        <label htmlFor={option.name}>
          <input
            checked={option.checked}
            onChange={(e) => handleChange(option.name, option.value)}
            type={option.type}
            id={option.name}
            name={option.name}
          />
          <br />
          {option.icon}
          {option.label}
        </label>
      </div>
    );
  });

  return <div data-testid="RadioOptions">{radioHtml}</div>;
};

IterableOptions.propTypes = {};

IterableOptions.defaultProps = {};

export default IterableOptions;
