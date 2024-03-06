import CardTile from "../components/card-tile";

export default function MyFlashcards() {
  return (
    <div>
      <CardTile
        group={localStorage.getItem("group")}
        description={localStorage.getItem("description")}
      />
    </div>
  );
}
