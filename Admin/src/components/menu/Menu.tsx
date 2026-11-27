import React, { useState } from 'react';
import { getMenu } from './data';
import MenuItem from './MenuItem';
import { useTranslation } from '../../hooks/useTranslation';
import { Bot, Sparkles, X, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role') || 'farmer';
  const [showAiModal, setShowAiModal] = useState(false);

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

      {/* AI Crop Assistant Card */}
      <div className="mt-auto p-4 rounded-2xl bg-[#F2EDE2] border border-[#E3DDD1] shadow-soft-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-[#1E3F2D] font-bold text-xs">
            <Bot className="w-4 h-4 text-[#2E6845]" />
            <span>AI Crop Assistant</span>
          </div>
          <span className="text-[9px] font-semibold text-emerald-800 bg-amber-100 px-2 py-0.5 rounded-full border border-emerald-200">
            Under service
          </span>
        </div>

        <p className="text-[11px] text-[#55695E] leading-relaxed mb-3">
          Get real-time crop disease diagnosis, pest solutions &amp; farming guidance.
        </p>

        <button
          type="button"
          onClick={() => setShowAiModal(true)}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-[#1E3F2D] hover:bg-[#163324] text-[#FAF8F3] rounded-xl text-xs font-bold shadow-soft-xs transition-all hover:scale-[1.02] active:scale-95"
        >
          <Bot className="w-3.5 h-3.5" />
          Chat with AI
        </button>
      </div>

      {/* AI Assistant Roadmap Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Feature is under service</span>
            </div>

            <h3 className="text-xl font-extrabold text-[#1E3F2D] mb-2">
              FarmBridge AI Vision Chatbot
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Our intelligent multimodal AI chatbot is currently <strong>under service</strong> and will be <strong>available soon</strong>. Once live, it will empower grassroots farmers with:
            </p>

            <ul className="space-y-2 mb-6 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Crop Disease Diagnosis:</strong> Snap and upload plant photographs to instantly identify fungal, bacterial, and pest infections.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Organic &amp; Chemical Treatments:</strong> Get dosage, pesticide names, and recovery schedules in Gujarati and Hindi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Hyperlocal Weather Advice:</strong> Actionable rain and frost warnings synced with OpenWeather API.</span>
              </li>
            </ul>

            <div className="flex flex-col gap-2">
              <Link
                to="/help"
                onClick={() => setShowAiModal(false)}
                className="w-full py-2.5 bg-[#1E3F2D] hover:bg-[#163324] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Submit Query to Support Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold text-center transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Roadmap Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-100">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Feature is under service</span>
            </div>

            <h3 className="text-xl font-extrabold text-[#1E3F2D] mb-2">
              FarmBridge AI Chatbot
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Our intelligent multimodal AI chatbot is currently <strong>under service</strong> and will be <strong>available soon</strong>. Once live, it will empower grassroots farmers with:
            </p>

            <ul className="space-y-2 mb-6 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Leaf Disease Diagnosis:</strong> Snap and upload plant photographs to instantly identify fungal, bacterial, and pest infections.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Organic &amp; Chemical Treatments:</strong> Get dosage, pesticide names, and recovery schedules in Gujarati and Hindi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✔</span>
                <span><strong>Hyperlocal Weather Advice:</strong> Actionable rain and frost warnings synced with OpenWeather API.</span>
              </li>
            </ul>

            <div className="flex flex-col gap-2">
              <Link
                to="/help"
                onClick={() => setShowAiModal(false)}
                className="w-full py-2.5 bg-[#1E3F2D] hover:bg-[#163324] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Submit Query to Support Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold text-center transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
