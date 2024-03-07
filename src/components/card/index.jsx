import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, removeCard } from "../../store/slices/card-slice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

export default function Card({ group, savedTerm }) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState(null);
  const [def, setDef] = useState(null);
  const [img, setImg] = useState(null);
  const [saved, setSaved] = useState(false);
  const [counter, setCounter] = useState(1);
  const { card } = useSelector((state) => state);

  function handleDelete(e) {
    e.preventDefault();
    dispatch(removeCard(term));
  }

  function handleSaveCard(e) {
    e.preventDefault();
    const cardData = {
      id: counter,
      term: term,
      definition: def,
      group: group,
      img: img,
    };
    dispatch(addCard(cardData));

    setSaved(true);
    setCounter(counter + 1);
  }

  useEffect(() => {
    if (savedTerm) {
      card.map((item) => {
        if (item.term === savedTerm) {
          setTerm(item.term);
          setDef(item.definition);
          setImg(item.img);
        }
      });
    } else {
      setTerm(null);
      setDef(null);
      setImg(null);
    }
  }, []);
  return (
    <>
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5">
        <form>
          <div className="flex flex-row">
            <div className="m-5">
              <FaCircle
                className="h-[30px] w-[30px]"
                color="rgb(163 230 53)"
                visible={true}
                defaultValue={counter}
              />
            </div>
            <div className="mt-5  inline-block">
              <p className="mb-2">Enter Term*</p>

              <input
                type="text"
                className="w-[20vw] h-[40px] rounded-lg"
                onChange={(e) => setTerm(e.target.value)}
                required
              />
            </div>
            <div className="mt-5 ml-5 inline-block">
              <p className="mb-2">Enter Definition*</p>
              <textArea
                type="text"
                className="w-[20vw] h-[40px] rounded-lg"
                onChange={(e) => setDef(e.target.value)}
                required
              />
            </div>
            <div className=" h-100 items-center">
              {img ? (
                <div className="mt-5 ml-5 justify-center">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-[15vw] h-[100px] rounded-lg"
                  />
                </div>
              ) : (
                <div className="mt-12 ml-5 inline-block">
                  <input
                    className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              )}
            </div>
            {saved ? (
              <div className="flex flex-col ml-5 space-y-3 m-5">
                <button onClick={handleDelete}>
                  <RiDeleteBin5Line className="h-[30px] w-[30px]" />
                </button>
                <button>
                  <FaRegEdit className="h-[30px] w-[30px]" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="my-3 ml-5">
            {saved ? null : (
              <button
                className="text-lime-400"
                onClick={handleSaveCard}
                type="submit"
              >
                +Add More
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
