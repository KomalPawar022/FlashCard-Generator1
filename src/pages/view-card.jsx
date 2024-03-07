import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoPrint } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function ViewCard() {
  let { group } = useParams();
  group = group.substring(1, group.length);
  const { cardGroup } = useSelector((state) => state);
  const { card } = useSelector((state) => state);
  const [selectedTerm, setSelectedTerm] = useState(null);

  return (
    <div>
      <div className="flex flex-row">
        <Link to="/my-flashcards">
          <FaArrowAltCircleLeft className="h-[30px] w-[30px] ml-5 cursor-pointer" />
        </Link>
        {cardGroup?.map((item) => {
          if (item.group === group) {
            return (
              <div className="flex flex-col text-bold justify-left items-start ml-8 mb-5">
                <h1 className="font-bold text-2xl">{item.group}</h1>
                <h3>{item.description}</h3>
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-row m-10 justify-self-center">
        <div className="flex flex-col justify-center shadow-lg bg-lime-200 gap-2 w-[200px] h-fit ml-5 rounded-xl mt-6">
          <ul className="text-center space-y-3 mb-3">
            <li className="font-semibold text-center">FlashCards</li>
            <hr className="h-[4px] color-lime-400 bg-lime-400" />
            {card?.map((item) => {
              if (item.group === group) {
                return (
                  <li
                    className={
                      selectedTerm === item.term
                        ? "font-bold text-lime-400 cursor-pointer"
                        : "font-semibold hover:text-lime-400 cursor-pointer"
                    }
                    onClick={() => setSelectedTerm(item.term)}
                  >
                    {item.term}
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="flex flex-col justify-center  shadow-lg bg-lime-200 gap-2 w-[700px] h-[400px] ml-5 rounded-xl">
          {card?.map((item) => {
            if (item.term === selectedTerm) {
              return (
                <div className="flex justify-center items-center m-5">
                  <div className="flex flex-row">
                    <img
                      src={URL.createObjectURL(item.img)}
                      className="w-[20vw] h-[200px] rounded-lg"
                    />
                    <p className="text-center p-3">{item.definition}</p>
                  </div>
                </div>
              );
            }
          })}
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
