import GroupTile from "../components/group-tile";
import { useSelector } from "react-redux";

export default function MyFlashcards() {
  const { cardGroup } = useSelector((state) => state);
  return (
    <div>
      {cardGroup && cardGroup.length ? (
        <div className="min-h-[80vh] grid sm:grid-cols-2  lg:grid-cols-3 max-w-6xl mx-auto p-3">
          {cardGroup.map((item, index) => (
            <GroupTile
              key={index}
              group={item.group}
              description={item.description}
              noOfCards={item.noOfCards}
              groupImg={item.groupImg}
            />
          ))}
        </div>
      ) : (
        <h1>No Groups</h1>
      )}
    </div>
  );
}
