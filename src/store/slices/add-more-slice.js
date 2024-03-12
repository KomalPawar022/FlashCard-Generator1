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
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg lg:w-[800px] h-[80px] md:w-[500px]"
            />
          </div>
        </form>
      </div>
      {<Card group={group} savedTerm={null} />}
      {card && card.length
        ? card.map((item, index) =>
            item.group === group ? (
              <Card key={index} group={group} savedTerm={item.term} />
            ) : null,
          )
        : null}
      <div className="my-5 ml-5 items-end">
        <button
          className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
          onClick={handleSaveGroup}
          type="submit"
        >
          Save Group
        </button>
      </div>
    </div>
  );
}
