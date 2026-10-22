import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ArrowRight, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/LanguageSelector";

export default function FAQPage() {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState<string>("general");
  const [openQuestion, setOpenQuestion] = useState<string | null>("what-is-FarmBridge");

  const faqCategories: Record<string, { title: string; description: string; questions: Array<{ id: string; question: string; answer: string }> }> = {
    general: {
      title: t("faq.categories.general.title", "General Platform"),
      description: t("faq.categories.general.description", "Everything about FarmBridge's mission, verification, and operations."),
      questions: [
        { 
          id: "what-is-FarmBridge", 
          question: t("faq.categories.general.questions.what-is-FarmBridge.question", "What is FarmBridge and how does it work?"),
          answer: t("faq.categories.general.questions.what-is-FarmBridge.answer", "FarmBridge is a peer-to-peer agricultural marketplace connecting Indian farmers directly with commercial buyers, flour mills, food processors, and wholesale retailers without intermediary commission agents.")
        },
        { 
          id: "how-to-register", 
          question: t("faq.categories.general.questions.how-to-register.question", "How do I register as a farmer or buyer?"),
          answer: t("faq.categories.general.questions.how-to-register.answer", "Simply click 'Get Started' on the navigation bar, select your role (Farmer or Buyer), provide your contact and Aadhaar/GST details for verification, and access your dashboard instantly.")
        },
      ],
    },
    farmers: {
      title: t("faq.categories.farmers.title", "Farmer Producers"),
      description: t("faq.categories.farmers.description", "Listing crops, price setting, and guaranteed payment settlements."),
      questions: [
        { 
          id: "how-to-list", 
          question: t("faq.categories.farmers.questions.how-to-list.question", "How do I list my harvest on FarmBridge?"),
          answer: t("faq.categories.farmers.questions.how-to-list.answer", "Navigate to your Farmer Dashboard, click 'Add Crop', upload photos of your harvest, enter variety, quantity (in Quintals/KGs), asking price, and AGMARK moisture parameters.")
        },
        { 
          id: "payment-process", 
          question: t("faq.categories.farmers.questions.payment-process.question", "When do I receive payment for my sold crop?"),
          answer: t("faq.categories.farmers.questions.payment-process.answer", "Payments are held securely in escrow by the buyer and credited directly to your bank account within 24 hours of successful lot dispatch and weighment verification.")
        },
      ],
    },
    buyers: {
      title: t("faq.categories.buyers.title", "Commercial Buyers"),
      description: t("faq.categories.buyers.description", "Bulk procurement, quality testing, and logistics coordination."),
      questions: [
        { 
          id: "quality-assurance", 
          question: t("faq.categories.buyers.questions.quality-assurance.question", "How is produce quality ensured?"),
          answer: t("faq.categories.buyers.questions.quality-assurance.answer", "Every lot listing includes crop specifications, moisture testing data, and grade certificates. Pre-dispatch inspection or sample testing can also be arranged.")
        },
        { 
          id: "bulk-ordering", 
          question: t("faq.categories.buyers.questions.bulk-ordering.question", "Can we arrange reefer freight or truck logistics through FarmBridge?"),
          answer: t("faq.categories.buyers.questions.bulk-ordering.answer", "Yes. FarmBridge partners with verified agricultural transport providers across India to provide farm-gate pickup and doorstep warehouse delivery.")
        },
      ],
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center mb-2">
            <LanguageSelector />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <HelpCircle className="w-3.5 h-3.5 text-[#A3B899]" />
            Frequently Asked Questions
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            How Can We Help You Today?
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Find quick, authoritative answers to common inquiries regarding digital trade, pricing discovery, and escrow payments.
          </p>
        </div>
      </section>

      {/* 2. CATEGORIES SELECTOR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {Object.keys(faqCategories).map((categoryKey) => {
            const cat = faqCategories[categoryKey];
            const isActive = openCategory === categoryKey;
            return (
              <div
                key={categoryKey}
                onClick={() => setOpenCategory(categoryKey)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-200 border ${
                  isActive
                    ? "bg-white border-[#1E3F2D] shadow-soft text-[#1A261D]"
                    : "bg-[#FAF8F3] border-[#E8E4DA] hover:bg-white text-[#5C6B5F]"
                }`}
              >
                <h3 className={`font-semibold text-base mb-1 ${isActive ? "text-[#1E3F2D]" : "text-[#1A261D]"}`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-[#5C6B5F] leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. ACCORDION QUESTIONS */}
        <div className="space-y-4">
          {faqCategories[openCategory]?.questions.map((faq) => {
            const isOpen = openQuestion === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#1A261D] hover:text-[#1E3F2D] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7F8B82] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#1E3F2D]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C6B5F] leading-relaxed border-t border-[#E8E4DA]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. STILL HAVE QUESTIONS */}
      <section className="py-12 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center mx-auto border border-[#D5E4D8]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-semibold text-[#1A261D]">Still have questions?</h2>
          <p className="text-xs sm:text-sm text-[#5C6B5F] max-w-md mx-auto">
            Our agricultural support team is available Monday to Saturday to assist you with registration or pricing verification.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors"
            >
              Contact Support Desk
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}