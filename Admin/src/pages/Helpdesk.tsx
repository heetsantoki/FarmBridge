import React, { useState } from 'react';
import { TabGroup } from "../components/TabGroup";
import { Help } from "./Help";
import { Issues } from "../pages/Admin/Issues";

export const Helpdesk = () => {
  const [activeTab, setActiveTab] = useState("help");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex flex-col items-center mb-8">
          <TabGroup
            tabs={[
              { key: "help", label: "Submit Request" },
              { key: "issues", label: "View Requests" }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab === "help" ? <Help /> : <Issues />}
      </div>
    </div>
  );
};