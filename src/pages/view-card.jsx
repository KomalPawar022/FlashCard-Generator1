import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { RWebShare } from "react-web-share";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import PDFComponent from "../components/pdf-component";

export default function ViewCard() {
  let { group } = useParams(); //To get URL parameters :- To know which group is selected
  group = group.substring(1, group.length); //to remove : from the URL
  //For Example it returns :Group1, it should be just Group1
  const { cardGroup } = useSelector((state) => state); //To retrieve the saved Groups
  const [groupName, setGroupName] = useState(null);
  const [groupDesc, setGroupDesc] = useState(null);
  const [noOfCards, setNoOfCards] = useState(0);
  const [groupImg, setGroupImg] = useState(null);
  // The above states will be set to the selected Group info from the retrieved saved Groups
  const { card } = useSelector((state) => state); //To retrieve the saved Cards
  const [selectedId, setSelectedId] = useState(1);
  const [cardData, setCardData] = useState([]); //to extract all the cards that have group as the selected group

  function handleOnClick(item) {
    setSelectedId(item.id);
  }

  //To set the Group Information
  useEffect(() => {
    if (cardGroup.length > 0) {
      cardGroup.map((item) => {
        if (item.group === group) {
          setGroupName(item.group);
          setGroupDesc(item.description);
          setNoOfCards(item.noOfCards);
          setGroupImg(item.groupImg);
        }
      });
    }
  }, []);

  //After the Group Information is set the cards data is set
  useEffect(() => {
    let arr = [];
    if (card.length > 0) {
      card.map((item) => {
        if (item.group === groupName) {
          arr.push(item);
        }
      });
      setCardData(arr);
    }
  }, [groupName]);

  //for carousal effect
  function handleLeftClick() {
    if (selectedId === 1) {
      setSelectedId(noOfCards);
    } else {
      setSelectedId(selectedId - 1);
    }
  }
  //for carousal effect
  function handleRightClick() {
    if (selectedId === noOfCards) {
      setSelectedId(1);
    } else {
      setSelectedId(selectedId + 1);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-row">
        <Link to="/my-flashcards">
          <FaArrowAltCircleLeft className="h-[30px] w-[30px] ml-5 cursor-pointer" />
        </Link>

        <div className="flex flex-col text-bold justify-left items-start ml-8 mb-5">
          <h1 className="font-bold text-2xl">{groupName}</h1>
          <div className="flex flex-col sm:flex-row  sm:items-center justify-center">
            <div className="w-auto ">
              <h3 className=" pr-2">{groupDesc}</h3>
            </div>
            {groupImg ? (
              <div className="mt-3 ml-2 justify-center w-[200px] h-[100px] mr-5 float-right">
                <img
                  src={groupImg}
                  className="w-[200px] h-[100px] rounded-lg mr-3"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-200 w-full h-[1px] mt-5 sm:invisible visible "></div>
      {/* ----Cards------- */}
      <div className="flex flex-col lg:flex-row justify-self-center m-10 justify-center ">
        <div className="flex flex-col sm:flex-row">
          <div
            className="night-mode-container flex flex-col justify-center shadow-lg bg-lime-200 gap-2 w-[200px] h-fit ml-5 rounded-xl mt-6"
            style={{ minWidth: "200px" }}
          >
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
          <div className="flex flex-col">
            <div className="night-mode-container flex flex-col justify-center flex-shrink  shadow-lg bg-lime-200 gap-2 w-[300px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[400px] ml-5 rounded-xl mt-5">
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
                            src={item.img}
                            className="w-[20vw] h-[200px] rounded-lg"
                            style={{ minWidth: "145px" }}
                          />
                        ) : null}

                        <p className="text-center p-3 break-all overflow-ellipsis overflow-hidden">
                          {item.definition}
                        </p>
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
                {noOfCards == 0 ? 0 : selectedId}/{noOfCards}
              </h3>
              <FiArrowRightCircle
                color="rgb(163 230 53)"
                className="ml-3 h-[20px] w-[20px] cursor-pointer"
                onClick={handleRightClick}
              />
            </div>
          </div>
        </div>
        {/* ---Buttons--- */}
        <div className="night-mode-container flex flex-col  h-[200px] m-5 gap-3">
          <RWebShare
            data={{
              text: "",
              url: window.location.href,
              title: "Share",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
              <div className="flex flex-row justify-center items-center p-2 r">
                <FaRegShareFromSquare className="mr-2" />
                Share
              </div>
            </button>
          </RWebShare>

          <PDFDownloadLink
            document={
              <PDFComponent
                groupName={groupName}
                groupDesc={groupDesc}
                groupImg={groupImg}
                card={cardData}
              />
            }
            fileName="flashcards.pdf"
          >
            <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
              <div className="flex flex-row justify-center items-center p-2">
                <FaCloudDownloadAlt className="mr-2" />
                Download
              </div>
            </button>
          </PDFDownloadLink>

          <BlobProvider
            document={
              <PDFComponent
                groupName={groupName}
                groupDesc={groupDesc}
                groupImg={groupImg}
                card={cardData}
              />
            }
          >
            {({ url }) => (
              <a href={url} target="_blank" rel="noreferrer">
                <button className="btn bg-lime-200 font-semibold w-[200px] h-[40px] rounded-xl shadow-lg">
                  <div className="flex flex-row justify-center items-center p-2">
                    <IoPrint className="mr-2" />
                    Print
                  </div>
                </button>
              </a>
            )}
          </BlobProvider>
        </div>
      </div>
    </div>
  );
}
