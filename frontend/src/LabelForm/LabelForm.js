import { useEffect, useState } from "react";

import En15494Display from "../En15494Display/En15494Display";
import IterableOptions from "../IterableOptions/IterableOptions";
import TextInput from "../TextInput/TextInput";
import CheckInput from "../CheckInput/CheckInput";

function LabelForm({ products, updateForm, handleChange, form }) {
  const [product, setProduct] = useState(null);
  const [fragrance, setFragrance] = useState(null);
  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  const selectProduct = (productKey) => {
    console.log(productKey);
    const product = fragrance.products.filter(
      (product) => product.id == productKey
    )[0];

    updateForm({
      en15494: product.pictograms,
      fragrance: fragrance.fragrance,
      product: product.name,
      mass: product.mass,
      productText: product.text,
    });

    console.log(product);
  };

  return (
    products.length && (
      <div>
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
          handleChange={handleChange}
          label="Show Trim lines"
        />
        <div className="mb-3">
          <label htmlFor="fragrance">Fragrance:</label>
          <select
            className="form-select"
            defaultValue={0}
            onChange={(e) =>
              setFragrance(
                products.filter((product) => product.id == e.target.value)[0]
              )
            }
          >
            <option value={0}>Select</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.supplierName} {product.fragrance}
              </option>
            ))}
          </select>
        </div>
        {fragrance && (
          <div className="form-control">
            <label htmlFor="product">Product:</label>
            <select onChange={(e) => selectProduct(e.target.value)}>
              {fragrance.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <IterableOptions
          title="Pictograms"
          handleChange={handleChange}
          options={[
            {
              name: "en15494",
              value: 1,
              type: "checkbox",
              checked: form.en15494.includes(1),
              icon: <En15494Display images={[1]} />,
            },
            {
              name: "en15494",
              value: 2,
              type: "checkbox",
              checked: form.en15494.includes(2),
              icon: <En15494Display images={[2]} />,
            },
            {
              name: "en15494",
              value: 3,
              type: "checkbox",
              checked: form.en15494.includes(3),
              icon: <En15494Display images={[3]} />,
            },
          ]}
        />
        <TextInput
          name="mass"
          handleChange={handleChange}
          label="Mass/Volume"
        />
        <TextInput
          name="business_name"
          handleChange={handleChange}
          label="Business Name"
        />
        <TextInput
          name="business_address"
          handleChange={handleChange}
          label="Business Address"
        />
        <TextInput
          name="business_telephone"
          handleChange={handleChange}
          label="Business Telephone"
        />
        <TextInput name="ufi" handleChange={handleChange} label="UFI#" />
        <TextInput name="batch" handleChange={handleChange} label="Batch#" />
      </div>
    )
  );
}

export default LabelForm;
