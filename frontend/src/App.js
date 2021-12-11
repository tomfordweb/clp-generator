import TextInput from "./TextInput/TextInput";
import "./App.scss";
import { useState } from "react";
import LabelDisplay from "./LabelDisplay/LabelDisplay";
import IterableOptions from "./IterableOptions/IterableOptions";
import ens15494_1 from "./images/1.png";
import ens15494_2 from "./images/2.png";
import ens15494_3 from "./images/3.png";
import ens15494_4 from "./images/4.png";
import ens15494_5 from "./images/5.png";
import ens15494_6 from "./images/6.png";

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
    console.log(form);
  };

  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  const En15494_1 = () => <img className="ens-icon" src={ens15494_1} />;
  const En15494_2 = () => <img className="ens-icon" src={ens15494_2} />;
  const En15494_3 = () => <img className="ens-icon" src={ens15494_3} />;
  const En15494_4 = () => <img className="ens-icon" src={ens15494_4} />;
  const En15494_5 = () => <img className="ens-icon" src={ens15494_5} />;
  const En15494_6 = () => <img className="ens-icon" src={ens15494_6} />;

  return (
    <section className="App">
      <article>
        <LabelDisplay form={form} />
      </article>
      <aside>
        <IterableOptions
          handleChange={handleChange}
          options={[
            {
              name: "en15494[]",
              value: 1,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_1 />,
            },
            {
              name: "en15494[]",
              value: 2,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_2 />,
            },
            {
              name: "en15494[]",
              value: 3,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_3 />,
            },
            {
              name: "en15494[]",
              value: 4,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_4 />,
            },
            {
              name: "en15494[]",
              value: 5,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_5 />,
            },
            {
              name: "en15494[]",
              value: 6,
              type: "checkbox",
              checked: form.labelStyle === "square",
              icon: <En15494_6 />,
            },
          ]}
        />
        <IterableOptions
          handleChange={handleChange}
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
