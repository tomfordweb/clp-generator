import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";
import PropTypes from "prop-types";
import { Formik } from "formik";

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

          values.pictograms = values.pictograms.filter(
            (v, i, a) => a.indexOf(parseInt(v)) === i
          );

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
                    value: "1",
                    type: "checkbox",
                    checked:
                      values.pictograms.includes("1") ||
                      values.pictograms.includes(1),
                    handleChange: handleChange,
                    icon: <PictogramDisplay images={[1]} />,
                  },
                  {
                    name: "pictograms",
                    value: "2",
                    type: "checkbox",
                    checked:
                      values.pictograms.includes("2") ||
                      values.pictograms.includes(2),
                    handleChange: handleChange,
                    icon: <PictogramDisplay images={[2]} />,
                  },
                  {
                    name: "pictograms",
                    value: "3",
                    type: "checkbox",
                    checked:
                      values.pictograms.includes("3") ||
                      values.pictograms.includes(3),
                    handleChange: handleChange,
                    icon: <PictogramDisplay images={[3]} />,
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
