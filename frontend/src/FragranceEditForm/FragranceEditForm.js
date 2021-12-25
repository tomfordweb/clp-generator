import { Formik } from "formik";

const FragranceEditForm = ({ fragrance, onFormUpdate }) => {
  return (
    <div className="row" data-testid="FragranceEditForm">
      <Formik
        initialValues={fragrance}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const url = values.id
            ? `/api/v1/fragrances/${values.id}`
            : "/api/v1/fragrances";
          const method = values.id ? "PUT" : "POST";
          console.log("submitting values");
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
            <div className="form-group">
              <label htmlFor="supplier">Supplier</label>
              <input
                className="form-control"
                type="text"
                name="supplier"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.supplier}
              />
              {errors.supplier && touched.supplier && errors.supplier}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </div>
            <div className="form-group">
              <label htmlFor="supplier_code">Supplier Code</label>
              <input
                className="form-control"
                type="text"
                name="supplier_code"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.supplier_code}
              />
              {errors.supplier_code &&
                touched.supplier_code &&
                errors.supplier_code}
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {values.id ? "Update Fragrance Details" : "Create Fragrance"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default FragranceEditForm;
