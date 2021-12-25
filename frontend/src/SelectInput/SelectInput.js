import PropTypes from "prop-types";
import React from "react";

const SelectInput = ({ name, value, handleChange, label, options }) => (
  <div className="mb-3" data-testid="SelectInput">
    <label htmlFor={name}>{label}</label>
    <select
      className="form-select"
      defaultValue={value}
      onChange={handleChange}
    >
      <option value={null}>Select</option>
      {options &&
        options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      key: PropTypes.number,
      label: PropTypes.string,
    })
  ),
};

SelectInput.defaultProps = {};

export default SelectInput;
