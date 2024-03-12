import { useState, useEffect } from "react";
import { addGroup } from "../store/slices/group-slice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { addCard } from "../store/slices/card-slice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

import Modal from "../components/modal";

export default function CreateFlashcards() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { card } = useSelector((state) => state);
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState(null);
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);

  function onClose() {
    setShowModal(false);
  }

  function handleSaveCard(e) {
    e.preventDefault();
    console.log(term);
    console.log(term != null);
    console.log(term.length > 0);
    if (term != null && term.length > 0) {
      setCounter(counter + 1);

      const cardData = {
        id: counter + 1,
        term: term,
        definition: def,
        group: group,
        img: img,
      };
      setTerm("");
      console.log("term", term);
      setDef("");
      console.log("def", def);
      setImg(null);

      dispatch(addCard(cardData));
    }
    console.log("term", term);
    console.log("counter", counter);
  }
  useEffect(() => {
    console.log("term after update:", term);
  }, [term]);
  useEffect(() => {
    console.log("def after update:", def);
  }, [def]);

  function handleSaveGroup(e) {
    e.preventDefault();
    handleSaveCard(e);
    const groupData = {
      group: group,
      description: description,
      noOfCards: counter,
    };
    dispatch(addGroup(groupData));
    setShowModal(true);
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

      {card && card.length
        ? card.map((item) =>
            item.group === group ? (
              <div
                key={item.id}
                className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5"
              >
                <form>
                  <div className="flex flex-row">
                    <div className="m-5">
                      <FaCircle
                        className="h-[30px] w-[30px]"
                        color="rgb(163 230 53)"
                      />
                      {item.id}
                    </div>
                    <div className="mt-5  inline-block">
                      <p className="mb-2">Enter Term*</p>

                      <input
                        type="text"
                        className="w-[20vw] h-[40px] rounded-lg"
                        value={item.term}
                        disabled
                      />
                    </div>
                    <div className="mt-5 ml-5 inline-block">
                      <p className="mb-2">Enter Definition*</p>
                      <textArea
                        type="text"
                        className="w-[20vw] h-[40px] rounded-lg"
                        disabled
                      >
                        {item.definition}
                      </textArea>
                    </div>
                    <div className=" h-100 items-center">
                      {item.img ? (
                        <div className="m-2 ml-5 justify-center">
                          <img
                            src={URL.createObjectURL(item.img)}
                            className="w-[15vw] h-[100px] rounded-lg "
                          />
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col ml-5 space-y-3 m-5">
                      <button>
                        <RiDeleteBin5Line className="h-[30px] w-[30px]" />
                      </button>
                      <button>
                        <FaRegEdit className="h-[30px] w-[30px]" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null,
          )
        : null}
      {/* ------------------------------ */}
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5">
        <form>
          <div className="flex flex-row">
            <div className="m-5">
              <FaCircle
                className="h-[30px] w-[30px]"
                color="rgb(163 230 53)"
                visible={true}
              />
            </div>
            <div className="mt-5  inline-block">
              <p className="mb-2">Enter Term*</p>

              <input
                type="text"
                className="w-[20vw] h-[40px] rounded-lg"
                value={term}
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
              >
                {def}
              </textArea>
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
          </div>
          <div className="my-3 ml-5">
            <button
              className="text-lime-400"
              onClick={handleSaveCard}
              type="submit"
            >
              +Add More
            </button>
          </div>
        </form>
      </div>

      {/* ------------------------------------ */}
      <div className="my-5 ml-5 items-end">
        <button
          className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
          onClick={handleSaveGroup}
          type="submit"
        >
          Create
        </button>
        {showModal && (
          <Modal
            onClose={onClose}
            body={<div>Card Created</div>}
            header={<div>null</div>}
            footer={<div>null</div>}
          />
        )}
      </div>
    </div>
  );
}
