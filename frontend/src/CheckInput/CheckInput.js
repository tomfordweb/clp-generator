const CheckInput = ({ type, label, value, name, checked, handleChange }) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type={type}
      checked={checked}
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

export default CheckInput;
