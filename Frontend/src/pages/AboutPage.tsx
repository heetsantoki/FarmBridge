import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Scale,
  TrendingUp,
  Sprout,
  Users,
  Award,
  ArrowRight,
  Heart,
  Landmark,
} from "lucide-react";

export default function AboutPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "gu" || i18n.language === "hi") ? i18n.language : "en";

  const content = {
    en: {
      heroBadge: "Our Mission & Agricultural Vision",
      heroTitle: "Bridging India's Farm Gate to Commercial Markets",
      heroDesc: "FarmBridge is a digital agricultural exchange transforming how crops are priced, verified, and traded across India with zero middlemen commissions.",
      impactFocus: "Impact Focus",
      farmerFirstModel: "Farmer-First Economic Model",
      marginsBoost: "+32% Margins",
      foundingBadge: "The Founding Purpose",
      foundingTitle: "Why We Built FarmBridge",
      foundingP1: "For generations, Indian farmers have faced steep intermediary fees, delayed payouts, and opaque mandi auctions where commission agents capture up to 40% of the harvest's retail value.",
      foundingP2: "FarmBridge was built as an academic and technological innovation at Marwadi University to replace exploitative supply chains with a verified, transparent, and direct e-commerce exchange.",
      zeroCommission: "₹0",
      zeroCommissionLabel: "Intermediary Commission Fees",
      settlement24h: "24 Hours",
      settlement24hLabel: "Direct Farmer Payment Cycle",
      guidingBadge: "Guiding Principles",
      guidingTitle: "Our Core Commitments",
      guidingSubtitle: "The ethical and technological standards driving our agricultural marketplace.",
      academicBadge: "Academic Innovation Hub",
      academicTitle: "Developed at Marwadi University",
      academicDesc: "Engineered with advanced full-stack architectures, real-time APMC indexing, and verified database schemas.",
      m2024Title: "Inception & Research",
      m2024Desc: "Initiated at Marwadi University Agri-Tech Lab to study mandi pricing disparities across western India.",
      m2025Title: "Direct Trading Prototype",
      m2025Desc: "Launched peer-to-peer farmer-buyer pilot across Gujarat and Maharashtra agricultural clusters.",
      m2026Title: "Enterprise Scaled Ecosystem",
      m2026Desc: "Over 10,000 farmers and 5,000 commercial buyers trading across 8 agricultural states.",
      ctaTitle: "Join the Direct Agriculture Movement",
      ctaDesc: "Whether you cultivate 2 acres or source 50 tons of grain monthly, FarmBridge ensures transparent fair-market execution.",
      ctaRegister: "Register Your Account",
      ctaBrowse: "Browse Marketplace Lots",
      v1Title: "Fair Pricing & Transparency",
      v1Desc: "Direct price discovery benchmarked to real-time APMC Mandi rates with zero intermediary commission cuts.",
      v2Title: "Direct Producer Settlement",
      v2Desc: "Guaranteed prompt 24-hour bank settlements to verified farmer accounts upon lot delivery confirmation.",
      v3Title: "AGMARK Quality Assurance",
      v3Desc: "Every crop lot includes moisture level testing, crop grading, and batch photos before sale execution.",
      v4Title: "Pan-India Freight Logistics",
      v4Desc: "On-demand verified freight matching from farm-gate storage straight to institutional buyer warehouses.",
    },
    gu: {
      heroBadge: "અમારું ધ્યેય અને કૃષિ વિઝન",
      heroTitle: "ભારતના ખેતરોને સીધા મોટા બજારો સાથે જોડતો સેતુ",
      heroDesc: "ફાર્મબ્રિજ એ એક ડિજિટલ કૃષિ પ્લેટફોર્મ છે જે વચેટીયા વગર ભારતના ખેડૂતો માટે પાકના પારદર્શક અને વાજબી ભાવ સુનિશ્ચિત કરે છે.",
      impactFocus: "મુખ્ય ફોકસ",
      farmerFirstModel: "ખેડૂત-પ્રથમ આર્થિક મોડેલ",
      marginsBoost: "+૩૨% વધુ નફો",
      foundingBadge: "સ્થાપનાનો મૂળ હેતુ",
      foundingTitle: "અમે શા માટે ફાર્મબ્રિજ બનાવ્યું?",
      foundingP1: "વર્ષોથી ભારતીય ખેડૂતો ઊંચા કમિશન, વિલંબિત ચુકવણી અને અસ્પષ્ટ APMC હરાજીનો ભોગ બનતા આવ્યા છે, જ્યાં દલાલો પાકની કિંમતનો મોટો હિસ્સો પડાવી લે છે.",
      foundingP2: "મારવાડી યુનિવર્સિટી ખાતે શૈક્ષણિક અને ટેકનોલોજીકલ ઇનોવેશન તરીકે ફાર્મબ્રિજનું નિર્માણ ખેડૂતો અને ખરીદદારો વચ્ચે ૧૦૦% પારદર્શક અને સીધો વેપાર સ્થાપવા માટે કરવામાં આવ્યું છે.",
      zeroCommission: "₹૦",
      zeroCommissionLabel: "દલાલી કે કમિશન કપાત",
      settlement24h: "૨૪ કલાક",
      settlement24hLabel: "સીધું બેંક ખાતામાં ચુકવણું",
      guidingBadge: "મૂળભૂત સિદ્ધાંતો",
      guidingTitle: "અમારી મુખ્ય પ્રતિબદ્ધતાઓ",
      guidingSubtitle: "અમારા કૃષિ માર્કેટપ્લેસને ચલાવતા નૈતિક અને તકનીકી ધોરણો.",
      academicBadge: "શૈક્ષણિક ઇનોવેશન હબ",
      academicTitle: "મારવાડી યુનિવર્સિટી ખાતે વિકસિત",
      academicDesc: "અદ્યતન ફુલ-સ્ટેક આર્કિટેક્ચર, લાઈવ APMC ઇન્ડેક્સિંગ અને સુરક્ષિત ડેટાબેઝ સાથે તૈયાર કરાયેલ પ્રોજેક્ટ.",
      m2024Title: "સંશોધન અને શરૂઆત",
      m2024Desc: "પશ્ચિમ ભારતના યાર્ડમાં ભાવોની વિસંગતતા અને ખેડૂતોની સમસ્યાઓના વિશ્લેષણથી શરૂઆત.",
      m2025Title: "ડાયરેક્ટ ટ્રેડિંગ પ્રોટોટાઇપ",
      m2025Desc: "ગુજરાત અને મહારાષ્ટ્રના ખેતી વિસ્તારોમાં ખેડૂત-ખરીદદાર સીધા વેપારનું સફળ પરીક્ષણ.",
      m2026Title: "વિશાળ કૃષિ નેટવર્ક",
      m2026Desc: "૧૦,૦૦૦થી વધુ ખેડૂતો અને ૫,૦૦૦ જથ્થાબંધ ખરીદદારો ૮ રાજ્યોમાં સક્રિય રીતે જોડાયેલા છે.",
      ctaTitle: "સીધા કૃષિ વેપાર અભિયાનમાં જોડાવો",
      ctaDesc: "તમે ૨ વીઘા જમીનમાં ખેતી કરતા હોવ કે દર મહિને ૫૦ ટન અનાજ ખરીદતા હોવ, ફાર્મબ્રિજ શ્રેષ્ઠ પરિણામ આપે છે.",
      ctaRegister: "તમારું ખાતું બનાવો",
      ctaBrowse: "માર્કેટપ્લેસ પાકો જુઓ",
      v1Title: "વાજબી ભાવ અને પારદર્શિતા",
      v1Desc: "કોઈપણ દલાલી વગર લાઈવ APMC મંડી ભાવો સાથે સરખામણી કરીને સાચા બજાર ભાવ.",
      v2Title: "સીધી ખેડૂત ચુકવણી",
      v2Desc: "પાક ડિલિવરી કન્ફર્મ થતાં જ ૨૪ કલાકમાં ખેડૂતના બેંક ખાતામાં ૧૦૦% સુરક્ષિત પેમેન્ટ.",
      v3Title: "AGMARK ગુણવત્તા ખાતરી",
      v3Desc: "દરેક પાક લોટમાં ભેજનું પ્રમાણ, ગ્રેડિંગ અને ગુણવત્તા ચકાસણીની ખાતરી.",
      v4Title: "સમગ્ર ભારતમાં ટ્રાન્સપોર્ટ લોજિસ્ટિક્સ",
      v4Desc: "ખેતરેથી સીધા મોટા ખરીદદારોના ગોડાઉન સુધી વિશ્વસનીય ટ્રાન્સપોર્ટ વ્યવસ્થા.",
    },
    hi: {
      heroBadge: "हमारा मिशन और कृषि दृष्टिकोण",
      heroTitle: "भारत के खेतों को सीधे बड़े बाज़ारों से जोड़ना",
      heroDesc: "फार्मब्रिज एक डिजिटल कृषि मंच है जो बिचौलियों के बिना किसानों के लिए फसलों के पारदर्शी और उचित मूल्य सुनिश्चित करता है।",
      impactFocus: "प्रमुख फोकस",
      farmerFirstModel: "किसान-प्रथम आर्थिक मॉडल",
      marginsBoost: "+32% अधिक मुनाफा",
      foundingBadge: "स्थापना का मूल उद्देश्य",
      foundingTitle: "हमने फार्मब्रिज क्यों बनाया?",
      foundingP1: "पीढ़ियों से भारतीय किसानों को ऊंची दलाली, देर से भुगतान और अपारदर्शी मंडी नीलामियों का सामना करना पड़ा है, जहां बिचौलिए फसल का बड़ा हिस्सा ले जाते हैं।",
      foundingP2: "मारवाड़ी यूनिवर्सिटी में तकनीकी नवाचार के रूप में फार्मब्रिज का निर्माण किसानों और खरीदारों के बीच पारदर्शी और सीधा व्यापार स्थापित करने के लिए किया गया।",
      zeroCommission: "₹0",
      zeroCommissionLabel: "बिचौलिया कमीशन कटौती",
      settlement24h: "24 घंटे",
      settlement24hLabel: "सीधा बैंक खाता भुगतान चक्र",
      guidingBadge: "मार्गदर्शक सिद्धांत",
      guidingTitle: "हमारी मुख्य प्रतिबद्धताएं",
      guidingSubtitle: "हमारे कृषि बाज़ार को संचालित करने वाले नैतिक और तकनीकी मानक।",
      academicBadge: "अकादमिक नवाचार केंद्र",
      academicTitle: "मारवाड़ी यूनिवर्सिटी में विकसित",
      academicDesc: "उन्नत फुल-स्टैक आर्किटेक्चर, लाइव एपीएमसी इंडेक्सिंग और सुरक्षित डेटाबेस के साथ विकसित।",
      m2024Title: "अनुसंधान और शुरुआत",
      m2024Desc: "पश्चिम भारत की मंडियों में मूल्य विसंगतियों और किसान समस्याओं के विश्लेषण से शुरुआत।",
      m2025Title: "प्रत्यक्ष व्यापार प्रोटोटाइप",
      m2025Desc: "गुजरात और महाराष्ट्र के कृषि क्लस्टरों में किसान-खरीदार सीधे व्यापार का सफल परीक्षण।",
      m2026Title: "विशाल कृषि नेटवर्क",
      m2026Desc: "10,000 से अधिक किसान और 5,000 थोक खरीदार 8 राज्यों में सक्रिय रूप से जुड़े हैं।",
      ctaTitle: "प्रत्यक्ष कृषि व्यापार अभियान से जुड़ें",
      ctaDesc: "चाहे आप 2 एकड़ में खेती करते हों या मासिक 50 टन अनाज खरीदते हों, फार्मब्रिज सर्वोत्तम परिणाम देता है।",
      ctaRegister: "अपना खाता बनाएं",
      ctaBrowse: "फसलों का बाज़ार देखें",
      v1Title: "उचित मूल्य और पारदर्शिता",
      v1Desc: "बिना किसी दलाली के लाइव एपीएमसी मंडी भावों के साथ पारदर्शी बाज़ार मूल्य।",
      v2Title: "सीधा किसान भुगतान",
      v2Desc: "फसल डिलीवरी की पुष्टि होने पर 24 घंटे में किसान के बैंक खाते में सीधा भुगतान।",
      v3Title: "AGMARK गुणवत्ता आश्वासन",
      v3Desc: "प्रत्येक फसल लॉट में नमी स्तर परीक्षण, ग्रेडिंग और गुणवत्ता सत्यापन।",
      v4Title: "अखिल भारतीय परिवहन रसद",
      v4Desc: "खेत से सीधे थोक खरीदारों के गोदाम तक सुरक्षित माल परिवहन की व्यवस्था।",
    }
  };

  const tData = content[lang];

  const values = [
    {
      title: tData.v1Title,
      description: tData.v1Desc,
      icon: Scale,
      color: "bg-[#EEF4EF] text-[#1E3F2D] border-[#D5E4D8]",
    },
    {
      title: tData.v2Title,
      description: tData.v2Desc,
      icon: TrendingUp,
      color: "bg-[#F5EFE6] text-[#7A5B3E] border-[#E8DDCD]",
    },
    {
      title: tData.v3Title,
      description: tData.v3Desc,
      icon: Award,
      color: "bg-[#EEF4EF] text-[#1E3F2D] border-[#D5E4D8]",
    },
    {
      title: tData.v4Title,
      description: tData.v4Desc,
      icon: Users,
      color: "bg-[#F5EFE6] text-[#7A5B3E] border-[#E8DDCD]",
    },
  ];

  const milestones = [
    { year: "2024", title: tData.m2024Title, desc: tData.m2024Desc },
    { year: "2025", title: tData.m2025Title, desc: tData.m2025Desc },
    { year: "2026", title: tData.m2026Title, desc: tData.m2026Desc },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <Sprout className="w-3.5 h-3.5 text-[#A3B899]" />
            {tData.heroBadge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            {tData.heroTitle}
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {tData.heroDesc}
          </p>
        </div>
      </section>

      {/* 2. THE STORY & MISSION */}
      <section className="py-20 bg-[#FAF8F3] border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Visual Left */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-soft p-3 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Harvesting crops"
                  className="rounded-xl w-full h-80 sm:h-96 object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F3] rounded-xl p-4 shadow-soft border border-[#E8E4DA] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5 fill-[#1E3F2D]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#5C6B5F] uppercase tracking-wider">{tData.impactFocus}</div>
                      <div className="text-sm font-semibold text-[#1A261D]">{tData.farmerFirstModel}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-[#EEF4EF] text-[#1E3F2D] rounded-lg font-medium border border-[#D5E4D8]">
                    {tData.marginsBoost}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="space-y-6 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
                {tData.foundingBadge}
              </span>

              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight leading-snug">
                {tData.foundingTitle}
              </h2>

              <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed">
                {tData.foundingP1}
              </p>

              <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed">
                {tData.foundingP2}
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E8E4DA] shadow-soft-xs">
                  <div className="text-2xl font-bold text-[#1E3F2D]">{tData.zeroCommission}</div>
                  <div className="text-xs text-[#5C6B5F] font-medium mt-1">{tData.zeroCommissionLabel}</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E8E4DA] shadow-soft-xs">
                  <div className="text-2xl font-bold text-[#1E3F2D]">{tData.settlement24h}</div>
                  <div className="text-xs text-[#5C6B5F] font-medium mt-1">{tData.settlement24hLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES & PILLARS */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              {tData.guidingBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              {tData.guidingTitle}
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              {tData.guidingSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${v.color}`}>
                    <v.icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1A261D] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#5C6B5F] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY LAB & ROADMAP */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              {tData.academicBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              {tData.academicTitle}
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              {tData.academicDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-[#E8E4DA] shadow-soft-xs relative">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3 py-1 rounded-full border border-[#D5E4D8]">
                  {m.year}
                </span>
                <h3 className="text-lg font-semibold text-[#1A261D] mt-4 mb-2">{m.title}</h3>
                <p className="text-xs text-[#5C6B5F] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#18392B] p-8 sm:p-12 text-[#FAF8F3] text-center shadow-soft">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3">{tData.ctaTitle}</h2>
            <p className="text-[#CAD7CD] text-sm max-w-xl mx-auto mb-8">
              {tData.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-7 py-3 bg-[#FAF8F3] text-[#18392B] font-semibold text-xs rounded-xl hover:bg-[#F2EDE2] transition-colors shadow-soft-xs inline-flex items-center justify-center gap-1.5"
              >
                {tData.ctaRegister}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/marketplace"
                className="px-7 py-3 bg-transparent hover:bg-white/10 text-[#FAF8F3] font-medium text-xs rounded-xl border border-[#FAF8F3]/30 transition-colors inline-flex items-center justify-center"
              >
                {tData.ctaBrowse}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
