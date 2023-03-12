import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Tabs from "../Tabs/Tabs";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import AddNoteImage from "../../assets/add-note-illustration.svg";
import FilterNotes from "../FilterNotes/FilterNotes";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchNotes, setSearchNotes] = useState("");

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesArr = [];
      querySnapshot.forEach((doc) => {
        notesArr.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notesArr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const notesList = [...notes];
  notesList.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="md:pl-[290px] px-5 flex flex-col items-center h-screen pb-5 w-full bg-white">
      <Search setSearchNotes={setSearchNotes} searchNotes={searchNotes} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {loading ? (
        <h2 className=" text-2xl text-[#00000099] mb-7">Loading Notes...</h2>
      ) : notes.length ? (
        <FilterNotes
          notesList={notesList.filter((n) => n.title.includes(searchNotes))}
          selectedTab={selectedTab}
        />
      ) : (
        <div className="mt-5">
          <h2 className=" md:text-4xl text-3xl text-[#00000099] mb-7">
            You don't have any notes
          </h2>
          <img src={AddNoteImage} alt="svg image" />
        </div>
      )}
    </div>
  );
}

export default NotesList;
