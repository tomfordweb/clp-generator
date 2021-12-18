import { useState } from "react";
import FragranceEditForm from "../FragranceEditForm/FragranceEditForm";

const FragranceEditor = ({ fragrances }) => {
  const [activeFragrance, setActiveFragrance] = useState(null);
  return (
    <section className="row">
      <header className="col-12">
        <h2>Fragrance Editor</h2>
      </header>
      <article className="col-2">
        <ul>
          {fragrances &&
            fragrances.map((fragrance) => (
              <li
                key={fragrance.id}
                onClick={() =>
                  setActiveFragrance(
                    fragrances.filter((f) => f.id == fragrance.id)[0]
                  )
                }
              >
                {fragrance.supplierName} - {fragrance.products.length} Products!
              </li>
            ))}
        </ul>
      </article>
      {activeFragrance && (
        <article className="col-10">
          <FragranceEditForm fragrance={activeFragrance} />
        </article>
      )}
    </section>
  );
};

export default FragranceEditor;
