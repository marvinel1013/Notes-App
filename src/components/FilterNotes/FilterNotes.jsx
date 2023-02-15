import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import { tabs } from "../../config/config";

function FilterNotes({ notesList, selectedTab }) {
  return (
    <div className="pb-4">
      {selectedTab === "all" && (
        <div className="grid xl:grid-cols-2 gap-4">
          {notesList.map((note) => (
            <NoteCard key={note.id} notes={note} />
          ))}
        </div>
      )}
      {tabs.map(({ tab }, index) =>
        selectedTab === tab ? (
          <div key={index} className="grid xl:grid-cols-2 gap-4 w-full">
            {notesList.filter((c) => c.category === tab).length
              ? notesList
                  .filter((c) => c.category === tab)
                  .map((note) => <NoteCard key={note.id} notes={note} />)
              : selectedTab === "all" || (
                  <h2 className="  text-[#00000099]">No Notes</h2>
                )}
          </div>
        ) : null
      )}
    </div>
  );
}

export default FilterNotes;

// {notesList
//   .filter((c) => c.category === tab.tab)
//   .map((note) => (
//     <NoteCard key={note.id} notes={note} />
//   ))}
