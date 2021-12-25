import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckInput from "../CheckInput/CheckInput";
import IterableOptions from "../IterableOptions/IterableOptions";
import SelectInput from "../SelectInput/SelectInput";
import TextInput from "../TextInput/TextInput";
import { Formik } from "formik";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import LabelAddressForm from "../LabelAddressForm/LabelAddressForm";
import { fetchFragranceProductList } from "../utility";

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
  custom_text: "Follow me on instagram",
  ean: "1234567890",
  ufi: "1234567890",
  batch: "12345",
  ...DEFAULT_BUSINESS_ADDRESS,
};
function LabelForm({ fragrances, propagateFormChange }) {
  const [fragrance, setFragrance] = useState(null);
  const [fragranceProducts, setFragranceProducts] = useState([]);

  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  /**
   * After selecting a product of a specific fragrance
   * We can fill in the label with many fields
   */
  const selectProduct = (product) => {
    console.log(fragrance, product);
    fragrance &&
      product &&
      updateForm({
        ...DEFAULT_FORM_STATE,
        fragrance: fragrance.name,
        pictograms: product.pictograms,
        product: product.name,
        mass: product.mass,
        productText: product.description,
      });
  };

  /**
   * The internal state of the form. This contains the default values
   *
   * Whenever the form is updated we
   * fire a debounced event to propagate the change to the app
   */
  const [form, updateForm] = useState(DEFAULT_FORM_STATE);

  useEffect(() => {
    fragrance &&
      fragrance.id &&
      fetchFragranceProductList(fragrance.id).then((data) => {
        setFragranceProducts(data);
      });
  }, [fragrance]);

  return (
    <div data-testid="LabelForm">
      <SelectInput
        label="Fragrance"
        value={null}
        name="fragrance"
        options={fragrances.map((product) => ({
          value: product.id,
          label: product.supplier
            ? `${product.supplier} ${product.name}`
            : product.name,
          key: product.id,
        }))}
        handleChange={(e) =>
          setFragrance(
            fragrances.filter(
              (product) => parseInt(product.id) === parseInt(e.target.value)
            )[0]
          )
        }
      />
      <SelectInput
        label="Product"
        value={null}
        name="product"
        options={
          (fragranceProducts &&
            fragranceProducts.map((product) => ({
              value: product.id,
              label: product.name,
              key: product.id,
            }))) ||
          []
        }
        handleChange={(e) => {
          selectProduct(
            fragranceProducts.filter(
              (product) => parseInt(product.id) === parseInt(e.target.value)
            )[0]
          );
        }}
      />
      <Formik
        initialValues={form}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("form values", values);
          propagateFormChange({ ...form, values });
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <TextAreaInput
              name="custom_text"
              value={values.custom_text}
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
                  value={values.ufi}
                  handleChange={handleChange}
                  label="UFI#"
                />
              </div>
            </div>
            <TextInput
              name="ean"
              value={values.ean}
              handleChange={handleChange}
              label="EAN"
            />
            <LabelAddressForm form={values} handleChange={handleChange} />
            <IterableOptions
              title="Label Style"
              options={[
                {
                  name: "labelStyle",
                  value: "square",
                  handleChange: handleChange,
                  type: "radio",
                  checked: values.labelStyle === "square",
                  icon: <SquareShapeRadioIcon />,
                  label: "Square",
                },
                {
                  name: "labelStyle",
                  value: "round",
                  handleChange: handleChange,
                  checked: values.labelStyle === "round",
                  type: "radio",
                  icon: <CircleShapeRadioIcon />,
                  label: "Circle",
                },
              ]}
            />
            <CheckInput
              name="showBorder"
              value={values.showBorder}
              checked={values.showBorder}
              handleChange={handleChange}
              label="Show Trim lines"
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <h1>Design Options</h1>
    </div>
  );
}

LabelForm.prototype = {
  fragrances: PropTypes.arrayOf(PropTypes.any),
};

LabelForm.defaultProps = {
  fragrances: [],
};

export default LabelForm;
