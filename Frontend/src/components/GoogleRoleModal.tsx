import React, { useState } from "react";
import { Sprout, ShoppingBag, ArrowRight, Check, Loader2, X } from "lucide-react";

interface GoogleRoleModalProps {
  isOpen: boolean;
  googleName?: string;
  googleEmail?: string;
  onSelectRole: (role: "farmer" | "buyer") => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const GoogleRoleModal: React.FC<GoogleRoleModalProps> = ({
  isOpen,
  googleName,
  googleEmail,
  onSelectRole,
  onCancel,
  isLoading,
}) => {
  const [selectedRole, setSelectedRole] = useState<"farmer" | "buyer">("farmer");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F3] border border-[#E8E4DA] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#1A261D]">
        {/* Close button */}
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4EF] text-[#1E3F2D] text-xs font-semibold border border-[#D5E4D8]">
            <Sprout className="w-3.5 h-3.5 text-[#1E3F2D]" />
            First-Time Google Setup
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1A261D]">
            Welcome, {googleName || "Friend"}! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6B5F]">
            We detected that this is your first time logging in with <strong className="text-[#1A261D]">{googleEmail}</strong>. Please select your role to continue:
          </p>
        </div>

        {/* Role Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Farmer Option */}
          <div
            onClick={() => setSelectedRole("farmer")}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between ${
              selectedRole === "farmer"
                ? "border-[#1E3F2D] bg-[#EEF4EF] shadow-soft-xs"
                : "border-[#E8E4DA] bg-white hover:border-[#CAD8CD]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1E3F2D] text-[#FAF8F3] flex items-center justify-center mb-3">
                <Sprout className="w-5 h-5" />
              </div>
              {selectedRole === "farmer" && (
                <div className="w-5 h-5 rounded-full bg-[#1E3F2D] text-[#FAF8F3] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1A261D] mb-1">
                🌾 I am a Farmer
              </h3>
              <p className="text-[11px] text-[#5C6B5F] leading-relaxed">
                List and sell fresh crops directly to verified commercial buyers at transparent prices.
              </p>
            </div>
          </div>

          {/* Buyer Option */}
          <div
            onClick={() => setSelectedRole("buyer")}
            className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between ${
              selectedRole === "buyer"
                ? "border-[#1E3F2D] bg-[#EEF4EF] shadow-soft-xs"
                : "border-[#E8E4DA] bg-white hover:border-[#CAD8CD]"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1E3F2D] text-[#FAF8F3] flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {selectedRole === "buyer" && (
                <div className="w-5 h-5 rounded-full bg-[#1E3F2D] text-[#FAF8F3] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1A261D] mb-1">
                🛒 I am a Buyer
              </h3>
              <p className="text-[11px] text-[#5C6B5F] leading-relaxed">
                Source agricultural produce directly from verified farmers across various regions.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelectRole(selectedRole)}
          disabled={isLoading}
          className="w-full py-3.5 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs sm:text-sm rounded-xl shadow-soft-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Confirm as {selectedRole === "farmer" ? "Farmer" : "Commercial Buyer"} & Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
