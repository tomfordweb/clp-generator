import { Formik } from "formik";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

import FragranceProductEditor from "../FragranceProductEditor/FragranceProductEditor";
import { store } from "../StateProvider";
import {
  convertObjectNullValuesToStr,
  createFragrance,
  deleteFragrance,
  fetchFragranceProductList,
  updateFragrance,
} from "../utility";
import { modalStyles } from "../FragranceEditor/FragranceEditor";

const FragranceEditForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [activeFragranceProducts, setActiveFragranceProducts] = useState([]);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const fragrance = (state &&
    state.fragrances &&
    params.fragranceId &&
    state.fragrances.filter(
      (fragrance) => parseInt(fragrance.id) === parseInt(params.fragranceId)
    )[0]) || { name: "", supplier: "", supplier_code: "" };

  const updateProductList = useCallback(
    () =>
      fetchFragranceProductList(fragrance.id).then((data) => {
        setActiveFragranceProducts(data);
      }),
    [fragrance]
  );

  const handleDelete = (fragranceId) => {
    deleteFragrance(fragranceId).then(() => {
      dispatch({ type: "deleteFragrance", value: fragranceId });
      navigate("/fragrances");
    });
  };

  useEffect(() => {
    fragrance && fragrance.id && updateProductList(fragrance.id);
  }, [updateProductList, fragrance]);

  return (
    <div className="row" data-testid="FragranceEditForm">
      <Formik
        enableReinitialize={true}
        initialValues={convertObjectNullValuesToStr(fragrance)}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const response = values.id
            ? updateFragrance(values.id, values)
            : createFragrance(values);

          const action = values.id ? "updateFragrance" : "appendFragrance";
          response.then((data) => {
            dispatch({ type: action, value: data });
            setSubmitting(false);
            if (action === "appendFragrance") {
              navigate(`/fragrances/${data.id}`);
            }
          });
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
            <div className="mt-3 form-group d-flex justify-content-between">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {values.id ? "Update Fragrance Details" : "Create Fragrance"}
              </button>
              {values.id && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(fragrance.id)}
                >
                  Delete Fragrance and all Products
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
      {fragrance.id && <h4>Product List</h4>}
      <div className="row">
        {fragrance &&
          fragrance.id &&
          activeFragranceProducts &&
          activeFragranceProducts.length > 0 &&
          activeFragranceProducts.map((product, index) => (
            <FragranceProductEditor
              wrapperClass="col-12 col-md-6 mb-3"
              onFormUpdate={(e) => {
                updateProductList(fragrance.id);
              }}
              fragranceId={fragrance.id}
              product={product}
              key={index}
            />
          ))}
        {fragrance && fragrance.id && (
          <div>
            <button
              onClick={() => setProductModalIsOpen(true)}
              type="button"
              className="btn btn-success"
            >
              Add product
            </button>
            <Modal
              isOpen={productModalIsOpen}
              onRequestClose={() => setProductModalIsOpen(false)}
              style={modalStyles}
              contentLabel="Example Modal"
            >
              <FragranceProductEditor
                onFormUpdate={(e) => {
                  updateProductList(fragrance.id);
                  setProductModalIsOpen(false);
                }}
                fragranceId={fragrance.id}
                product={{
                  name: "",
                  description: "",
                  pictograms: [],
                  mass: "",
                }}
              />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};
export default FragranceEditForm;
