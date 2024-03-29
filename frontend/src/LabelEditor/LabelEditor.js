import { PDFViewer } from "@react-pdf/renderer";
import bwipjs from "bwip-js";
import { useContext, useEffect, useState } from "react";

import LabelDisplay from "../LabelDisplay/LabelDisplay";
import LabelForm from "../LabelForm/LabelForm";
import { store } from "../StateProvider";

function LabelEditor() {
  // a base64 string of the EAN barcode
  const [eanCode, setEanCode] = useState(null);

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const { form } = state;

  useEffect(() => {
    let eanCode = null;
    try {
      const canvas =
        form &&
        form.ean &&
        bwipjs.toCanvas("eandisplay", {
          bcid: "ean13", // Barcode type
          text: form.ean,
          scale: 3, // 3x scaling factor
          height: 10, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this
        });

      if (canvas) {
        eanCode = canvas.toDataURL("image/png");
      }
    } catch (error) {
      console.error("EAN GENERATE ERROR", error);
    }
    setEanCode(eanCode);
  }, [form]);

  return (
    state &&
    state.fragrances && (
      <section className="row">
        <article className="PdfViewer col-12 col-md-6">
          {form ? (
            <div>
              <PDFViewer style={{ height: "500px", width: "100%" }}>
                {" "}
                <LabelDisplay
                  eanBase64={eanCode}
                  labelCount={1}
                  orientation="portrait"
                  size={[190, 190]}
                  form={form}
                />
              </PDFViewer>
            </div>
          ) : (
            <div className="alert alert-secondary" role="alert">
              Before viewing the label, you must first select a Fragrance and
              Product!
            </div>
          )}
          <canvas style={{ display: "none" }} id="eandisplay"></canvas>
        </article>
        <aside className="col-12 col-md-6">
          <LabelForm
            fragrances={state.fragrances}
            propagateFormChange={(value) => {}}
          />
        </aside>{" "}
      </section>
    )
  );
}

export default LabelEditor;
