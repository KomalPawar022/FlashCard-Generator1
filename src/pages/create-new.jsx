import { useState, useEffect } from "react";
import { addGroup, changeNoOfCards } from "../store/slices/group-slice";
import { useDispatch, useSelector } from "react-redux";

import {
  addCard,
  removeCard,
  adjustIds,
  editTerm,
  editDefinition,
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
  const [editCardId, setEditCardId] = useState(0);
  const [duplicateTerm, setDuplicateTerm] = useState(false);

  // function handleChange(event) {
  //   const query = event.target.value.toLowerCase();
  //   setSearchParam(query);
  //   if (query.length > 1) {
  //     const filteredData =
  //       cardGroup && cardGroup.length > 0
  //         ? cardGroup.filter(
  //             (item) => item.group.toLowerCase().indexOf(query) > -1,
  //           )
  //         : [];
  //     setGroupNameList(filteredData);
  //     setShowDropdown(true);
  //   } else {
  //     setShowDropdown(false);
  //   }
  // }

  useEffect(() => {
    if (card.length > 0) {
      card.map((item) => {
        if (item.term === term) {
          console.log("Term Aready Exixts");
          setDuplicateTerm(true);
          setTerm("");
        } else {
          setTimeout(() => {
            setDuplicateTerm(false);
          }, 4000);
        }
      });
    }
  }, [term]);

  function handleEditCard(e, item) {
    e.preventDefault();
    console.log(item);

    setEditCardId(item.id);
  }

  function handleGroupName(event) {
    setGroup(event.target.value);

    if (cardGroup) {
      let flag = false;
      cardGroup.map((item) => {
        if (item.group === event.target.value) {
          setDescription(item.description);
          setGroupImg(item.groupImg);
          setGroupExists(true);
          flag = true;
          setCounter(item.noOfCards + 1);
        }
      });
      if (!flag) {
        setDescription(null);
        setGroupImg(null);
        setGroupExists(false);
        setCounter(1);
      }
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
      <div className="text-xl font-bold animate-pulse text-red-800">
        {duplicateTerm ? "Term Already Exists" : null}
      </div>
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg">
        <form>
          <div className="my-5 ml-5 ">
            <div className="flex flex-row">
              <div>
                <p className="mb-2">Create Group*</p>
                <input
                  type="select"
                  value={group}
                  onChange={(e) => handleGroupName(e)}
                  className="w-[20vw] h-[40px] rounded-lg"
                  list="groupList"
                  required
                />
                <datalist id="groupList">
                  {cardGroup && cardGroup.length
                    ? cardGroup.map((item, index) => (
                        <option key={index}>{item.group}</option>
                      ))
                    : null}
                </datalist>
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
                        placeholder={
                          duplicateTerm ? "Term already exists" : null
                        }
                        className="w-[20vw] h-[40px] rounded-lg"
                        value={item.term}
                        disabled={editCardId === item.id ? false : true}
                        onChange={(e) => {
                          let flag = false;
                          if (card.length > 0) {
                            card.map((item) => {
                              if (item.term === e.target.value) {
                                flag = true;
                                setDuplicateTerm(true);
                              }
                            });
                          }
                          if (!flag) {
                            dispatch(
                              editTerm({
                                prevTerm: item.term,
                                newTerm: e.target.value,
                              }),
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="mt-5 ml-5 inline-block">
                      <p className="mb-2">Enter Definition*</p>
                      <textArea
                        type="text"
                        className="w-[20vw] h-[40px] rounded-lg"
                        disabled={editCardId === item.id ? false : true}
                        onChange={(e) =>
                          dispatch(
                            editDefinition({
                              term: item.term,
                              definition: e.target.value,
                            }),
                          )
                        }
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
                // placeholder={duplicateTerm ? "Term already exists" : null}
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
