import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

test("on change will trigger handleChange", () => {
  var changeHandler = jest.fn();
  render(
    <TextInput
      name="id"
      label="Id"
      type="number"
      handleChange={changeHandler}
    />
  );
  fireEvent.change(screen.getByTestId("form-control-id"));
  expect(changeHandler).toHaveBeenCalled();
});
test("can render a number input", () => {
  render(<TextInput name="id" label="Id" type="number" />);
  var input = screen.getByTestId("form-control-id");
  expect(input.getAttribute("type")).toEqual("number");
});

test("renders the label elements", () => {
  render(<TextInput name="devonwick" label="devonwick" />);
  expect(screen.getByLabelText("devonwick")).toBeInTheDocument();
});
