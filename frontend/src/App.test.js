import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders form elements", () => {
  render(<App />);
  expect(screen.getByLabelText("Fragrance")).toBeInTheDocument();
  expect(screen.getByLabelText("Product")).toBeInTheDocument();
  expect(screen.getByLabelText("Mass/Volume")).toBeInTheDocument();
  expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Business Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Business Telephone")).toBeInTheDocument();
  expect(screen.getByLabelText("Business Address")).toBeInTheDocument();
  expect(screen.getByLabelText("UFI#")).toBeInTheDocument();
  expect(screen.getByLabelText("Batch#")).toBeInTheDocument();
});
