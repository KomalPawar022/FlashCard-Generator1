import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../store/slices/add-card-slice";
export default function Card({ group }) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState([]);
  const [def, setDef] = useState([]);

  function handleSaveCard(e) {
    e.preventDefault();
    const cardData = {
      term: term,
      definition: def,
      group: group,
    };
    dispatch(addCard(cardData));
  }
  return (
    <>
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5">
        <form>
          <div className="mt-5 ml-5 inline-block">
            <p className="mb-2">Enter Term*</p>
            <input
              type="text"
              className="w-[20vw] h-[40px]"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="mt-5 ml-5 inline-block">
            <p className="mb-2">Enter Definition*</p>
            <input
              type="text"
              className="w-[20vw] h-[40px]"
              onChange={(e) => setDef(e.target.value)}
            />
          </div>
          <div className="mt-5 ml-5 inline-block">
            <button className="border border-lime-400 rounded-lg w-[20vw] h-[40px]">
              Select Image
            </button>
          </div>
          <div className="my-3 ml-5">
            <button className="text-lime-400" onClick={handleSaveCard}>
              Save Card
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
