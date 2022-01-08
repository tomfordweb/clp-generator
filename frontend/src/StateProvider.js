// store.js
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
import React, { createContext, useReducer } from "react";

const DEFAULT_BUSINESS_ADDRESS = {
  business_name: "Devonwick",
  business_address_1: "Unit C Armada Point",
  business_address_2: "Estover Trading Estate PL6 7PY",
  business_telephone: "(123) 456-7890",
};

const initialState = {
  fragrances: [],
  form: {
    fragrance: "",
    pictograms: "",
    product: "",
    mass: "",
    productText: "",
    labelStyle: "round",
    showBorder: false,
    fontSize: 14,
    fragrance: "",
    product: "",
    mass: "",
    pictograms: [],
    display_product: "Display Product Name",
    custom_title: "",
    custom_text: "Follow us on Instagram @devonwickcandles",
    ean: "5056496100170",
    ufi: "",
    batch: "",
    ...DEFAULT_BUSINESS_ADDRESS,
  },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    let newState = state;
    switch (action.type) {
      case "setFragrances":
        newState = { ...state, fragrances: action.value };
        break;
      case "setFormProduct":
        // const productValues = (fragrance, product) => ({
        //   fragrance: fragrance.name,
        //   pictograms: product.pictograms,
        //   product: product.name,
        //   mass: product.mass || "",
        //   productText: product.description,
        // });
        // updateForm({
        //   ...globalState.form,
        //   ...productValues(fragrance, inputProduct),
        // });
        break;
      default:
        throw new Error();
    }
    console.log(newState);
    return newState;
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
