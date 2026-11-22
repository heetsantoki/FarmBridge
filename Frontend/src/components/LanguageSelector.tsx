import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "gu", name: "ગુજરાતી" },
];

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem("preferredLanguage", value);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage") || localStorage.getItem("selectedLanguage");
    if (storedLang && (storedLang === "en" || storedLang === "hi" || storedLang === "gu") && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
      setSelectedLanguage(storedLang);
    }
  }, [i18n]);

  return (
    <div className={`relative inline-block ${className}`}>
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full min-w-[110px] bg-white border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] h-9 px-3 hover:bg-[#F2EDE2]/50 transition-colors">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#E8E4DA] rounded-xl shadow-soft">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="hover:bg-[#F2EDE2] text-xs font-medium cursor-pointer"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}