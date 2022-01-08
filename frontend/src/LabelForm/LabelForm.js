import { Formik } from "formik";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import CheckInput from "../CheckInput/CheckInput";
import IterableOptions from "../IterableOptions/IterableOptions";
import LabelAddressForm from "../LabelAddressForm/LabelAddressForm";
import SelectInput from "../SelectInput/SelectInput";
import { store } from "../StateProvider";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";
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
  custom_title: "",
  custom_text: "Follow us on Instagram @devonwickcandles",
  ean: "5056496100170",
  ufi: "",
  batch: "",
  ...DEFAULT_BUSINESS_ADDRESS,
};
function LabelForm({ fragrances, propagateFormChange }) {
  const [fragrance, setFragrance] = useState(null);
  const [fragranceProducts, setFragranceProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const globalState = useContext(store);

  const { state, dispatch } = globalState;

  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  const productValues = (fragrance, product) => ({
    fragrance: fragrance.name,
    pictograms: product.pictograms,
    product: product.name,
    mass: product.mass || "",
    productText: product.description,
  });

  /**
   * After selecting a product of a specific fragrance
   * We can fill in the label with many fields
   */
  const selectProduct = (inputProduct) =>
    dispatch({
      type: "selectFragranceProductForForm",
      product: inputProduct,
      fragrance: fragrance,
    });

  /**
   * The internal state of the form. This contains the default values
   *
   * Whenever the form is updated we
   * fire a debounced event to propagate the change to the app
   */
  // const [form, updateForm] = useState(DEFAULT_FORM_STATE);

  useEffect(() => {}, []);

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
      {state.form && state.form.product && (
        <Formik
          enableReinitialize={true}
          initialValues={state.form}
          validate={(values) => {
            const errors = {};
            if (!values.ean || values.ean.length < 1) {
              errors.ean = "EAN Required";
            }
            if (
              values &&
              values.ean &&
              (values.ean.length < 12 || values.ean.length > 13)
            ) {
              errors.ean = "EAN must be 12 or 13 characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch({ type: "updateForm", value: values });
            propagateFormChange(state.form);
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
              <TextInput
                name="custom_title"
                value={values.custom_title}
                handleChange={handleChange}
                label="Custom Fragrance Title"
              />
              <h2>Product Options</h2>
              <div className="row">
                <div className="col-6">
                  <TextInput
                    name="batch"
                    value={values.batch}
                    handleChange={handleChange}
                    error={errors && errors.batch}
                    label="Batch#"
                  />
                </div>
                <div className="col-6">
                  <TextInput
                    name="ufi"
                    value={values.ufi}
                    handleChange={handleChange}
                    error={errors && errors.ufi}
                    label="UFI#"
                  />
                </div>
              </div>
              <TextInput
                name="ean"
                value={values.ean}
                handleChange={handleChange}
                label="EAN"
                error={errors && errors.ean}
              />
              <h2>Design Options</h2>

              <TextInput
                name="fontSize"
                value={values.fontSize}
                handleChange={handleChange}
                error={errors && errors.batch}
                label="Title Font Size"
                type="number"
              />
              <TextAreaInput
                name="custom_text"
                value={values.custom_text}
                handleChange={handleChange}
                label="Custom Text"
                height="50px"
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
              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update Label PDF
                </button>
              </div>
            </form>
          )}
        </Formik>
      )}
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
