import { useState } from "react";
import { addGroup, changeNoOfCards } from "../store/slices/group-slice";
import { useDispatch, useSelector } from "react-redux";

import {
  addCard,
  removeCard,
  adjustIds,
  editCard,
} from "../store/slices/card-slice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

import Modal from "../components/modal";

export default function CreateFlashcards() {
  const dispatch = useDispatch();
  const { cardGroup } = useSelector((state) => state);
  const { card } = useSelector((state) => state);
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState(null);
  const [groupImg, setGroupImg] = useState(null);
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(1);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [groupExists, setGroupExists] = useState(false);
  const [editCardTerm, setEditCardTerm] = useState(null);

  function handleEditCard(e, item) {
    e.preventDefault();
    console.log(item);

    setEditCardTerm(item.term);

    // const editCardData = {
    //   prevTerm: item.term,
    //   newTerm: term,
    //   newDefinition: def,
    // };
    // dispatch(editCard(editCardData));
  }

  function handleGroupName(name) {
    setGroup(name);

    if (cardGroup) {
      cardGroup.map((item) => {
        if (item.group === name) {
          setDescription(item.description);
          setGroupImg(item.groupImg);
          setGroupExists(true);

          setCounter(item.noOfCards + 1);
        }
      });
    }
  }

  function onClose() {
    setShowModal(false);
  }

  function handleDeleteCard(e, item) {
    e.preventDefault();
    dispatch(removeCard(item.term));
    setCounter(counter - 1);
    setHasDeleted(true);
  }

  function handleSaveCard(e) {
    e.preventDefault();

    if (term != null && term.length > 0) {
      const cardData = {
        id: counter,
        term: term,
        definition: def,
        group: group,
        img: img,
      };
      setTerm("");

      setDef("");

      setImg(null);
      setCounter(counter + 1);
      dispatch(addCard(cardData));
    }
  }

  function handleSaveGroup(e) {
    e.preventDefault();

    handleSaveCard(e);
    console.log("term", term.length);
    let noOfcards;
    if (term != null && term.length > 0) {
      noOfcards = counter;
    } else {
      noOfcards = counter - 1;
    }

    if (!groupExists) {
      const groupData = {
        group: group,
        description: description,
        noOfCards: noOfcards,
        groupImg: groupImg,
      };
      dispatch(addGroup(groupData));
    } else {
      const groupData = {
        group: group,
        noOfCards: noOfcards,
      };
      console.log("groupData", groupData);
      dispatch(changeNoOfCards(groupData));
      dispatch(adjustIds(group));
    }
    if (hasDeleted) {
      dispatch(adjustIds(group));
    }

    setShowModal(true);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg">
        <form>
          <div className="my-5 ml-5 ">
            <div className="flex flex-row">
              <div>
                <p className="mb-2">Create Group*</p>
                <input
                  type="text"
                  onChange={(e) => handleGroupName(e.target.value)}
                  className="w-[20vw] h-[40px] rounded-lg"
                  required
                />
              </div>

              <div className=" h-100 items-center">
                {groupImg ? (
                  <div className="mt-3 ml-5 justify-center">
                    <img
                      src={URL.createObjectURL(groupImg)}
                      className="w-[15vw] h-[100px] rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mt-8 ml-5 inline-block">
                    <input
                      className="border border-lime-400 rounded-lg w-[20vw] h-[40px]"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setGroupImg(e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-5 ml-5">
            <p className="mb-2">Add Description</p>
            <textarea
              type="text"
              value={description}
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
                        disabled={editCardTerm === item.term ? false : true}
                        onChange={(e) => setTerm(e.target.value)}
                      />
                    </div>
                    <div className="mt-5 ml-5 inline-block">
                      <p className="mb-2">Enter Definition*</p>
                      <textArea
                        type="text"
                        className="w-[20vw] h-[40px] rounded-lg"
                        disabled={editCardTerm === item.term ? false : true}
                        onChange={(e) => setDef(e.target.value)}
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
                      <button onClick={(e) => handleDeleteCard(e, item)}>
                        <RiDeleteBin5Line className="h-[30px] w-[30px]" />
                      </button>
                      <button onClick={(e) => handleEditCard(e, item)}>
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
                value={def}
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
