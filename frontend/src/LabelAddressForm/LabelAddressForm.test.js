import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import React from "react";

import LabelAddressForm from "./LabelAddressForm";

describe("<LabelAddressForm />", () => {
  test("it should mount", () => {
    render(
      <LabelAddressForm
        form={{
          business_name: "tomfordweb",
          business_address_1: "123 main st",
          business_address_2: "the internet",
        }}
      />
    );

    const labelAddressForm = screen.getByTestId("LabelAddressForm");

    expect(labelAddressForm).toBeInTheDocument();
  });
});
