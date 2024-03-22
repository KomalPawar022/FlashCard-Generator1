import { render } from "@testing-library/react";
import GroupTile from "./index";
import { expect } from "@jest/globals";
import { it } from "@jest/globals";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

function renderWithRedux(ui, store1 = store) {
  return render(
    <BrowserRouter>
      <Provider store={store1}>{ui}</Provider>
    </BrowserRouter>,
  );
}

it("should match the snapshot", () => {
  const { asFragment } = renderWithRedux(
    <GroupTile
      group={"Group1"}
      description={"Description of Group1"}
      noOfCards={3}
      groupImg={"https://picsum.photos/200/300"}
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
