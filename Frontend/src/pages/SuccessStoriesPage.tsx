import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Users,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SuccessStoriesPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "gu" || i18n.language === "hi") ? i18n.language : "en";

  const uiText = {
    en: {
      heroBadge: "Verified Producer & Buyer Case Studies",
      heroTitle1: "Real Farmers. Real Buyers.",
      heroTitle2: "Transformative Impact.",
      heroDesc: "Discover how smallholder farmers, producer organizations, and food businesses across India are achieving financial independence through direct digital commerce.",
      spotlightBadge: "Spotlight Producer",
      spotlightCategory: "Grains & Cereals",
      spotlightLoc: "Sehore, Madhya Pradesh",
      spotlightHeading: "\"FarmBridge gave me direct access to flour mills 400 km away, eliminating local auction deductions.\"",
      spotlightQuote: "For 15 years, I took whatever rate the local commission agents dictated at the mandi gate. Last season, I listed 150 quintals of certified Sharbati Wheat on FarmBridge. Within 36 hours, a verified processing mill in Pune matched my asking price. My entire payment was settled directly into my bank account with zero commission.",
      spotlightMetric1: "+38%",
      spotlightMetric1Label: "Net Profit Increase",
      spotlightMetric2: "150 Qtl",
      spotlightMetric2Label: "Wheat Volume Traded",
      spotlightMetric3: "24 Hours",
      spotlightMetric3Label: "Bank Settlement",
      spotlightAuthor: "Rameshwar Rao",
      spotlightAuthorRole: "Lead Farmer, Sehore District Farmer Group",
      gridBadge: "Community Voices",
      gridTitle: "Stories Across Crops & Regions",
      gridDesc: "From mango orchards in Maharashtra to spice growers in Kerala, see the direct trade difference.",
      buyerLabel: "Buyer",
      ctaTitle: "Write Your Own Agricultural Success Story",
      ctaDesc: "Join thousands of producers taking control of their crop pricing, customer contracts, and payouts.",
      ctaStart: "Start Selling Harvest",
      ctaExplore: "Explore Marketplace",
    },
    gu: {
      heroBadge: "પ્રમાણિત ખેડૂતો અને ખરીદદારોની સફળતાની કહાનીઓ",
      heroTitle1: "વાસ્તવિક ખેડૂતો. વાસ્તવિક ખરીદદારો.",
      heroTitle2: "પરિવર્તનકારી સફળતા.",
      heroDesc: "જાણો કે કેવી રીતે ભારતના નાના ખેડૂતો, સહકારી મંડળીઓ અને ફૂડ પ્રોસેસર્સ વચેટીયા વગર સીધા ડિજિટલ વેપાર દ્વારા ઊંચો નફો કમાઈ રહ્યા છે.",
      spotlightBadge: "વિશેષ ખેડૂત પ્રતિભાવ",
      spotlightCategory: "અનાજ અને ધાન્ય",
      spotlightLoc: "સીહોર, મધ્ય પ્રદેશ",
      spotlightHeading: "\"ફાર્મબ્રિજે મને ૪૦૦ કિમી દૂર ફ્લોર મિલો સુધી સીધો પ્રવેશ આપ્યો અને સ્થાનિક યાર્ડની દલાલીમાંથી મુક્તિ આપી.\"",
      spotlightQuote: "૧૫ વર્ષ સુધી હું મંડીના વેપારીઓએ નક્કી કરેલા ભાવે માલ વેચવા મજબૂર હતો. ફાર્મબ્રિજ પર ૧૫૦ ક્વિન્ટલ શરબતી ઘઉં લિસ્ટ કર્યા પછી માત્ર ૩૬ કલાકમાં પુણેની મિલે મારી માંગણી મુજબના પૂરા ભાવ આપ્યા અને ઝીરો કમિશન સાથે પૈસા સીધા બેંક ખાતામાં આવ્યા.",
      spotlightMetric1: "+૩૮%",
      spotlightMetric1Label: "ચોખ્ખા નફામાં વધારો",
      spotlightMetric2: "૧૫૦ ક્વિન્ટલ",
      spotlightMetric2Label: "ઘઉંનો સફળ વેપાર",
      spotlightMetric3: "૨૪ કલાક",
      spotlightMetric3Label: "બેંક ખાતામાં જમા",
      spotlightAuthor: "રામેશ્વર રાવ",
      spotlightAuthorRole: "અગ્રણી ખેડૂત, સીહોર ખેડૂત મંડળ",
      gridBadge: "ખેડૂત પ્રતિભાવો",
      gridTitle: "વિવિધ પાક અને રાજ્યોની સફળતાની વાર્તાઓ",
      gridDesc: "ગુજરાત અને મહારાષ્ટ્રથી લઈને પંજાબ અને દક્ષિણ ભારત સુધી, સીધા વેપારથી ખેડૂતોના જીવનમાં આવેલો બદલાવ.",
      buyerLabel: "ખરીદદાર",
      ctaTitle: "તમારી પોતાની કૃષિ સફળતાની વાર્તા લખો",
      ctaDesc: "આજે જ હજારો ખેડૂતો સાથે જોડાઈને તમારી ઉપજના શ્રેષ્ઠ ભાવ અને સુરક્ષિત ચુકવણી મેળવો.",
      ctaStart: "પાક વેચવાનું શરૂ કરો",
      ctaExplore: "માર્કેટપ્લેસ જુઓ",
    },
    hi: {
      heroBadge: "सत्यापित किसान और खरीदार केस स्टडीज",
      heroTitle1: "सच्चे किसान। सच्चे खरीदार।",
      heroTitle2: "परिवर्तनकारी प्रभाव।",
      heroDesc: "जानें कि कैसे पूरे भारत के छोटे किसान, उत्पादक संगठन और खाद्य व्यवसायी सीधे डिजिटल व्यापार से आर्थिक स्वतंत्रता प्राप्त कर रहे हैं।",
      spotlightBadge: "विशेष किसान कहानी",
      spotlightCategory: "अनाज और खाद्यान्न",
      spotlightLoc: "सीहोर, मध्य प्रदेश",
      spotlightHeading: "\"फार्मब्रिज ने मुझे 400 किमी दूर आटा मिलों तक सीधी पहुंच दी और स्थानीय दलाली से बचाया।\"",
      spotlightQuote: "15 वर्षों तक मैं मंडी में आढ़तियों द्वारा तय की गई दरें स्वीकार करने को मजबूर था। फार्मब्रिज पर 150 क्विंटल प्रमाणित शरबती गेहूं सूचीबद्ध करने के 36 घंटों के भीतर पुणे की एक मिल ने मेरी मांग पूरी की और बिना किसी कमीशन के सीधा भुगतान मिला।",
      spotlightMetric1: "+38%",
      spotlightMetric1Label: "शुद्ध लाभ में वृद्धि",
      spotlightMetric2: "150 क्विंटल",
      spotlightMetric2Label: "गेहूं का सफल व्यापार",
      spotlightMetric3: "24 घंटे",
      spotlightMetric3Label: "बैंक खाता निपटान",
      spotlightAuthor: "रामेश्वर राव",
      spotlightAuthorRole: "प्रमुख किसान, सीहोर जिला किसान समूह",
      gridBadge: "समुदाय की आवाज",
      gridTitle: "विभिन्न फसलों और क्षेत्रों की कहानियां",
      gridDesc: "महाराष्ट्र के आम के बागों से लेकर केरल के मसाला उत्पादकों तक, सीधे व्यापार का अंतर देखें।",
      buyerLabel: "खरीदार",
      ctaTitle: "अपनी कृषि सफलता की कहानी लिखें",
      ctaDesc: "अपनी फसलों के मूल्य निर्धारण और सुरक्षित भुगतान पर नियंत्रण पाने वाले हजारों किसानों से जुड़ें।",
      ctaStart: "फसल बेचना शुरू करें",
      ctaExplore: "मार्केटप्लेस देखें",
    }
  };

  const storiesByLang = {
    en: [
      {
        id: "story-1",
        name: "Rameshwar Rao",
        location: "Sehore, Madhya Pradesh",
        crop: "Certified Sharbati Wheat",
        incomeBoost: "+38% Profit Margin",
        buyerType: "Commercial Flour Mill (Pune)",
        verifiedYear: "Trade Verified Oct 2026",
        quote: "For 15 years, I took whatever rate the local commission agents dictated at the mandi gate. Last season, I listed 150 quintals on FarmBridge. Within 36 hours, a verified processing mill in Pune matched my asking price. My entire payment was settled directly into my bank account with zero commission.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-2",
        name: "Sunita Devi & Saraswati FPO",
        location: "Nashik, Maharashtra",
        crop: "Table Grapes & Pomegranates",
        incomeBoost: "+45% Higher Return",
        buyerType: "Export Aggregator (Mumbai)",
        verifiedYear: "Trade Verified Sep 2026",
        quote: "As a women-led Farmer Producer Organization of 45 smallholders, dealing with distant wholesale exporters was impossible. FarmBridge verified our AGMARK grade reports and arranged refrigerated transport straight from our farm gate.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-3",
        name: "Harpreet Singh Sandhu",
        location: "Ludhiana, Punjab",
        crop: "Basmati Rice & Seed Potatoes",
        incomeBoost: "+31% Net Earnings",
        buyerType: "Retail Supermarket Chain (Delhi NCR)",
        verifiedYear: "Trade Verified Aug 2026",
        quote: "The real-time APMC Mandi ticker on FarmBridge gave me leverage. When local buyers tried to bid 15% below the Punjab state average, I used FarmBridge escrow to sell directly to modern retail procurement teams.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-4",
        name: "Dr. Arvind Patel",
        location: "Anand, Gujarat",
        crop: "Organic Spices & Cumin (Jeera)",
        incomeBoost: "+52% Organic Premium",
        buyerType: "Ayurvedic Brand (Ahmedabad)",
        verifiedYear: "Trade Verified Oct 2026",
        quote: "Conventional mandis treat organically certified cumin the same as chemical crops. FarmBridge's category filters allowed wellness processors to specifically bid on our organic lot, yielding the premium our soil deserved.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-5",
        name: "Kavitha Murugesan",
        location: "Salem, Tamil Nadu",
        crop: "Salem Turmeric & Tapioca",
        incomeBoost: "+29% Realized Value",
        buyerType: "Spice Extract Factory (Coimbatore)",
        verifiedYear: "Trade Verified Jul 2026",
        quote: "Instant 24-hour bank transfer through FarmBridge digital escrow transformed our seasonal cash flow. We were able to buy high-yield seed varieties for our next cycle without borrowing from local moneylenders.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-6",
        name: "Mukesh & Sons Agribusiness",
        location: "Bengaluru, Karnataka",
        crop: "Bulk Institutional Procurement",
        incomeBoost: "18% Sourcing Cost Saved",
        buyerType: "Restaurant Supply Network",
        verifiedYear: "Buyer Verified Sep 2026",
        quote: "As a commercial bulk buyer feeding 60 restaurants daily, sourcing directly from verified growers through FarmBridge cut out three layers of wholesale brokers and guaranteed fresher produce with zero lot rejections.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
      },
    ],
    gu: [
      {
        id: "story-1",
        name: "રામેશ્વર રાવ",
        location: "સીહોર, મધ્ય પ્રદેશ",
        crop: "પ્રમાણિત શરબતી ઘઉં",
        incomeBoost: "+૩૮% નફાનું માર્જિન",
        buyerType: "કમર્શિયલ ફ્લોર મિલ (પુણે)",
        verifiedYear: "ઓક્ટોબર ૨૦૨૬ માં પ્રમાણિત",
        quote: "૧૫ વર્ષ સુધી હું મંડીના દલાલોએ નક્કી કરેલા ભાવે માલ વેચતો હતો. ફાર્મબ્રિજ પર ૧૫૦ ક્વિન્ટલ ઘઉં લિસ્ટ કર્યા પછી ૩૬ કલાકમાં પુણેની મિલે મારી માંગણી મુજબના પૂરા ભાવ આપ્યા અને ઝીરો કમિશન સાથે પૈસા સીધા બેંકમાં આવ્યા.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-2",
        name: "સુનિતા દેવી અને સરસ્વતી FPO",
        location: "નાસિક, મહારાષ્ટ્ર",
        crop: "દ્રાક્ષ અને દાડમ",
        incomeBoost: "+૪૫% ઊંચો નફો",
        buyerType: "નિકાસ એગ્રીગેટર (મુંબઈ)",
        verifiedYear: "સપ્ટેમ્બર ૨૦૨૬ માં પ્રમાણિત",
        quote: "૪૫ મહિલા ખેડૂતોના સંગઠન તરીકે દૂરના નિકાસકારો સાથે વેપાર કરવો મુશ્કેલ હતો. ફાર્મબ્રિજે અમારા પાકના AGMARK ગ્રેડ વેરિફાય કરીને ખેતરેથી જ રેફ્રિજરેટેડ ટ્રાન્સપોર્ટની વ્યવસ્થા કરી આપી.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-3",
        name: "હરપ્રીત સિંહ સંધુ",
        location: "લુધિયાણા, પંજાબ",
        crop: "બાસમતી ચોખા અને બટાટા",
        incomeBoost: "+૩૧% ચોખ્ખી આવક",
        buyerType: "સુપરમાર્કેટ ચેઇન (દિલ્હી NCR)",
        verifiedYear: "ઓગસ્ટ ૨૦૨૬ માં પ્રમાણિત",
        quote: "ફાર્મબ્રિજ પર લાઈવ APMC મંડી ભાવ જોઈને મને સાચી કિંમતની ખબર પડી. જ્યારે સ્થાનિક વેપારીઓએ ૧૫% ઓછા ભાવ ઓફર કર્યા, ત્યારે મેં ફાર્મબ્રિજ દ્વારા સીધું રિટેલ ચેઇનને વેચાણ કર્યું.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-4",
        name: "ડૉ. અરવિંદ પટેલ",
        location: "આણંદ, ગુજરાત",
        crop: "ઓર્ગેનિક જીરું અને મસાલા",
        incomeBoost: "+૫૨% ઓર્ગેનિક પ્રીમિયમ",
        buyerType: "આયુર્વેદિક બ્રાન્ડ (અમદાવાદ)",
        verifiedYear: "ઓક્ટોબર ૨૦૨૬ માં પ્રમાણિત",
        quote: "સામાન્ય યાર્ડમાં ઓર્ગેનિક પાકને પણ સામાન્ય પાક જેટલો જ ભાવ મળે છે. ફાર્મબ્રિજ પર ઓર્ગેનિક કેટેગરીને લીધે અમદાવાદની આયુર્વેદિક કંપનીએ અમારા લોટ માટે ઊંચા પ્રીમિયમ ભાવ આપ્યા.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-5",
        name: "કવિતા મુરુગેસન",
        location: "સેલમ, તમિલનાડુ",
        crop: "સેલમ હળદર અને ટેપિઓકા",
        incomeBoost: "+૨૯% વધુ મૂલ્ય",
        buyerType: "મસાલા પ્રોસેસિંગ ફેક્ટરી (કોઇમ્બતૂર)",
        verifiedYear: "જુલાઈ ૨૦૨૬ માં પ્રમાણિત",
        quote: "ફાર્મબ્રિજ દ્વારા ૨૪ કલાકમાં મળેલા સીધા બેંક ટ્રાન્સફરે અમારી રોકડ પ્રવાહની ચિંતા દૂર કરી. વ્યાજે નાણાં લીધા વિના અમે આગામી પાક માટે ઉત્તમ બિયારણ ખરીદી શક્યા.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-6",
        name: "મુકેશ એન્ડ સન્સ એગ્રીબિઝનેસ",
        location: "બેંગલુરુ, કર્ણાટક",
        crop: "જથ્થાબંધ સંસ્થાકીય ખરીદી",
        incomeBoost: "૧૮% ખરીદી ખર્ચ બચ્યો",
        buyerType: "રેસ્ટોરન્ટ સપ્લાય નેટવર્ક",
        verifiedYear: "સપ્ટેમ્બર ૨૦૨૬ માં પ્રમાણિત",
        quote: "રોજેરોજ ૬૦ રેસ્ટોરન્ટ માટે જથ્થાબંધ ખરીદી કરતી વખતે ફાર્મબ્રિજ પરથી સીધા ખેડૂતો પાસેથી ખરીદી કરવાથી ત્રણ સ્તરના દલાલો દૂર થયા અને તાજો માલ મળ્યો.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
      },
    ],
    hi: [
      {
        id: "story-1",
        name: "रामेश्वर राव",
        location: "सीहोर, मध्य प्रदेश",
        crop: "प्रमाणित शरबती गेहूं",
        incomeBoost: "+38% लाभ मार्जिन",
        buyerType: "कमर्शियल आटा मिल (पुणे)",
        verifiedYear: "अक्टूबर 2026 में सत्यापित",
        quote: "15 वर्षों तक मैं मंडी में आढ़तियों द्वारा तय की गई दरें स्वीकार करने को मजबूर था। फार्मब्रिज पर 150 क्विंटल गेहूं सूचीबद्ध करने के बाद पुणे की मिल ने मेरी मांग पूरी की और बिना किसी कमीशन के सीधा भुगतान मिला।",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-2",
        name: "सुनीता देवी और सरस्वती FPO",
        location: "नासिक, महाराष्ट्र",
        crop: "अंगूर और अनार",
        incomeBoost: "+45% अधिक लाभ",
        buyerType: "निर्यात एग्रीगेटर (मुंबई)",
        verifiedYear: "सितंबर 2026 में सत्यापित",
        quote: "45 महिला किसानों के संगठन के रूप में दूर के निर्यातकों से व्यापार करना कठिन था। फार्मब्रिज ने हमारे AGMARK ग्रेड सत्यापित किए और खेत से ही प्रशीतित परिवहन की व्यवस्था की।",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-3",
        name: "हरप्रीत सिंह संधू",
        location: "लुधियाना, पंजाब",
        crop: "बासमती चावल और आलू",
        incomeBoost: "+31% शुद्ध आय",
        buyerType: "सुपरमार्केट चेन (दिल्ली NCR)",
        verifiedYear: "अगस्त 2026 में सत्यापित",
        quote: "फार्मब्रिज पर लाइव एपीएमसी मंडी भाव देखकर मुझे अपनी फसल का सही मूल्य पता चला। जब स्थानीय व्यापारियों ने कम कीमत की पेशकश की, तो मैंने फार्मब्रिज के माध्यम से सीधे खुदरा श्रृंखला को बेचा।",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-4",
        name: "डॉ. अरविंद पटेल",
        location: "आनंद, गुजरात",
        crop: "जैविक जीरा और मसाले",
        incomeBoost: "+52% जैविक प्रीमियम",
        buyerType: "आयुर्वेदिक ब्रांड (अहमदाबाद)",
        verifiedYear: "अक्टूबर 2026 में सत्यापित",
        quote: "पारंपरिक मंडियों में जैविक फसल को भी रासायनिक फसल जितना ही भाव मिलता है। फार्मब्रिज पर जैविक श्रेणी के कारण अहमदाबाद की आयुर्वेदिक कंपनी ने हमारी फसल के लिए प्रीमियम मूल्य दिया।",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-5",
        name: "कविता मुरुगेसन",
        location: "सेलम, तमिलनाडु",
        crop: "सेलम हल्दी और कसावा",
        incomeBoost: "+29% अधिक मूल्य",
        buyerType: "मसाला प्रसंस्करण इकाई (कोयंबटूर)",
        verifiedYear: "जुलाई 2026 में सत्यापित",
        quote: "फार्मब्रिज के माध्यम से 24 घंटे में मिले सीधे बैंक भुगतान ने हमारी नकदी प्रवाह की समस्या हल कर दी। बिना ब्याज पर कर्ज लिए हम अगली फसल के लिए उच्च गुणवत्ता वाले बीज खरीद सके।",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "story-6",
        name: "मुकेश एंड संस एग्रीबिजनेस",
        location: "बेंगलुरु, कर्नाटक",
        crop: "थोक संस्थागत खरीद",
        incomeBoost: "18% खरीद लागत बची",
        buyerType: "रेस्तरां आपूर्ति नेटवर्क",
        verifiedYear: "सितंबर 2026 में सत्यापित",
        quote: "दैनिक रूप से 60 रेस्तरां के लिए थोक खरीद करते समय फार्मब्रिज से सीधे किसानों से खरीद करने पर बिचौलिए हटे और ताज़ा उत्पाद प्राप्त हुआ।",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
      },
    ]
  };

  const tUI = uiText[lang];
  const stories = storiesByLang[lang];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <Users className="w-3.5 h-3.5 text-[#A3B899]" />
            {tUI.heroBadge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            {tUI.heroTitle1} <br className="hidden sm:block" />
            <span className="text-[#CAD7CD]">{tUI.heroTitle2}</span>
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {tUI.heroDesc}
          </p>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDY SPOTLIGHT */}
      <section className="py-16 bg-[#FAF8F3] border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8E4DA] shadow-soft">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F2EDE2]">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                    alt="Featured farmer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#FAF8F3] px-3 py-1 rounded-lg text-xs font-semibold text-[#1E3F2D] border border-[#E8E4DA] shadow-soft-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E3F2D]" />
                    {tUI.spotlightBadge}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3 py-1 rounded-full border border-[#D5E4D8]">
                    {tUI.spotlightCategory}
                  </span>
                  <span className="text-xs text-[#5C6B5F] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7F8B82]" />
                    {tUI.spotlightLoc}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D] leading-snug">
                  {tUI.spotlightHeading}
                </h2>

                <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed italic">
                  “{tUI.spotlightQuote}”
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-[#E8E4DA] pt-4">
                  <div>
                    <div className="text-2xl font-bold text-[#1E3F2D]">{tUI.spotlightMetric1}</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">{tUI.spotlightMetric1Label}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A261D]">{tUI.spotlightMetric2}</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">{tUI.spotlightMetric2Label}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A261D]">{tUI.spotlightMetric3}</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">{tUI.spotlightMetric3Label}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-semibold text-[#1A261D]">{tUI.spotlightAuthor}</div>
                  <div className="text-xs text-[#5C6B5F]">{tUI.spotlightAuthorRole}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORIES GRID */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              {tUI.gridBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              {tUI.gridTitle}
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              {tUI.gridDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-[#E8E4DA] shadow-soft-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#1A261D] text-sm leading-snug break-words">{st.name}</h3>
                      <div className="text-xs text-[#5C6B5F] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#1E3F2D] shrink-0" />
                        <span className="truncate">{st.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E4DA]">
                    <span className="font-medium text-[#1A261D] truncate mr-2">{st.crop}</span>
                    <span className="font-semibold text-[#1E3F2D] bg-[#EEF4EF] px-2 py-0.5 rounded-md border border-[#D5E4D8] shrink-0">
                      {st.incomeBoost}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6B5F] leading-relaxed italic">
                    "{st.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs text-[#7F8B82] gap-2">
                  <span className="truncate">{tUI.buyerLabel}: <strong className="text-[#1A261D] font-medium">{st.buyerType}</strong></span>
                  <span className="text-[11px] font-semibold text-[#1E3F2D] shrink-0">{st.verifiedYear}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D]">
            {tUI.ctaTitle}
          </h2>
          <p className="text-sm text-[#5C6B5F] max-w-xl mx-auto">
            {tUI.ctaDesc}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-7 py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors inline-flex items-center justify-center gap-1.5"
            >
              {tUI.ctaStart}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/marketplace"
              className="px-7 py-3 bg-[#FFFFFF] hover:bg-[#F2EDE2] text-[#1A261D] border border-[#E8E4DA] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors inline-flex items-center justify-center"
            >
              {tUI.ctaExplore}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
