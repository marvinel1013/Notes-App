import React from "react";
import { BsSearch } from "react-icons/bs";

function Search({ setSearchNotes, searchNotes }) {
  return (
    <div className="flex items-center justify-center w-full p-5">
      <div className="w-[75%] flex items-center justify-center bg-white shadow shadow-gray-400 px-4">
        <BsSearch size={23} color={"gray"} />
        <input
          value={searchNotes}
          onChange={(e) => setSearchNotes(e.target.value)}
          type="text"
          placeholder="Search Notes Title..."
          className="w-full p-3 outline-none"
        />
      </div>
    </div>
  );
}

export default Search;
