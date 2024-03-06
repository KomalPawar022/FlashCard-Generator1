import Card from "../components/card";
import { useState, useEffect } from "react";
import { addGroup } from "../store/slices/group-slice";
import { useDispatch } from "react-redux";

export default function CreateFlashcards() {
  const dispatch = useDispatch();
  // const { groupSlice } = useSelector((state) => state.group);
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState(null);
  const [addCardForm, setAddCardForm] = useState(false);

  function handleSaveGroupAndAdd(e) {
    e.preventDefault();
    const groupData = {
      group: group,
      description: description,
    };
    //console.log(data);

    dispatch(addGroup(groupData));

    setAddCardForm(true);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg">
        <form>
          <div className="my-5 ml-5">
            <p className="mb-2">Create Group*</p>
            <input
              type="text"
              onChange={(e) => setGroup(e.target.value)}
              className="w-[20vw] h-[40px]"
              required
            />
            <input type="file" className="ml-2 bg-white-100" />
          </div>
          <div className="my-5 ml-5">
            <p className="mb-2">Add Description</p>
            <textarea
              type="text"
              cols="80"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="my-5 ml-5 items-end">
            <button
              className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
              onClick={handleSaveGroupAndAdd}
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
      {addCardForm ? <Card group={group} /> : null}
    </div>
  );
}
