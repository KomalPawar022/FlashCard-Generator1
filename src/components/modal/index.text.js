import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import Modal from "./index";
describe("renders modal correctly", () => {
  test("renders link", () => {
    render(<Modal body="test" onClose={() => {}} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();
  });
});
