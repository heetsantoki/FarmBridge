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

export function LanguageSelector() {
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
    <div className="fixed top-5 right-4 z-50">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] bg-white border border-gray-200 mt-1">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="hover:bg-gray-50"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}