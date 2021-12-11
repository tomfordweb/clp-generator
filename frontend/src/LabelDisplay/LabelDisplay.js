import React from "react";
import PropTypes from "prop-types";
import "./LabelDisplay.scss";
import caution from "../images/caution.png";

const LabelDisplay = ({ form }) => (
  <div className={"LabelDisplay " + form.labelStyle}>
    <p className="fragrance-name">{form.fragrance}</p>
    <img className="caution" className="caution" src={caution} />
    <p className="warning-text">
      Harmful to aquatic life with long lasting effects. Keep out of reach of
      children. Dispose of contents/container to approved disposal site in
      accordance with local regulations. Contains Iso E-Super, Coumarin,
      Linalool, Linalyl acetate, d-Limonene, omega-Pentadecalactone. May produce
      an allergic reaction.
    </p>
    <p className="batch">
      <strong>BN:</strong>
      {form.batch}
    </p>
    <p className="ufi">
      <strong>UFI:</strong>
      {form.ufi}
    </p>
    <div>
      <p className="business-name mb-0">{form.business_name}</p>
      <p className="business-address mb-0">{form.business_address}</p>
      <p className="business-telephone mb-0">{form.business_telephone}</p>
      <p className="product-weight mb-0">~{form.mass}g Net</p>
    </div>
  </div>
);

LabelDisplay.propTypes = {
  form: PropTypes.object,
};

LabelDisplay.defaultProps = {
  form: {},
};

export default LabelDisplay;
