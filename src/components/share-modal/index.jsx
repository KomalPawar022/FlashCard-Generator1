//import "../modal/modal.css";
import { RWebShare } from "react-web-share";
import { LuCopy } from "react-icons/lu";
import { FaShareAlt } from "react-icons/fa";
export default function ShareModal({ onClose }) {
  return (
    <div className="z-1 fixed pt-[150px] top-0 left-0 w-full h-full justify-center items-center  bg-opacity-0">
      <div className="relative bg-lime-200 m-auto p-0 border border-lime-600 w-[80vw] text-center text-black-900 duration-75 m-2 rounded-xl">
        <div className="bg-lime-200 text-center text-black-900">
          Share
          <span onClick={onClose} className="close-modal-icon">
            ✖
          </span>
        </div>

        <div className="body flex flex-col justify-center items-center m-2">
          <div>
            <div className="flex flex-row">
              <input
                className="w-[20vw] h-[40px] rounded-lg border border-lime-600"
                value={window.location.href}
              />
              <LuCopy
                color="rgb(163 230 53)"
                className="h-[30px] w-[30px] ml-2 mt-1 cursor-pointer"
              />

              <RWebShare
                data={{
                  text: "",
                  url: window.location.href,
                  title: "Share",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <FaShareAlt
                  color="rgb(163 230 53)"
                  className="h-[30px] w-[30px] ml-2 mt-1 cursor-pointer"
                />
              </RWebShare>
            </div>
          </div>
        </div>
        <div className="h-[10px]"></div>
      </div>
    </div>
  );
}
