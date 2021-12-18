import "./App.scss";

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import LabelDisplay from "./LabelDisplay/LabelDisplay";
import LabelForm from "./LabelForm";

function App() {
  const [products, updateProducts] = useState([]);
  const getAllProducts = () => {
    fetch("products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        updateProducts(myJson.payload);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const [form, updateForm] = useState({
    labelStyle: "round",
    showBorder: false,
    fragrance: "Fragrance Name",
    product: "Product Name",
    productText: "",
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
    console.log("form updated", form);
  };

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
        <LabelForm
          products={products}
          form={form}
          handleChange={handleChange}
          updateForm={(value) =>
            updateForm({
              ...form,
              ...value,
            })
          }
        />
      </aside>
    </section>
  );
}

export default App;
