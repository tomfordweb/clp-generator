import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import CheckInput from "../CheckInput/CheckInput";
import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import SelectInput from "../SelectInput/SelectInput";
import TextInput from "../TextInput/TextInput";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import LabelAddressForm from "../LabelAddressForm/LabelAddressForm";

/**
 * TODO: move to the environment or something
 */
const DEFAULT_BUSINESS_ADDRESS = {
  business_name: "Devonwick",
  business_address_1: "Unit C Armada Point",
  business_address_2: "Estover Trading Estate PL6 7PY",
  business_telephone: "(123) 456-7890",
};
export const DEFAULT_FORM_STATE = {
  labelStyle: "round",
  showBorder: false,
  fragrance: "",
  product: "",
  mass: "",
  pictograms: [],
  display_product: "Display Product Name",
  custom_text: "foo",
  ean: "1234567890",
  ufi: "1234567890",
  batch: "12345",
  ...DEFAULT_BUSINESS_ADDRESS,
};
function LabelForm({ products, propagateFormChange }) {
  const [fragrance, setFragrance] = useState(null);
  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  /**
   * After selecting a product of a specific fragrance
   * We can fill in the label with many fields
   */
  const selectProduct = (productKey) => {
    const product = fragrance.products.filter(
      (product) => parseInt(product.id) === parseInt(productKey)
    )[0];

    if (product) {
      const finalValue = {
        ...form,
        pictograms: product.pictograms,
        fragrance: fragrance.fragrance,
        product: product.name,
        mass: product.mass,
        productText: product.text,
      };

      updateForm(finalValue);
      propagateFormChange(finalValue);
    }
  };

  /**
   * The internal state of the form. This contains the default values
   *
   * Whenever the form is updated we
   * fire a debounced event to propagate the change to the app
   */
  const [form, updateForm] = useState(DEFAULT_FORM_STATE);

  /**
   * Update internal state of form to the value of the changed input
   */
  const handleChange = useCallback(
    ({ value, name, checked, type }) => {
      let returnValue = value;
      if (type === "checkbox-group") {
        if (checked) {
          // Push to the array
          returnValue = [...(form[name] || []), value];
        } else {
          // Remove from the array
          returnValue = (form[name] || []).filter((val) => val !== value);
        }
      }

      const finalValue = {
        ...form,
        [name]: returnValue,
      };

      updateForm(finalValue);
      propagateFormChange(finalValue);
    },
    [form, propagateFormChange]
  );

  const setForm = useCallback(
    (data) => {
      const finalValue = {
        ...form,
        ...data,
      };
      updateForm(finalValue);
      propagateFormChange(finalValue);
    },
    [form, propagateFormChange]
  );
  return (
    <div data-testid="LabelForm">
      <SelectInput
        label="Fragrance"
        value={null}
        name="fragrance"
        options={products.map((product) => ({
          value: product.id,
          label: `${product.supplierName} ${product.fragrance}`,
          key: product.id,
        }))}
        handleChange={(value) =>
          setFragrance(
            products.filter(
              (product) => parseInt(product.id) === parseInt(value)
            )[0]
          )
        }
      />
      <SelectInput
        label="Product"
        value={null}
        name="product"
        options={
          (fragrance &&
            fragrance.products.map((product) => ({
              value: product.id,
              label: product.name,
              key: product.id,
            }))) ||
          []
        }
        handleChange={(value) => selectProduct(value)}
      />
      <IterableOptions
        title="Pictograms"
        handleChange={handleChange}
        options={[
          {
            name: "pictograms",
            value: 1,
            type: "checkbox",
            checked: (form.pictograms && form.pictograms.includes(1)) || false,
            icon: <PictogramDisplay images={[1]} />,
          },
          {
            name: "pictograms",
            value: 2,
            type: "checkbox",
            checked: (form.pictograms && form.pictograms.includes(2)) || false,
            icon: <PictogramDisplay images={[2]} />,
          },
          {
            name: "pictograms",
            value: 3,
            type: "checkbox",
            checked: (form.pictograms && form.pictograms.includes(3)) || false,
            icon: <PictogramDisplay images={[3]} />,
          },
        ]}
      />
      <TextInput
        name="mass"
        value={form.mass}
        handleChange={handleChange}
        label="Mass/Volume"
      />
      <TextAreaInput
        name="custom_text"
        value={form.custom_text}
        handleChange={handleChange}
        label="Custom Text"
        height="50px"
      />

      <div className="row">
        <div className="col-6">
          <TextInput
            name="batch"
            value={form.batch}
            handleChange={handleChange}
            label="Batch#"
          />
        </div>
        <div className="col-6">
          <TextInput
            name="ufi"
            value={form.ufi}
            handleChange={handleChange}
            label="UFI#"
          />
        </div>
      </div>
      <TextInput
        name="ean"
        value={form.ean}
        handleChange={handleChange}
        label="EAN"
      />
      <LabelAddressForm
        form={form}
        handleChange={handleChange}
        defaultValues={DEFAULT_BUSINESS_ADDRESS}
        handleFormChange={setForm}
      />
      <h1>Design Options</h1>
      <IterableOptions
        handleChange={handleChange}
        title="Label Style"
        options={[
          {
            name: "labelStyle",
            value: "square",
            type: "radio",
            checked: form.labelStyle === "square",
            icon: <SquareShapeRadioIcon />,
            label: "Square",
          },
          {
            name: "labelStyle",
            value: "round",
            checked: form.labelStyle === "round",
            type: "radio",
            icon: <CircleShapeRadioIcon />,
            label: "Circle",
          },
        ]}
      />
      <CheckInput
        name="showBorder"
        value={form.showBorder}
        checked={form.showBorder}
        handleChange={(data) =>
          handleChange({ name: "showBorder", value: data.checked })
        }
        label="Show Trim lines"
      />
    </div>
  );
}

LabelForm.prototype = {
  products: PropTypes.arrayOf(PropTypes.any),
};

LabelForm.defaultProps = {
  products: [],
};

export default LabelForm;
