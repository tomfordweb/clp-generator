import { render, screen } from "@testing-library/react";

import products from "../public/products.json";

import App from "./App";

test("renders form elements", () => {
  render(<App products={products.payload} />);
});
