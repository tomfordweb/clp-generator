import PropTypes from "prop-types";
import Modal from "react-modal";

import FragranceEditForm from "../FragranceEditForm/FragranceEditForm";
import FragranceProductEditor from "../FragranceProductEditor/FragranceProductEditor";
import SelectInput from "../SelectInput/SelectInput";

import { useEffect, useState } from "react";
import { fetchFragranceProductList } from "../utility";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const FragranceEditor = ({ fragrances, onFormUpdate }) => {
  const [activeFragrance, setActiveFragrance] = useState(null);
  const [activeFragranceProducts, setActiveFragranceProducts] = useState([]);
  const [fragranceModalIsOpen, setFragranceModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  const updateProductList = () =>
    fetchFragranceProductList(activeFragrance.id).then((data) => {
      setActiveFragranceProducts(data);
    });
  useEffect(() => {
    activeFragrance &&
      activeFragrance.id &&
      updateProductList(activeFragrance.id);
  }, [activeFragrance]);

  return (
    <section className="row" data-testid="FragranceEditor">
      <header className="col-12">
        <h2>Fragrance Editor</h2>
      </header>
      <article className="col-12 col-sm-4 col-md-2">
        <SelectInput
          options={fragrances.map((fragrance) => ({
            value: fragrance.id,
            label: fragrance.supplierName
              ? `${fragrance.supplierName} - ${fragrance.name}`
              : fragrance.name,
            key: fragrance.id,
          }))}
          handleChange={(val) => {
            setActiveFragrance(
              fragrances.filter((f) => parseInt(f.id) === parseInt(val))[0]
            );
          }}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setFragranceModalIsOpen(true)}
        >
          Create Fragrance
        </button>
      </article>

      {activeFragrance && (
        <article className="col-12 col-sm-8 col-md-10">
          <FragranceEditForm
            fragrance={activeFragrance}
            onFormUpdate={onFormUpdate}
          />
          <h4>Product List</h4>
          <div className="row">
            {activeFragrance &&
              activeFragranceProducts &&
              activeFragranceProducts.map((product, index) => (
                <FragranceProductEditor
                  onFormUpdate={(e) => {
                    onFormUpdate();
                    updateProductList(activeFragrance.id);
                  }}
                  fragranceId={activeFragrance.id}
                  product={product}
                  key={index}
                />
              ))}
          </div>
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
            style={customStyles}
            contentLabel="Example Modal"
          >
            <FragranceProductEditor
              onFormUpdate={onFormUpdate}
              fragranceId={activeFragrance.id}
              product={{
                name: "",
                description: "",
                pictograms: [],
                mass: "",
              }}
            />
          </Modal>
        </article>
      )}
      <Modal
        isOpen={fragranceModalIsOpen}
        onRequestClose={() => setFragranceModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FragranceEditForm
          fragrance={{ name: "", supplier: "", supplier_code: "" }}
          onFormUpdate={(values) => {
            onFormUpdate(values);
            setActiveFragrance(null);
            setFragranceModalIsOpen(false);
          }}
        />
      </Modal>
    </section>
  );
};
FragranceEditor.prototypes = {
  fragrances: PropTypes.arrayOf(PropTypes.any),
};
FragranceEditor.defaultProps = {
  fragrances: [],
};

export default FragranceEditor;
