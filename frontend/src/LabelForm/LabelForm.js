import { useEffect, useState } from "react";

import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import IterableOptions from "../IterableOptions/IterableOptions";
import TextInput from "../TextInput/TextInput";
import CheckInput from "../CheckInput/CheckInput";
import SelectInput from "../SelectInput/SelectInput";

function LabelForm({ products, updateForm, handleChange, form }) {
  const [product, setProduct] = useState(null);
  const [fragrance, setFragrance] = useState(null);
  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

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
        {fragrance && (
          <SelectInput
            label="Product"
            value={null}
            name="product"
            options={fragrance.products.map((product) => ({
              value: product.id,
              label: product.name,
              key: product.id,
            }))}
            handleChange={(value) => selectProduct(value)}
          />
        )}
        <IterableOptions
          title="Pictograms"
          handleChange={handleChange}
          options={[
            {
              name: "pictograms",
              value: 1,
              type: "checkbox",
              checked: form.pictograms.includes(1),
              icon: <PictogramDisplay images={[1]} />,
            },
            {
              name: "pictograms",
              value: 2,
              type: "checkbox",
              checked: form.pictograms.includes(2),
              icon: <PictogramDisplay images={[2]} />,
            },
            {
              name: "pictograms",
              value: 3,
              type: "checkbox",
              checked: form.pictograms.includes(3),
              icon: <PictogramDisplay images={[3]} />,
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
