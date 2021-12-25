import PropTypes from "prop-types";
import React, { useState } from "react";

import CheckInput from "../CheckInput/CheckInput";
import TextInput from "../TextInput/TextInput";

const LabelAddressForm = ({ form, handleChange }) => {
  return (
    form && (
      <div data-testid="LabelAddressForm">
        <CheckInput
          name="use_devonwick"
          value={form.use_devonwick_address}
          label="Use Devonwick Address"
          handleChange={handleChange}
        />
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
