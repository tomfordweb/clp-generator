import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PictogramDisplay from "./PictogramDisplay";

test("it should mount", () => {
  render(<PictogramDisplay images={["fish"]} />);

  const pd = screen.getByTestId("PictogramDisplay");

  expect(pd).toBeInTheDocument();
});
