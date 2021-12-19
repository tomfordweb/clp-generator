import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FragranceEditForm from "./FragranceEditForm";

describe("<FragranceEditForm />", () => {
  test("it should mount", () => {
    render(
      <FragranceEditForm
        fragrance={{
          supplierName: "Acme Industries",
          fragrance: "New Car Smell",
          supplierCode: "foobar",
          products: [],
        }}
      />
    );

    const fragranceEditForm = screen.getByTestId("FragranceEditForm");

    expect(fragranceEditForm).toBeInTheDocument();
  });
});
