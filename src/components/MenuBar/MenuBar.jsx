import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";
import { noteColor } from "../../config/config";
import { db } from "../../firebase/firebase";
import { toast } from "react-hot-toast";

function MenuBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-[#FF9100]");

  const handleAddNotes = async () => {
    if (
      titleText.trim().length &&
      descriptionText.trim().length &&
      categoryText.trim().length > 0
    ) {
      await addDoc(collection(db, "notes"), {
        title: titleText,
        description: descriptionText,
        category: categoryText,
        date: new Date().toLocaleString(),
        color: selectedColor,
      });
      toast.success("Note Added Successfully!", {
        className: " bg-green-100",
        position: "top-center",
        duration: 2000,
      });
      setTitleText("");
      setDescriptionText("");
      setSelectedColor("bg-[#FF9100]");
      setCategoryText("");
      setMenuOpen(false);
    } else {
      toast.error("Please complete the field below!", {
        className: "bg-red-100",
        duration: 2000,
      });
    }
  };

  const descriptionTextChange = (event) => {
    if (event.target.value.length <= 300) {
      setDescriptionText(event.target.value);
    }
  };

  const titleTextChange = (event) => {
    if (event.target.value.length <= 30) {
      setTitleText(event.target.value);
    }
  };
  const numOfCharacters = 300;
  return (
    <div>
      <div
        onClick={() => setMenuOpen(true)}
        className="fixed z-10 top-5 left-2 bg-purple-600 hover:bg-violet-600 p-3 rounded-full cursor-pointer"
      >
        <IoMenu size={25} color="white" />
      </div>
      {menuOpen && (
        <div>
          <div className="fixed z-10 h-full w-full backdrop-blur bg-gray-500/20">
            <div className="bg-white h-full w-[70%] p-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-500">Notes App</h2>
                <span
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-400 text-white cursor-pointer p-1 rounded-sm"
                >
                  <IoClose size={20} />
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <p className="text-lg">Create Notes 📘</p>

                {/* Category */}
                <select
                  value={categoryText}
                  onChange={(e) => setCategoryText(e.target.value)}
                  name="category"
                  className="border p-3 rounded w-full  outline-none cursor-pointer"
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                </select>

                {/* Title */}
                <input
                  value={titleText}
                  onChange={titleTextChange}
                  type="text"
                  placeholder="Add title..."
                  className=" border full p-3 rounded placeholder:text-gray-400 outline-none"
                />

                {/* Text Area */}
                <div className=" border p-2 rounded ">
                  <textarea
                    value={descriptionText}
                    onChange={descriptionTextChange}
                    placeholder="Add description..."
                    cols="32"
                    rows="5"
                    className="w-full p-2 rounded placeholder:text-gray-400 outline-none resize-none"
                  ></textarea>
                  <small className="p-2 font-thin text-gray-500">
                    {numOfCharacters - descriptionText.length} Remaining
                  </small>
                </div>

                {/* Colors */}
                <div>
                  <div className="my-5 flex items-center gap-2">
                    <span className="font-thin">Colors</span>
                    {noteColor.map((color, index) => (
                      <span
                        onClick={() => setSelectedColor(color.color)}
                        key={index}
                        className={`p-3 px-3 rounded cursor-pointer ${
                          color.color
                        } ${
                          color.color === selectedColor
                            ? " border-2 border-blue-600"
                            : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                  {/* Add Note Button */}
                  <button
                    onClick={handleAddNotes}
                    className="bg-blue-500 hover:bg-blue-400 p-2 w-full text-white rounded"
                  >
                    Add Notes
                  </button>
                  <div className="border-t-2 mt-10 py-8">
                    <small className="font-thin flex justify-center">
                      &copy;2023 by Marvinel Santos | All Rights Reserved
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
