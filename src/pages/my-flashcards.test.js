import { render, screen } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import { Provider } from "react-redux";
import { describe } from "@jest/globals";
import store from "../store";
import MyFlashcards from "./my-flashcards";

function renderWithRedux(ui, store1 = store) {
  return render(<Provider store={store1}>{ui}</Provider>);
}

describe("my-flashcard page test", () => {
  test("No groups", () => {
    renderWithRedux(<MyFlashcards />);
    const element = screen.getByRole("heading", { name: "No Groups" });
    expect(element).toBeInTheDocument();
  });
});
