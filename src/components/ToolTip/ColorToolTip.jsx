import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { noteColor as colors } from "../../config/config";
import { toast } from "react-hot-toast";
function ColorToolTip({ setOpenTooltip, notes }) {
  const [selected, setSelected] = useState(notes.color);

  const handleChangeColor = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      color: selected,
    });
    setOpenTooltip(false);
    toast.success("Color successfully changed!", {
      className: " bg-green-100",
      position: "top-center",
      duration: 2000,
    });
  };

  return (
    <div className="absolute z-10 top-8 bg-white rounded-md px-2 w-[185px] right-2">
      <div className="my-5 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {colors.map((color, index) => (
            <span
              onClick={() => setSelected(color.color)}
              key={index}
              className={`p-2.5 px-2.5 rounded cursor-pointer ${color.color} ${
                color.color === selected ? " border-2 border-blue-600" : ""
              }`}
            ></span>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleChangeColor(notes)}
            className="text-sm text-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => setOpenTooltip(false)}
            className="text-sm text-blue-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorToolTip;
