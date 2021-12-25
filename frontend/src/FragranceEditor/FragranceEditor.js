import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import FragranceEditForm from "../FragranceEditForm/FragranceEditForm";
import SelectInput from "../SelectInput/SelectInput";

const FragranceEditor = ({ fragrances, onFormUpdate }) => {
  const [activeFragrance, setActiveFragrance] = useState(null);
  const [creatorMode, setCreatorMode] = useState(false);

  useEffect(() => {
    activeFragrance &&
      activeFragrance.id &&
      fetch(`/api/v1/fragrances/${activeFragrance.id}/products`).then((data) =>
        console.log(data.json())
      );
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
          onClick={() => setCreatorMode(true)}
        >
          Create Fragrance
        </button>
      </article>

      {creatorMode && (
        <article className="col-12 col-sm-8 col-md-10">
          <FragranceEditForm
            fragrance={{ name: "", supplier: "", supplier_code: "" }}
            onFormUpdate={(values) => {
              onFormUpdate(values);
              setActiveFragrance(null);
              setCreatorMode(false);
            }}
          />
        </article>
      )}
      {activeFragrance && !creatorMode && (
        <article className="col-12 col-sm-8 col-md-10">
          <FragranceEditForm
            fragrance={activeFragrance}
            onFormUpdate={onFormUpdate}
          />
          <h4>Product List</h4>
          <div className="row">
            {activeFragrance &&
              activeFragrance.products &&
              activeFragrance.products.map((product, index) => (
                <FragranceProductEditor product={product} key={index} />
              ))}
          </div>
          <button type="button" className="btn btn-success">
            Add product
          </button>
        </article>
      )}
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
