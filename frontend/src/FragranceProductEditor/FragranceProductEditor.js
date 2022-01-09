import { Formik } from "formik";
import PropTypes from "prop-types";
import { useContext } from "react";

import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import { store } from "../StateProvider";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";

import { useParams } from "react-router-dom";
import { convertObjectNullValuesToStr } from "../utility";

const FragranceProductEditor = ({
  wrapperClass,
  onFormUpdate,
  fragranceId,
  product,
}) => {
  const globalState = useContext(store);

  return (
    <div data-testid="FragranceProductEditor" className={wrapperClass}>
      <div className="card">
        <Formik
          enableReinitialize={true}
          initialValues={convertObjectNullValuesToStr(product)}
          validate={(values) => {
            let errors = [];
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            const url = values.id
              ? `/api/v1/fragrances/${fragranceId}/products/${values.id}`
              : `/api/v1/fragrances/${fragranceId}/products`;
            const method = values.id ? "PUT" : "POST";

            fetch(url, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            }).then((response) => setSubmitting(false), onFormUpdate());
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
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <TextInput
                  label="Product Name"
                  value={values.name}
                  name="name"
                  handleChange={handleChange}
                />
                <TextInput
                  label="Customer Facing Name"
                  value={values.custom_name}
                  name="custom_name"
                  handleChange={handleChange}
                />
                <TextInput
                  label="Mass"
                  value={values.mass}
                  name="mass"
                  handleChange={handleChange}
                />

                <TextAreaInput
                  name="description"
                  value={values.description}
                  handleChange={handleChange}
                  label="Description"
                />
                <IterableOptions
                  title="Pictograms"
                  options={[
                    {
                      name: "pictograms",
                      value: "danger",
                      type: "checkbox",
                      checked: values.pictograms.includes("danger"),
                      handleChange: handleChange,
                      icon: <PictogramDisplay images={["danger"]} />,
                    },
                    {
                      name: "pictograms",
                      value: "fire",
                      type: "checkbox",
                      checked: values.pictograms.includes("fire"),
                      handleChange: handleChange,
                      icon: <PictogramDisplay images={["fire"]} />,
                    },
                    {
                      name: "pictograms",
                      value: "fish",
                      type: "checkbox",
                      checked: values.pictograms.includes("fish"),
                      handleChange: handleChange,
                      icon: <PictogramDisplay images={["fish"]} />,
                    },
                  ]}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Update Fragrance Product Details
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

FragranceProductEditor.prototype = {
  product: PropTypes.object,
};

export default FragranceProductEditor;
