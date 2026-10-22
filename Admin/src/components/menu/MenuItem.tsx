import React from "react";
import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
  }>;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, catalog, listItems }) => {
  return (
    <div className="w-full flex flex-col items-stretch gap-1">
      <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#859288] mb-1">
        {catalog}
      </span>
      {listItems.map((listItem, index) => {
        const commonClasses =
          "w-full px-3.5 py-2.5 justify-start flex items-center gap-3 transition-colors duration-150 rounded-xl text-xs font-semibold";
        const hoverClasses =
          "hover:bg-[#ECE7DC] hover:text-[#183B2B]";
        const activeClasses =
          "bg-[#1E3F2D] text-[#FBF9F5] shadow-soft-xs font-bold";

        if (listItem.isLink) {
          return (
            <NavLink
              key={index}
              onClick={onClick}
              to={listItem.url || ""}
              className={({ isActive }) =>
                `${commonClasses} ${
                  isActive
                    ? activeClasses
                    : `text-[#4F5D52] ${hoverClasses}`
                }`
              }
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors`}
              >
                <listItem.icon className="w-4 h-4 flex-shrink-0" />
              </div>
              <span className="truncate">{listItem.label}</span>
            </NavLink>
          );
        } else {
          return (
            <button
              key={index}
              onClick={listItem.onClick}
              className={`${commonClasses} text-slate-600 ${hoverClasses}`}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                <listItem.icon className="w-4 h-4 flex-shrink-0" />
              </div>
              <span className="truncate">{listItem.label}</span>
            </button>
          );
        }
      })}
    </div>
  );
};

export default MenuItem;
