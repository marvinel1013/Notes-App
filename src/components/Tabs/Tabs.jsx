import React from "react";

function Tabs({ selectedTab, setSelectedTab }) {
  const tabs = [
    {
      tab: "All",
      value: "all",
    },

    {
      tab: "Home",
      value: "home",
    },

    {
      tab: "Work",
      value: "work",
    },

    {
      tab: "Personal",
      value: "personal",
    },
  ];

  return (
    <div className="w-[73%] border-b mb-5">
      <div className="flex justify-center gap-2 mb-4">
        {tabs.map((tab, index) => (
          <span
            onClick={() => setSelectedTab(tab.value)}
            key={index}
            className={`cursor-pointer p-3 px-6 rounded-lg  ${
              selectedTab === tab.value ? "bg-[#69BCFF] text-white" : ""
            }`}
          >
            {tab.tab}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
