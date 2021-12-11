import TextInput from "./TextInput/TextInput";
import "./App.scss";
import { useState } from "react";
import LabelDisplay from "./LabelDisplay/LabelDisplay";

function App() {
  const [form, updateForm] = useState({
    labelStyle: "round",
    fragrance: "Fragrance Name",
    product: "Product Name",
    mass: "200",
    display_product: "Display Product Name",
    business_name: "Devonwick",
    business_address: "Unit C Armada Point, Estover Trading Estate PL6 7PY",
    business_telephone: "(123) 456-7890",
    ufi: "1234567890",
    batch: "12345",
  });

  /**
   * Update internal state of form to the value of the changed input
   */
  const handleChange = (name, val) => {
    updateForm({
      ...form,
      [name]: val,
    });
  };

  return (
    <section className="App">
      <article>
        <LabelDisplay form={form} />
      </article>
      <aside>
        <TextInput
          name="fragrance"
          handleChange={handleChange}
          label="Fragrance"
        />
        <TextInput name="product" handleChange={handleChange} label="Product" />
        <TextInput
          name="mass"
          handleChange={handleChange}
          label="Mass/Volume"
        />
        <TextInput
          name="display_product"
          handleChange={handleChange}
          label="Product Name"
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
      </aside>
    </section>
  );
}

export default App;
