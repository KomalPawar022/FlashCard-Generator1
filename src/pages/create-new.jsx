import { useState, useEffect } from "react";
import { addGroup, changeNoOfCards } from "../store/slices/group-slice";
import { useDispatch, useSelector } from "react-redux";
import {
  addCard,
  removeCard,
  adjustIds,
  editTerm,
  editDefinition,
  editImg,
} from "../store/slices/card-slice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import Modal from "../components/modal";

export default function CreateFlashcards() {
  const dispatch = useDispatch();
  const { cardGroup } = useSelector((state) => state);
  const { card } = useSelector((state) => state);
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState("");
  const [groupImg, setGroupImg] = useState(null);
  const [term, setTerm] = useState("");
  const [def, setDef] = useState("");
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(1);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [groupExists, setGroupExists] = useState(false);
  const [editCardId, setEditCardId] = useState(0);
  const [warningMsg, setWarningMsg] = useState("");

  useEffect(() => {
    if (warningMsg.length > 0) {
      setTimeout(() => {
        setWarningMsg("");
      }, 3000);
    }
  }, [warningMsg]);

  useEffect(() => {
    if (card != null && card.length > 0) {
      card.map((item) => {
        if (item.term === term) {
          setWarningMsg("The Term Already Exists");
          setTerm("");
        }
      });
    }
  }, [term]);

  async function handlesetImg(img, groupOrCard) {
    let url;
    const reader = new FileReader();
    if (img != null) {
      reader.readAsDataURL(img);

      reader.addEventListener("load", () => {
        url = reader.result;
        if (groupOrCard === "group") setGroupImg(url);
        else setImg(url);
      });
    }
  }

  function handleEditCard(e, item) {
    e.preventDefault();

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
        setDescription("");
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
      if (def != null && def.length > 0) {
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
      } else {
        setWarningMsg("The Card won't be saved");
      }
    } else {
      setWarningMsg("The Card won't be saved");
    }
  }

  function handleSaveGroup(e) {
    e.preventDefault();
    if (group != null) {
      handleSaveCard(e);

      let noOfcards;
      if (term != null && term.length > 0 && def != null && def.length > 0) {
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

        dispatch(changeNoOfCards(groupData));
        dispatch(adjustIds(group));
      }
      if (hasDeleted) {
        dispatch(adjustIds(group));
      }

      setShowModal(true);
    } else {
      setWarningMsg("Please Enter Group Name");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="text-xl font-bold animate-pulse text-red-800">
        {warningMsg.length > 0 ? warningMsg : null}
      </div>
      {/* -----Group----- */}
      <div
        className="night-mode-container bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg"
        style={{ minWidth: "385px" }}
      >
        <form>
          <div className="my-5 ml-5 ">
            <div className="flex flex-col sm:flex-row">
              <div>
                <p className="mb-2">Create Group*</p>
                <input
                  type="select"
                  value={group}
                  onChange={(e) => handleGroupName(e)}
                  className="w-[20vw] h-[40px] rounded-lg"
                  style={{ minWidth: "220px" }}
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
                  <div className="mt-3 sm:ml-5 justify-center">
                    <img
                      src={groupImg}
                      className="w-[15vw] h-[100px] rounded-lg"
                      style={{ minWidth: "145px" }}
                    />
                  </div>
                ) : (
                  <div className="mt-8 sm:ml-5 inline-block ">
                    <input
                      className="border  rounded-lg w-[20vw] h-[40px]"
                      style={{ minWidth: "210px" }}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlesetImg(e.target.files[0], "group")}
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
              value={description.toString()}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg lg:w-[800px] h-[80px] md:w-[500px]"
              style={{ minWidth: "300px" }}
            />
          </div>
        </form>
      </div>
      {/* -------Saved Cards-------- */}
      {card && card.length
        ? card.map((item) =>
            item.group === group ? (
              <div
                key={item.id}
                className="night-mode-container bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5"
                style={{ minWidth: "385px" }}
              >
                <form>
                  <div className="flex flex-col lg:flex-row ">
                    <div
                      className="ml-5 mt-5 h-[30px] w-[30px] bg-lime-400 rounded-full text-center"
                      style={{ minWidth: "30px", minHeight: "30px" }}
                    >
                      {item.id}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:ml-5">
                      <div className="mt-5 ml-5 inline-block ">
                        <p className="mb-2">Enter Term*</p>

                        <input
                          type="text"
                          className="w-[20vw] h-[40px] rounded-lg"
                          style={{ minWidth: "220px" }}
                          value={item.term}
                          disabled={editCardId === item.id ? false : true}
                          onChange={(e) => {
                            let flag = false;
                            if (card.length > 0) {
                              card.map((item) => {
                                if (item.term === e.target.value) {
                                  flag = true;
                                  setWarningMsg("The Term already Exists");
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
                        <textarea
                          type="text"
                          className="w-[20vw] h-[40px] rounded-lg"
                          style={{ minWidth: "220px" }}
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
                        </textarea>
                      </div>
                    </div>
                    <div className="flex flex-row mt-5 mb-5 mr-5 sm:ml-5">
                      <div className=" h-100 items-center flex flex-row md:flex-col ml-5 md:ml-0">
                        <div className="space-y-2 flex flex-col">
                          {item.img ? (
                            <div className="m-2 justify-center">
                              <img
                                src={item.img}
                                className="w-[15vw] h-[100px] rounded-lg "
                                style={{ minWidth: "145px" }}
                              />
                            </div>
                          ) : null}

                          {editCardId === item.id ? (
                            <div className="mt-5 inline-block">
                              <input
                                className="border  rounded-lg w-[20vw] h-[40px]"
                                style={{ minWidth: "210px" }}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={(e) => {
                                  const reader = new FileReader();
                                  let url = null;

                                  reader.readAsDataURL(e.target.files[0]);

                                  reader.addEventListener("load", () => {
                                    url = reader.result;
                                  });

                                  setTimeout(() => {
                                    if (url) {
                                      let imgData = {
                                        term: item.term,
                                        img: url,
                                      };

                                      dispatch(editImg(imgData));
                                    }
                                  }, 3000);
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3 mt-5">
                        <button onClick={(e) => handleDeleteCard(e, item)}>
                          <RiDeleteBin5Line className="h-[30px] w-[30px]" />
                        </button>
                        <button onClick={(e) => handleEditCard(e, item)}>
                          <FaRegEdit className="h-[30px] w-[30px] ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : null,
          )
        : null}
      {/* -------New Card---- */}
      <div
        className="night-mode-container bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg mt-5"
        style={{ minWidth: "385px" }}
      >
        <form>
          <div className="flex flex-col md:flex-row">
            <div
              className="mt-5 ml-5 h-[30px] w-[30px] bg-lime-400 rounded-full text-center"
              style={{ minWidth: "30px", minHeight: "30px" }}
            ></div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col sm:flex-row">
                <div className="mt-5  inline-block ml-5">
                  <p className="mb-2">Enter Term*</p>

                  <input
                    type="text"
                    className="w-[20vw] h-[40px] rounded-lg"
                    style={{ minWidth: "220px" }}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 ml-5 inline-block">
                  <p className="mb-2">Enter Definition*</p>

                  <textarea
                    type="text"
                    className="w-[20vw] h-[40px] rounded-lg"
                    style={{ minWidth: "220px" }}
                    onChange={(e) => setDef(e.target.value)}
                    required
                    value={def.toString()}
                  />
                </div>
              </div>
              <div className="lg:mt-0 h-100 items-center">
                {img ? (
                  <div className="mt-5 ml-5 justify-center">
                    <img src={img} className="w-[15vw] h-[100px] rounded-lg" />
                  </div>
                ) : (
                  <div className="mt-5 lg:mt-12 ml-5 inline-block">
                    <input
                      className="border rounded-lg w-[20vw] h-[40px] mt-1"
                      style={{ minWidth: "210px" }}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlesetImg(e.target.files[0], "card")}
                    />
                  </div>
                )}
              </div>
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
          className="border border-lime-400 rounded-lg w-[20vw] h-[40px] shadow-lg"
          onClick={handleSaveGroup}
          type="submit"
        >
          Create
        </button>
        {showModal && (
          <Modal
            onClose={onClose}
            body={<div>Data Saved</div>}
            header={<div>null</div>}
            footer={<div>null</div>}
          />
        )}
      </div>
    </div>
  );
}
