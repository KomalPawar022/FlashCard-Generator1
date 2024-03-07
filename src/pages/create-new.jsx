import Card from "../components/card";
import { useState } from "react";
import { addGroup } from "../store/slices/group-slice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

export default function CreateFlashcards() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { card } = useSelector((state) => state);
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState(null);

  function handleSaveGroup(e) {
    e.preventDefault();
    const groupData = {
      group: group,
      description: description,
    };
    dispatch(addGroup(groupData));
  }

  return (
    <div className="flex flex-col justify-center items-center" ref={ref}>
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg">
        <form>
          <div className="my-5 ml-5">
            <p className="mb-2">Create Group*</p>
            <input
              type="text"
              onChange={(e) => setGroup(e.target.value)}
              className="w-[20vw] h-[40px] rounded-lg"
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
              className="rounded-lg"
            />
          </div>
          <div className="my-5 ml-5 items-end">
            <button
              className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
              onClick={handleSaveGroup}
            >
              Save Group
            </button>
          </div>
        </form>
      </div>
      {card && card.length
        ? card.map((item) =>
            item.group === group ? (
              <Card
                group={group}
                savedTerm={item.term}
                savedDef={item.definition}
              />
            ) : null,
          )
        : null}
      {<Card group={group} savedTerm={null} savedDef={null} />}
    </div>
  );
}
