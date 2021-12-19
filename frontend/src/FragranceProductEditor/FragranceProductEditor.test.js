import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FragranceProductEditor from "./FragranceProductEditor";
import products from "../../public/products.json";

describe("<FragranceProductEditor />", () => {
  test("it should mount", () => {
    render(
      <FragranceProductEditor product={products.payload[0].products[0]} />
    );

    const fragranceProductEditor = screen.getByTestId("FragranceProductEditor");

    expect(fragranceProductEditor).toBeInTheDocument();
  });
});
