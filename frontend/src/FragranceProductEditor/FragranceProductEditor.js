import { Formik } from "formik";
import PropTypes from "prop-types";

import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";

const FragranceProductEditor = ({ onFormUpdate, fragranceId, product }) => {
  return (
    <div
      data-testid="FragranceProductEditor"
      style={{ border: "1px solid #ddd" }}
    >
      <Formik
        initialValues={product}
        validate={(values) => {
          let errors = [];
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <TextInput
                label="Product Name"
                value={values.name}
                name="name"
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

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

FragranceProductEditor.prototype = {
  product: PropTypes.object,
};

export default FragranceProductEditor;
