"use client";

import { useState } from "react";
import PersonalProfile from "./PersonalProfile";
import ProfessionalProfile from "./ProfessionalProfile";
import PersonalityDetails from "./PersonalityDetails";

const tabs = [
  { name: "Personal Profile", key: "personal" },
  { name: "Professional Profile", key: "professional" },
  { name: "Personality Details", key: "personality" },
  { name: "Preferences", key: "preferences" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Flowbite Styled Tabs */}
      <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 text-lg font-medium transition-all ${
              activeTab === tab.key
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === "personal" && <PersonalProfile />}
        {activeTab === "professional" && <ProfessionalProfile />}
        {activeTab === "personality" && <PersonalityDetails />}
      </div>
    </div>
  );
}
