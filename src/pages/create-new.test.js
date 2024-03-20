import { render } from "@testing-library/react";
import CreateFlashcards from "./create-new";
import { expect } from "@jest/globals";
import { it } from "@jest/globals";
import { Provider } from "react-redux";
import store from "../store";

function renderWithRedux(ui, store1 = store) {
  return render(<Provider store={store1}>{ui}</Provider>);
}

it("should match the snapshot", () => {
  const { asFragment } = renderWithRedux(<CreateFlashcards />);
  expect(asFragment()).toMatchSnapshot();
});
