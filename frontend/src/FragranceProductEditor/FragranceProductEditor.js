import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import TextInput from "../TextInput/TextInput";

const FragranceProductEditor = ({ product }) => {
  return (
    <div
      className="card col-12 col-md-6 mb-4"
      style={{
        border: "1px solid #ddd",
      }}
    >
      <div className="card-body">
        <TextInput
          label="Product Name"
          value={product.name}
          name={`product.name`}
        />

        <div>
          <label className="form-label" htmlFor={`product-${product.id}-text`}>
            Description
          </label>
          <textarea
            id={`product-${product.id}-text`}
            style={{ minHeight: "200px" }}
            className="form-control"
            defaultValue={product.text}
          ></textarea>
        </div>

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
export default FragranceProductEditor;
