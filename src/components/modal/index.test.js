import { render } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import Modal from "./index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";

function renderWithRedux(ui, store1 = store) {
  return render(
    <BrowserRouter>
      <Provider store={store1}>{ui}</Provider>
    </BrowserRouter>,
  );
}

describe("renders modal correctly", () => {
  it("should match the snapshot", () => {
    const { asFragment } = renderWithRedux(
      <Modal body={"Test"} onClose={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
