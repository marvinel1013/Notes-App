import React from "react";
import { Toaster } from "react-hot-toast";
import MenuBar from "./components/MenuBar/MenuBar";
import NotesList from "./components/NotesList/NotesList";
import Sidebar from "./components/SideBar/Sidebar";

function App() {
  return (
    <div>
      <div>
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="md:hidden">
          <MenuBar />
        </div>
      </div>
      <div>
        <NotesList />
      </div>
      <Toaster position="top-left" />
    </div>
  );
}

export default App;
