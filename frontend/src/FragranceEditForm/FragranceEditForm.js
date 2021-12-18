import En15494Display from "../En15494Display/En15494Display";
import IterableOptions from "../IterableOptions/IterableOptions";
import TextInput from "../TextInput/TextInput";

const FragranceEditForm = ({ fragrance }) => {
  return (
    <div className="row">
      <TextInput
        label="Supplier"
        value={fragrance.supplierName}
        name="supplierName"
      />
      <TextInput
        label="Fragrance Name"
        value={fragrance.fragrance}
        name="fragrance"
      />
      <TextInput
        label="Supplier Code"
        value={fragrance.supplierCode}
        name="supplierCode"
      />

      <div>
        {fragrance.products.map((product, index) => (
          <div key={index} style={{ border: "1px solid #ddd" }}>
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
                  name: "en15494",
                  value: 1,
                  type: "checkbox",
                  checked: product.pictograms.includes(1),
                  icon: <En15494Display images={[1]} />,
                },
                {
                  name: "en15494",
                  value: 2,
                  type: "checkbox",
                  checked: product.pictograms.includes(2),
                  icon: <En15494Display images={[2]} />,
                },
                {
                  name: "en15494",
                  value: 3,
                  type: "checkbox",
                  checked: product.pictograms.includes(3),
                  icon: <En15494Display images={[3]} />,
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
