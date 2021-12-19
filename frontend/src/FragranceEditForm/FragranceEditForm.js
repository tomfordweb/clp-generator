import FragranceProductEditor from "../FragranceProductEditor/FragranceProductEditor";
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
      <h4>Product List</h4>
      <div className="row">
        {fragrance.products.map((product, index) => (
          <FragranceProductEditor product={product} key={index} />
        ))}
      </div>
    </div>
  );
};
export default FragranceEditForm;
