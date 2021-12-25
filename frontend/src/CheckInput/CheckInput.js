import PropTypes from "prop-types";
const CheckInput = ({ type, label, value, name, checked, handleChange }) => (
  <div className="form-check" data-testid="CheckInput">
    <input
      className="form-check-input"
      type={type}
      value={value}
      checked={checked}
      onChange={handleChange}
      name={name}
      id={name}
    />
    <label className="form-check-label" htmlFor={name}>
      {label}
    </label>
  </div>
);
// onChange={(e) =>
//   handleChange({
//     name: name,
//     type: type,
//     value: value,
//     checked: type === "radio" ? value : e.target.checked,
//   })
// }

CheckInput.prototypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  type: PropTypes.oneOf(["radio", "checkbox"]),
};
CheckInput.defaultProps = {
  type: "checkbox",
  handleChange: (e) => console.warn("unhandled change event", e),
  checked: false,
};

export default CheckInput;
