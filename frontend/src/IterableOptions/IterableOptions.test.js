import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IterableOptions from "./IterableOptions";
describe("<IiterableOptions />", () => {
  test("it should mount", () => {
    render(<IterableOptions />);

    const radioOptions = screen.getByTestId("IterableOptions");

    expect(radioOptions).toBeInTheDocument();
  });
});
