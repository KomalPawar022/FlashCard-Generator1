import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../store/slices/card-slice";

export default function Card({ group, savedTerm, savedDef }) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState(null);
  const [def, setDef] = useState(null);

  function handleSaveCard(e) {
    e.preventDefault();
    const cardData = {
      term: term,
      definition: def,
      group: group,
    };
    dispatch(addCard(cardData));
    setTerm(null);
    setDef(null);
  }
  return (
    <>
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5">
        {console.log("saved term:-", savedTerm, "savedDef:-", savedDef)}
        <form>
          <div className="mt-5 ml-5 inline-block">
            <p className="mb-2">Enter Term*</p>
            <input
              type="text"
              className="w-[20vw] h-[40px] rounded-lg"
              onChange={(e) => setTerm(e.target.value)}
              value={savedTerm}
            />
          </div>
          <div className="mt-5 ml-5 inline-block">
            <p className="mb-2">Enter Definition*</p>
            <input
              type="text"
              className="w-[20vw] h-[40px] rounded-lg"
              onChange={(e) => setDef(e.target.value)}
              value={savedDef}
            />
          </div>
          <div className="mt-5 ml-5 inline-block">
            <button
              className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
              type="file"
            >
              Select Image
            </button>
          </div>
          <div className="my-3 ml-5">
            <button className="text-lime-400" onClick={handleSaveCard}>
              +Add More
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
