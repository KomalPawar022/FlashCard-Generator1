import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeGroup } from "../../store/slices/group-slice";
import { removeAll } from "../../store/slices/card-slice";
export default function GroupTile({ group, description, noOfCards, groupImg }) {
  const dispatch = useDispatch();
  function handleDeleteCard(e) {
    e.preventDefault();
    dispatch(removeGroup(group));
    dispatch(removeAll(group));
  }
  return (
    <>
      <div className="group flex flex-col justify-center items-center border-2 border-lime-300 gap-1 p-4 h-[360px] mt-10 ml-5 rounded-xl">
        <div className="rounded-full border border-lime-600 h-[100px] w-[100px] mt-3">
          {groupImg ? (
            <img src={groupImg} className="w-[99px] h-[99px] rounded-full" />
          ) : null}
        </div>
        <div className="flex p-1">
          <h1 className="font-bold text-2xl">{group}</h1>
        </div>
        <div className="flex p-1 flex-col space-y-1 justify-center items-center">
          <p className="w-full h-[70px] text-center break-all overflow-ellipsis overflow-hidden">
            {description}
          </p>
          <p>
            {noOfCards} {noOfCards === 1 ? "Card" : "Cards"}
          </p>
        </div>
        <div className="flex p-3 flex-row space-x-2">
          <button
            className="border border-lime-600 rounded-lg w-[15vw] h-[40px] text-lime-600 sm:min-w-[112px]"
            style={{ minWidth: "112px" }}
          >
            <Link to={`/view-card/:${group}`}>View Cards</Link>
          </button>

          <button onClick={(e) => handleDeleteCard(e)}>
            <RiDeleteBin5Line className="h-[30px] w-[30px]" />
          </button>
        </div>
      </div>
    </>
  );
}
