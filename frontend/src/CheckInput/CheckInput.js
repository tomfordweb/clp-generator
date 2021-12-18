import PropTypes from "prop-types";
const CheckInput = ({ type, label, value, name, checked, handleChange }) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type={type}
      defaultChecked={checked}
      onChange={(e) =>
        handleChange({
          name: name,
          value: value || e.target.checked,
          checked: e.target.checked,
        })
      }
      name={name}
      id={name}
    />
    <label className="form-check-label" htmlFor={name}>
      {label}
    </label>
  </div>
);

CheckInput.prototypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.oneOf(["radio", "checkbox"]),
};
CheckInput.defaultProps = {
  type: "checkbox",
  checked: false,
};

export default CheckInput;
