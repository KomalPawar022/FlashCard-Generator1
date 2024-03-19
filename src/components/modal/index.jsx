//Modal that shows after the group is created
import { Link } from "react-router-dom";
export default function Modal({ body, onClose }) {
  return (
    <div className=" night-mode-container z-1 fixed pt-[200px] top-0 left-0 w-full h-full justify-center items-center  bg-opacity-0 transition duration-150 ease-in-out">
      <div className="relative bg-white m-auto p-0 shadow-2xl border-lime-600 border-4 w-[80vw] text-center text-black-900 duration-75  rounded-xl h-[200px] justify-center items-center">
        <div className="bg-white-900 text-center text-black-900 justify-center items-center"></div>
        <nav>
          <span
            onClick={onClose}
            className="night-mode-container float-right text-2xl cursor-pointer mr-5"
          >
            <Link to="/my-flashcards">✖</Link>
            {/* After clicking on close button My Flashcards page opens */}
          </span>
        </nav>

        <div className="flex flex-col justify-center items-center m-2 bg-white-900 mt-15 h-full">
          <h1 className="font-bold text-2xl"> {body ? body : null}</h1>
        </div>
        <div className="h-[10px]"></div>
      </div>
    </div>
  );
}
