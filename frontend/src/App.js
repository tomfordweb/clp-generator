import TextInput from "./TextInput/TextInput";
import "./App.scss";
import { useState } from "react";
import LabelDisplay from "./LabelDisplay/LabelDisplay";
import IterableOptions from "./IterableOptions/IterableOptions";
import en15494_1 from "./images/1.png";
import en15494_2 from "./images/2.png";
import en15494_3 from "./images/3.png";
import en15494_4 from "./images/4.png";
import en15494_5 from "./images/5.png";
import en15494_6 from "./images/6.png";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import En15494Display from "./En15494Display/En15494Display";

function App() {
  const [form, updateForm] = useState({
    labelStyle: "round",
    fragrance: "Fragrance Name",
    product: "Product Name",
    mass: "200",
    en15494: [],
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
  const handleChange = (options) => {
    // this will crash a browser lol
    if (displayFormat !== "single") {
      setDisplayFormat("single");
    }
    let value = options.value;
    // Checkboxes are automatically assumed its an array
    if (options.type === "checkbox") {
      if (options.checked) {
        // Push to the array
        value = [...(form[options.name] || []), options.value];
      } else {
        // Remove from the array
        value = (form[options.name] || []).filter(
          (val) => val !== options.value
        );
      }
    }

    updateForm({
      ...form,
      [options.name]: value,
    });
  };

  const SquareShapeRadioIcon = () => <div className="square-icon"></div>;
  const CircleShapeRadioIcon = () => <div className="circle-icon"></div>;

  const [displayFormat, setDisplayFormat] = useState("single");

  return (
    <section className="App">
      <header>
        <h1>CLP Generator</h1>
      </header>
      <article>
        <PDFViewer>
          <LabelDisplay
            labelCount={1}
            orientation="portrait"
            size={[180, 180]}
            form={form}
          />
        </PDFViewer>
      </article>
      <aside>
        <IterableOptions
          title="EN15494"
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
            {
              name: "en15494",
              value: 4,
              type: "checkbox",
              checked: form.en15494.includes(4),
              icon: <En15494Display images={[4]} />,
            },
            {
              name: "en15494",
              value: 5,
              type: "checkbox",
              checked: form.en15494.includes(5),
              icon: <En15494Display images={[5]} />,
            },
            {
              name: "en15494",
              value: 6,
              type: "checkbox",
              checked: form.en15494.includes(6),
              icon: <En15494Display images={[6]} />,
            },
          ]}
        />
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
