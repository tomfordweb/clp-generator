import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ value, label, name, type, handleChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        value={value}
        className="form-control"
        data-testid={"form-control-" + name}
        onChange={handleChange}
        name={name}
        id={name}
        type={type}
      />
    </div>
  );
};
// onChange={(e) =>
//   handleChange({
//     name: name,
//     value: e.target.value,
//     type: type,
//   })
// }

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
