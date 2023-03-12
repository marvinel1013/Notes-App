import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../../firebase/firebase";

function UpdateNote({ notes, setUpdateNote }) {
  const [updateTitle, setUpdateTitle] = useState(notes.title);
  const [updateDescription, setUpdateDescription] = useState(notes.description);

  const updateNote = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      title: updateTitle,
      description: updateDescription,
    });
    setUpdateNote(false);

    notes.title !== updateTitle || notes.description !== updateDescription
      ? toast.success("Note updated successfully!", {
          className: " bg-green-100",
          position: "top-center",
          duration: 2000,
        })
      : toast.error("Note did not change!", {
          className: " bg-red-100",
          position: "top-center",
          duration: 2000,
        });
  };

  return (
    <div className={"w-full h-full text-gray-600 mt-[-33px]"}>
      <div>
        <input
          onChange={(e) => setUpdateTitle(e.target.value)}
          autoFocus
          value={updateTitle}
          type="text"
          className="w-full p-1 outline-none mb-2 bg-white rounded-sm px-1"
        />
        <textarea
          onChange={(e) => setUpdateDescription(e.target.value)}
          value={updateDescription}
          cols="35"
          rows="4"
          className="w-full resize-none outline-none bg-white rounded-sm px-1"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => updateNote(notes)}
          className="text-white bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg z-40"
        >
          Save
        </button>
        <button
          onClick={() => setUpdateNote(false)}
          className="text-white bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg z-40"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateNote;

// if (
//   notes.title === updateTitle &&
//   notes.description === updateDescription
// ) {
//   toast.success("Note updated successfully!", {
//     className: " bg-green-100",
//     position: "top-center",
//     duration: 2000,
//   });
// } else {
//   toast.error("Note did not change!", {
//     className: " bg-red-100",
//     position: "top-center",
//     duration: 2000,
//   });
// }
