import IterableOptions from "../IterableOptions/IterableOptions";
import PictogramDisplay from "../PictogramDisplay/PictogramDisplay";
import TextInput from "../TextInput/TextInput";

const FragranceEditForm = ({ fragrance }) => {
  return (
    <div className="row">
      <TextInput
        label="Supplier"
        value={fragrance.supplierName}
        name="supplierName"
      />{" "}
      <TextInput
        label="Fragrance Name"
        value={fragrance.fragrance}
        name="fragrance"
      />{" "}
      <TextInput
        label="Supplier Code"
        value={fragrance.supplierCode}
        name="supplierCode"
      />
      <div>
        {fragrance.products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
            }}
          >
            <TextInput
              label="Product Name"
              value={product.name}
              name={`product.name`}
            />

            <div>
              <textarea
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
        ))}
      </div>
    </div>
  );
};
export default FragranceEditForm;
