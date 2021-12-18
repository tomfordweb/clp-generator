import { useEffect, useState } from "react";

import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import IterableOptions from "../IterableOptions/IterableOptions";
import TextInput from "../TextInput/TextInput";
import CheckInput from "../CheckInput/CheckInput";
import SelectInput from "../SelectInput/SelectInput";
import { useDebouncedCallback } from "use-debounce";

function LabelForm({ products, propagateFormChange }) {
  const [product, setProduct] = useState(null);
  const [fragrance, setFragrance] = useState(null);
  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  /**
   * To prevent the app from behaving poorly
   * the changes to the form are only emitted
   * every X ms
   */
  const debouncedFormProgagate = useDebouncedCallback(
    (value) => propagateFormChange(value),
    1000
  );

  /**
   * After selecting a product of a specific fragrance
   * We can fill in the label with many fields
   */
  const selectProduct = (productKey) => {
    const product = fragrance.products.filter(
      (product) => product.id == productKey
    )[0];
    updateForm({
      pictograms: product.pictograms,
      fragrance: fragrance.fragrance,
      product: product.name,
      mass: product.mass,
      productText: product.text,
    });
  };

  /**
   * The internal state of the form. This contains the default values
   *
   * Whenever the form is updated we
   * fire a debounced event to propagate the change to the app
   */
  const [form, updateForm] = useState({
    labelStyle: "round",
    showBorder: false,
    fragrance: "",
    product: "",
    mass: "",
    pictograms: [],
    display_product: "Display Product Name",
    business_name: "Devonwick",
    business_address: "Unit C Armada Point, Estover Trading Estate PL6 7PY",
    business_telephone: "(123) 456-7890",
    ufi: "1234567890",
    batch: "12345",
  });
  useEffect(() => {
    debouncedFormProgagate(form);
  }, [form]);

  /**
   * Update internal state of form to the value of the changed input
   */
  const handleChange = ({ value, name, checked, type }) => {
    let returnValue = value;
    if (type === "checkbox-group") {
      if (checked) {
        // Push to the array
        returnValue = [...(form[name] || []), value];
      } else {
        // Remove from the array
        returnValue = (form[name] || []).filter((val) => val !== value);
      }
    }

    updateForm({
      ...form,
      [name]: returnValue,
    });
  };

  return (
    products.length && (
      <div>
        <SelectInput
          label="Fragrance"
          value={null}
          name="fragrance"
          options={products.map((product) => ({
            value: product.id,
            label: `${product.supplierName} ${product.fragrance}`,
            key: product.id,
          }))}
          handleChange={(value) =>
            setFragrance(products.filter((product) => product.id == value)[0])
          }
        />
        <SelectInput
          label="Product"
          value={null}
          name="product"
          options={
            (fragrance &&
              fragrance.products.map((product) => ({
                value: product.id,
                label: product.name,
                key: product.id,
              }))) ||
            []
          }
          handleChange={(value) => selectProduct(value)}
        />
        <IterableOptions
          title="Pictograms"
          handleChange={(value) => {
            handleChange(value);
          }}
          options={[
            {
              name: "pictograms",
              value: 1,
              type: "checkbox",
              checked:
                (form.pictograms && form.pictograms.includes(1)) || false,
              icon: <PictogramDisplay images={[1]} />,
            },
            {
              name: "pictograms",
              value: 2,
              type: "checkbox",
              checked:
                (form.pictograms && form.pictograms.includes(2)) || false,
              icon: <PictogramDisplay images={[2]} />,
            },
            {
              name: "pictograms",
              value: 3,
              type: "checkbox",
              checked:
                (form.pictograms && form.pictograms.includes(3)) || false,
              icon: <PictogramDisplay images={[3]} />,
            },
          ]}
        />
        <TextInput
          name="mass"
          value={form.mass}
          handleChange={handleChange}
          label="Mass/Volume"
        />
        <TextInput
          name="business_name"
          value={form.business_name}
          handleChange={handleChange}
          label="Business Name"
        />
        <TextInput
          name="business_address"
          value={form.business_address}
          handleChange={handleChange}
          label="Business Address"
        />
        <TextInput
          name="business_telephone"
          value={form.business_telephone}
          handleChange={handleChange}
          label="Business Telephone"
        />
        <TextInput
          name="ufi"
          value={form.ufi}
          handleChange={handleChange}
          label="UFI#"
        />
        <TextInput
          name="batch"
          value={form.batch}
          handleChange={handleChange}
          label="Batch#"
        />
        <h1>Design Options</h1>
        <IterableOptions
          handleChange={handleChange}
          title="Label Style"
          options={[
            {
              name: "labelStyle",
              value: "square",
              type: "radio",
              checked: form.labelStyle === "square",
              icon: <SquareShapeRadioIcon />,
              label: "Square",
            },
            {
              name: "labelStyle",
              value: "round",
              checked: form.labelStyle === "round",
              type: "radio",
              icon: <CircleShapeRadioIcon />,
              label: "Circle",
            },
          ]}
        />
        <CheckInput
          name="showBorder"
          value={form.showBorder}
          checked={form.showBorder}
          handleChange={handleChange}
          label="Show Trim lines"
        />
      </div>
    )
  );
}

export default LabelForm;
