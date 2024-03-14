import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function ViewCard() {
  let { group } = useParams();
  group = group.substring(1, group.length);
  const { cardGroup } = useSelector((state) => state);
  const [groupName, setGroupName] = useState(null);
  const [groupDesc, setGroupDesc] = useState(null);
  const [noOfCards, setNoOfCards] = useState(0);
  const { card } = useSelector((state) => state);
  //const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedId, setSelectedId] = useState(1);
  const [cardData, setCardData] = useState([]);

  function handleOnClick(item) {
    setSelectedId(item.id);
    //setSelectedTerm(item.term);
  }

  useEffect(() => {
    if (cardGroup.length > 0) {
      console.log(true);
      cardGroup.map((item) => {
        if (item.group === group) {
          setGroupName(item.group);
          setGroupDesc(item.description);
          setNoOfCards(item.noOfCards);
        }
      });
    }
  }, []);
  useEffect(() => {
    let arr = [];
    if (card.length > 0) {
      card.map((item) => {
        if (item.group === groupName) {
          arr.push(item);
        }
      });
      setCardData(arr);
      console.log(cardData);
    }
  }, [groupName]);

  function handleLeftClick() {
    if (selectedId === 1) {
      setSelectedId(noOfCards);
    } else {
      setSelectedId(selectedId - 1);
    }
  }

  function handleRightClick() {
    if (selectedId === noOfCards) {
      setSelectedId(1);
    } else {
      setSelectedId(selectedId + 1);
    }
  }

  return (
    <div>
      <div className="flex flex-row">
        <Link to="/my-flashcards">
          <FaArrowAltCircleLeft className="h-[30px] w-[30px] ml-5 cursor-pointer" />
        </Link>

        <div className="flex flex-col text-bold justify-left items-start ml-8 mb-5">
          <h1 className="font-bold text-2xl">{groupName}</h1>
          <h3>{groupDesc}</h3>
        </div>
      </div>
      <div className="flex flex-row m-10 justify-self-center">
        <div className="flex flex-col justify-center shadow-lg bg-lime-200 gap-2 w-[200px] h-fit ml-5 rounded-xl mt-6">
          <ul className="text-center space-y-3 mb-3">
            <li className="font-semibold text-center">FlashCards</li>
            <hr className="h-[4px] color-lime-400 bg-lime-400" />

            {cardData?.map((item) => {
              return (
                <li
                  key={item.id}
                  className={
                    selectedId === item.id
                      ? "font-bold text-lime-400 cursor-pointer"
                      : "font-semibold hover:text-lime-400 cursor-pointer"
                  }
                  onClick={() => handleOnClick(item)}
                >
                  {item.term}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center  shadow-lg bg-lime-200 gap-2 w-[700px] h-[400px] ml-5 rounded-xl">
            {cardData?.map((item) => {
              if (item.id === selectedId) {
                return (
                  <div
                    key={item.id}
                    className="flex justify-center items-center m-5"
                  >
                    <div className="flex flex-row">
                      {item.img ? (
                        <img
                          src={URL.createObjectURL(item.img)}
                          className="w-[20vw] h-[200px] rounded-lg"
                        />
                      ) : null}

                      <p className="text-center p-3">{item.definition}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex flex-row justify-center items-center mt-5">
            <FiArrowLeftCircle
              color="rgb(163 230 53)"
              className="mr-3 h-[20px] w-[20px] cursor-pointer"
              onClick={handleLeftClick}
            />
            <h3>
              {selectedId}/{noOfCards}
            </h3>
            <FiArrowRightCircle
              color="rgb(163 230 53)"
              className="ml-3 h-[20px] w-[20px] cursor-pointer"
              onClick={handleRightClick}
            />
          </div>
        </div>
        <div className="flex flex-col  h-[200px] m-5 gap-3">
          <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
            <div className="flex flex-row justify-center items-center p-2">
              <FaRegShareFromSquare className="mr-2" />
              Share
            </div>
          </button>
          <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
            <div className="flex flex-row justify-center items-center p-2">
              <FaCloudDownloadAlt className="mr-2" />
              Download
            </div>
          </button>
          <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
            <div className="flex flex-row justify-center items-center p-2">
              <IoPrint className="mr-2" />
              Print
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
