import PropTypes from "prop-types";
import Modal from "react-modal";

import FragranceEditForm from "../FragranceEditForm/FragranceEditForm";
import FragranceProductEditor from "../FragranceProductEditor/FragranceProductEditor";
import SelectInput from "../SelectInput/SelectInput";

import { useCallback, useContext, useEffect, useState } from "react";
import { fetchFragranceProductList } from "../utility";
import { store } from "../StateProvider";
import { useNavigate, Outlet, Link } from "react-router-dom";

export const modalStyles = {
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
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const navigate = useNavigate();

  const [activeFragrance, setActiveFragrance] = useState(null);
  const [activeFragranceProducts, setActiveFragranceProducts] = useState([]);
  const [fragranceModalIsOpen, setFragranceModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);

  return (
    <section className="row" data-testid="FragranceEditor">
      <header className="col-12">
        <h2>Fragrance Editor</h2>
      </header>
      <article className="col-12 col-sm-4 col-md-2">
        <SelectInput
          options={state.fragrances.map((fragrance) => ({
            value: fragrance.id,
            label: fragrance.supplier
              ? `${fragrance.supplier} - ${fragrance.name}`
              : fragrance.name,
            key: fragrance.id,
          }))}
          handleChange={(e) => {
            navigate(`/fragrances/${e.target.value}`);
          }}
        />
        <Link type="button" to="/fragrances/create" className="btn btn-success">
          Create Fragrance
        </Link>
      </article>

      <article className="col-12 col-sm-8 col-md-10">
        <Outlet />
      </article>
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
