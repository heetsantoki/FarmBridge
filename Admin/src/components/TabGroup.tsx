import React from 'react';

interface Tab {
  key: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (key: string) => void;
}

export const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex justify-center bg-background/50 backdrop-blur-sm rounded-full p-1 border border-border/40">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === tab.key
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};