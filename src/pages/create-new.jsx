import Card from "../components/card";
import { useState } from "react";

export default function CreateFlashcards() {
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState(null);

  function handleSubmit() {
    console.log(group, description);
    localStorage.setItem("group", group);
    localStorage.setItem("description", description);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-lime-200 flex flex-col  w-[80vw] rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="my-5 ml-5">
            <p className="mb-2">Create Group*</p>
            <input
              type="text"
              onChange={(e) => setGroup(e.target.value)}
              className="w-[20vw] h-[40px]"
            />
            <input type="file" className="ml-2 bg-white-100" />
          </div>
          <div className="my-5 ml-5">
            <p className="mb-2">Add Description</p>
            <textarea
              type="text"
              cols="80"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <Card />
    </div>
  );
}
