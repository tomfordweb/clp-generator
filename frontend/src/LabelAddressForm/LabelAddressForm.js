import PropTypes from "prop-types";
import React, { useState } from "react";

import CheckInput from "../CheckInput/CheckInput";
import TextInput from "../TextInput/TextInput";

const LabelAddressForm = ({
  form,
  defaultValues,
  handleChange,
  handleFormChange,
}) => {
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const changeAddress = (useDefault) => {
    setUseDefaultAddress(useDefault);
    let addressData;
    if (useDefault) {
      addressData = {
        business_name: defaultValues.business_name,
        business_address_1: defaultValues.business_address_1,
        business_address_2: defaultValues.business_address_2,
        business_telephone: defaultValues.business_telephone,
      };
    } else {
      addressData = {
        business_name: "",
        business_address_1: "",
        business_address_2: "",
        business_telephone: "",
      };
    }

    console.log(addressData);

    handleFormChange(addressData);
  };
  return (
    <div data-testid="LabelAddressForm">
      <CheckInput
        name="use_devonwick"
        value={useDefaultAddress}
        checked={useDefaultAddress}
        label="Use Devonwick Address"
        handleChange={(e) => changeAddress(e.checked)}
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
  );
};

LabelAddressForm.propTypes = {
  handleChange: PropTypes.func,
};

LabelAddressForm.defaultProps = {
  handleChange: () => {},
};

export default LabelAddressForm;
