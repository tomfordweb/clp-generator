import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import TextInput from "../TextInput/TextInput";
import PropTypes from "prop-types";

const FragranceProductEditor = ({ product }) => {
  return (
    <div
      className="card col-12 col-md-6 mb-4"
      data-testid="FragranceProductEditor"
      style={{ border: "1px solid #ddd" }}
    >
      <div className="card-body">
        <TextInput
          label="Product Name"
          value={product.name}
          name={`product.name`}
        />

        <TextAreaInput
          name={`product-${product.id}-text`}
          value={product.text}
          handleChange={(data) => {}}
          label="Description"
        />

        <IterableOptions
          title="Pictograms"
          options={[
            {
              name: "pictograms",
              value: 1,
              type: "checkbox",
              checked: product.pictograms.includes(1),
              icon: <PictogramDisplay images={[1]} />,
            },
            {
              name: "pictograms",
              value: 2,
              type: "checkbox",
              checked: product.pictograms.includes(2),
              icon: <PictogramDisplay images={[2]} />,
            },
            {
              name: "pictograms",
              value: 3,
              type: "checkbox",
              checked: product.pictograms.includes(3),
              icon: <PictogramDisplay images={[3]} />,
            },
          ]}
        />
      </div>
    </div>
  );
};

FragranceProductEditor.prototype = {
  product: PropTypes.object,
};

export default FragranceProductEditor;
