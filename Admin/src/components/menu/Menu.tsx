import React from 'react';
import { getMenu } from './data';
import MenuItem from './MenuItem';
import { useTranslation } from '../../hooks/useTranslation';
import { HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role') || 'farmer';

  const translatedMenu = getMenu();

  const filteredMenu = translatedMenu.map((item) => ({
    ...item,
    listItems: item.listItems.filter((listItem) => listItem.role === role),
  }));

  return (
    <div className="w-full flex flex-col justify-between h-full space-y-6">
      <div className="w-full flex flex-col gap-4">
        {filteredMenu.map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
            listItems={item.listItems}
          />
        ))}
      </div>

      {/* Support / Advisory Card */}
      <div className="mt-auto p-4 rounded-2xl bg-[#F2EDE2] border border-[#E3DDD1] shadow-soft-xs">
        <div className="flex items-center gap-2 text-[#1E3F2D] font-bold text-xs mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#2E6845]" />
          <span>Farm Advisory Active</span>
        </div>
        <p className="text-[11px] text-[#55695E] leading-relaxed mb-3">
          Get real-time crop disease diagnosis & daily APMC mandi updates.
        </p>
        <Link
          to="/help"
          className="inline-flex items-center justify-center w-full py-2 bg-[#1E3F2D] hover:bg-[#163324] text-[#FAF8F3] rounded-xl text-xs font-bold shadow-soft-xs transition-colors"
        >
          Open Support Hub
        </Link>
      </div>
    </div>
  );
};

export default Menu;