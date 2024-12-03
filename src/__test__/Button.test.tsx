import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  test("renders button with correct name", () => {
    const buttonName = "Click Me";
    render(<Button name={buttonName} />);

    const buttonElement = screen.getByRole("button", { name: buttonName });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonName);
  });
});
