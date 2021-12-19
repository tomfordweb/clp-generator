import { useState } from "react";

import FragranceEditForm from "../FragranceEditForm/FragranceEditForm";
import SelectInput from "../SelectInput/SelectInput";
import PropTypes from "prop-types";

const FragranceEditor = ({ fragrances }) => {
  const [activeFragrance, setActiveFragrance] = useState(null);
  return (
    <section className="row" data-testid="FragranceEditor">
      <header className="col-12">
        <h2>Fragrance Editor</h2>
      </header>
      <article className="col-12 col-sm-4 col-md-2">
        <SelectInput
          options={fragrances.map((fragrance) => ({
            value: fragrance.id,
            label: `${fragrance.supplierName} - ${fragrance.fragrance}`,
            key: fragrance.id,
          }))}
          handleChange={(val) => {
            setActiveFragrance(
              fragrances.filter((f) => parseInt(f.id) === parseInt(val))[0]
            );
          }}
        />
        <button type="button" className="btn btn-success">
          Create Fragrance
        </button>
      </article>
      {activeFragrance && (
        <article className="col-12 col-sm-8 col-md-10">
          <FragranceEditForm fragrance={activeFragrance} />
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
