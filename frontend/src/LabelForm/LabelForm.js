import { Formik } from "formik";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import CheckInput from "../CheckInput/CheckInput";
import IterableOptions from "../IterableOptions/IterableOptions";
import SelectInput from "../SelectInput/SelectInput";
import { store } from "../StateProvider";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";
import {
  convertObjectNullValuesToStr,
  fetchFragranceProductList,
} from "../utility";

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
  alternate_title: "",
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
          initialValues={convertObjectNullValuesToStr(state.form)}
          validate={(values) => {
            const errors = {};
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
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextAreaInput
                name="alternate_title"
                value={values.alternate_title}
                handleChange={handleChange}
                height="50px"
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

              <TextAreaInput
                name="custom_text"
                value={values.custom_text}
                handleChange={handleChange}
                label="Custom Text"
                height="50px"
              />
              <div className="d-flex justify-content-between">
                <h2>Address Information</h2>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setFieldValue("business_name", " ");
                    setFieldValue("business_address_1", " ");
                    setFieldValue("business_address_2", " ");
                    setFieldValue("business_telephone", " ");
                  }}
                >
                  Clear Address Fields
                </button>
              </div>
              <TextInput
                name="business_name"
                value={values.business_name}
                handleChange={handleChange}
                label="Business Name"
              />
              <TextInput
                name="business_address_1"
                value={values.business_address_1}
                handleChange={handleChange}
                label="Address Line 1"
              />
              <TextInput
                name="business_address_2"
                value={values.business_address_2}
                handleChange={handleChange}
                label="Address Line 2"
              />
              <TextInput
                name="business_telephone"
                value={values.business_telephone}
                handleChange={handleChange}
                label="Business Telephone"
              />
              <h2>Layout Options</h2>
              <div className="row">
                <div className="col-12 col-sm-6">
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
                </div>
                <div className="col-12 col-sm-6">
                  <TextInput
                    name="titleFontSize"
                    value={values.titleFontSize}
                    handleChange={handleChange}
                    error={errors && errors.batch}
                    label="Title Font Size"
                    type="number"
                  />
                  <TextInput
                    name="titlePaddingTop"
                    value={values.titlePaddingTop}
                    handleChange={handleChange}
                    error={errors && errors.batch}
                    label="Title Top Padding"
                    type="number"
                  />
                  <TextInput
                    name="warningTextFontSize"
                    value={values.warningTextFontSize}
                    handleChange={handleChange}
                    error={errors && errors.batch}
                    label="Product Warning Text Font Size"
                    type="number"
                  />
                  <TextInput
                    name="textFontSize"
                    value={values.textFontSize}
                    handleChange={handleChange}
                    error={errors && errors.batch}
                    label="Regular text font size"
                    type="number"
                  />
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary" type="submit">
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
