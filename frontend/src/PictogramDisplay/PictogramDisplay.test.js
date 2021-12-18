import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PictogramDisplay from "./PictogramDisplay";

describe("<PictogramDisplay />", () => {
  test("it should mount", () => {
    render(<PictogramDisplay />);

    const PictogramDisplay = screen.getByTestId("PictogramDisplay");

    expect(PictogramDisplay).toBeInTheDocument();
  });
});
