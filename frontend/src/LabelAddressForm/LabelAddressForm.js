import PropTypes from "prop-types";
import React from "react";

import TextInput from "../TextInput/TextInput";

const LabelAddressForm = ({ form, handleChange }) => {
  return (
    form && (
      <div data-testid="LabelAddressForm">
        <TextInput
          name="business_name"
          value={form.business_name}
          handleChange={handleChange}
          label="Business Name"
        />
        <TextInput
          name="business_address_1"
          value={form.business_address_1}
          handleChange={handleChange}
          label="Address Line 1"
        />
        <TextInput
          name="business_address_2"
          value={form.business_address_2}
          handleChange={handleChange}
          label="Address Line 2"
        />
        <TextInput
          name="business_telephone"
          value={form.business_telephone}
          handleChange={handleChange}
          label="Business Telephone"
        />
      </div>
    )
  );
};

LabelAddressForm.propTypes = {
  handleChange: PropTypes.func,
};

LabelAddressForm.defaultProps = {
  handleChange: () => {},
};

export default LabelAddressForm;
