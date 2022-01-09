// store.js
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
import React, { createContext, useReducer } from "react";

const DEFAULT_BUSINESS_ADDRESS = {
  business_name: "Devonwick",
  business_address_1: "Unit C Armada Point",
  business_address_2: "Estover Trading Estate PL6 7PY",
  business_telephone: "(123) 456-7890",
};

const DEFAULT_PRODUCT_VALUES = {
  fragrance: "",
  pictograms: [],
  product: "",
  mass: "",
};
const initialState = {
  fragrances: [],
  form: {
    productText: "",
    labelStyle: "round",
    showBorder: false,
    titleFontSize: 14,
    textFontSize: 3,
    warningTextFontSize: 3,
    titlePaddingTop: 0,
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
    ...DEFAULT_PRODUCT_VALUES,
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
      case "appendFragrance":
        newState = {
          ...state,
          fragrances: state.fragrances.map((fragrance) =>
            parseInt(fragrance.id) === parseInt(action.value.id)
              ? action.value
              : fragrance
          ),
        };
        break;
      case "updateFragrance":
        newState = {
          ...state,
          fragrances: [...state.fragrances, action.value],
        };
        break;
      case "selectFragranceProductForForm":
        newState = {
          ...state,
          form: {
            ...state.form,
            ...{
              fragrance: action.fragrance.name,
              pictograms: action.product.pictograms,
              product: action.product.name,
              custom_title: action.product.custom_name,
              mass: action.product.mass || "",
              productText: action.product.description,
            },
          },
        };
        break;
      case "updateForm":
        newState = {
          ...state,
          form: { ...state.form, ...action.value },
        };
        break;
      default:
        throw new Error(`unhandled action ${action.type}`);
    }
    // console.log(newState);
    return newState;
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
