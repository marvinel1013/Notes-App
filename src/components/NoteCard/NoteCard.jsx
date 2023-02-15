import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoColorPaletteSharp } from "react-icons/io5";
import { format } from "date-fns";
import ColorToolTip from "../ToolTip/ColorToolTip";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import UpdateNote from "../UpdateNote/UpdateNote";
import { toast } from "react-hot-toast";

function NoteCard({ notes }) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [updateNote, setUpdateNote] = useState(false);

  const handleDeleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    toast.success("Note Deleted Successfully!", {
      className: " bg-green-100",
      position: "top-center",
      duration: 2000,
    });
  };

  return (
    <div
      className={
        "px-3 pb-3 relative rounded-md text-white w-[350px] md:w-[404px] h-[190px] md:h-[210px] grid grid-rows-[20%,70%,10%]" +
        " " +
        notes.color
      }
    >
      {/* Tooltip */}
      {openTooltip && (
        <ColorToolTip setOpenTooltip={setOpenTooltip} notes={notes} />
      )}

      {/* Title and Tools */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg overflow-x-auto w-full">{notes.title}</h2>
        <div className="flex items-center text-gray-300">
          <span
            title="Change color"
            onClick={() => setOpenTooltip((prev) => !prev)}
            className="cursor-pointer"
          >
            <IoColorPaletteSharp size={23} />
          </span>
          <span
            onClick={() => setUpdateNote(true)}
            title="Edit note"
            className="cursor-pointer"
          >
            <MdEdit size={23} />
          </span>
          <span
            onClick={() => handleDeleteNote(notes.id)}
            title="Delete note"
            className="cursor-pointer"
          >
            <MdDelete size={23} />
          </span>
        </div>
      </div>

      {/*Notes Description */}
      {updateNote ? (
        <UpdateNote notes={notes} setUpdateNote={setUpdateNote} />
      ) : (
        <div className="text-sm overflow-y-auto">{notes.description}</div>
      )}

      {/* Notes Date and Time */}
      <div>
        {updateNote || (
          <small className="font-thin">
            {format(new Date(notes.date), "p / MMM d, yyyy")}
          </small>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
