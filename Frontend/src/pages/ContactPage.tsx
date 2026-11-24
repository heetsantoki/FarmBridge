import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Headphones,
  CheckCircle2,
  Send,
  Building,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "gu" || i18n.language === "hi") ? i18n.language : "en";

  const content = {
    en: {
      heroBadge: "Contact Us",
      heroTitle: "Connect With Our Support Team",
      heroDesc: "Have questions about FarmBridge? We're here to help. Send us a message and we'll get back to you as soon as possible.",
      directChannelsBadge: "Direct Channels",
      supportHeading: "How Can We Support Your Harvest?",
      supportSubtext: "Reach out directly to our regional market coordinators or visit our academic development center.",
      hotlineTitle: "Toll-Free Farmer Hotline",
      hotlineDesc: "1800 240 8820 (Toll-Free, Pan-India)",
      hotlineLangs: "Hindi, Gujarati, Marathi, Punjabi, English",
      emailTitle: "Email Operations Desk",
      emailDesc: "desk@farmbridge.in",
      emailSub: "Direct response within 4 hours",
      labTitle: "Marwadi University Innovation Lab",
      labAddress: "Rajkot-Morbi Highway, Gauridad, Rajkot, Gujarat 360003",
      labHours: "Monday – Saturday: 9:00 AM – 6:30 PM IST",
      urgentTitle: "Urgent Mandi Auction Assistance",
      urgentDesc: "If your loaded truck is currently waiting at a physical mandi gate with disputed auction deductions, call our emergency dispatch hotline for immediate digital lot matching.",
      formTitle: "Send us a message",
      formDesc: "Our agricultural desk assigns a dedicated account specialist to review your produce lots.",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. Ramesh Patel",
      phoneNumber: "Phone Number",
      phonePlaceholder: "e.g. +91 98765 43210",
      emailAddress: "Email Address",
      emailPlaceholder: "e.g. ramesh@agrifarm.in",
      roleLabel: "I am a...",
      roleFarmer: "Farmer / Agricultural Producer",
      roleFpo: "Farmer Producer Org (FPO)",
      roleBuyer: "Wholesale Commercial Buyer",
      roleProcessor: "Food Processing Manufacturer",
      roleLogistics: "Logistics Freight Partner",
      roleAcademic: "Academic / Research Partner",
      cropInterest: "Crop or Produce of Interest",
      cropInterestPlaceholder: "e.g. Sharbati Wheat (100 Tons), Alphonso Mangoes, Soybean",
      messageLabel: "Message / Specifications",
      messagePlaceholder: "Describe your inquiry, harvest timeline, lot size, delivery location, or partnership proposal...",
      submitting: "Transmitting...",
      submitBtn: "Send message",
      successTitle: "Inquiry Dispatched Successfully",
      successDesc: "A regional coordinator from our operations desk has received your ticket and will contact you via phone within 4 business hours.",
      submitAnother: "Submit Another Inquiry",
    },
    gu: {
      heroBadge: "સંપર્ક કરો",
      heroTitle: "અમારી સહાયતા ટીમ સાથે જોડાઓ",
      heroDesc: "ફાર્મબ્રિજ વિશે કોઈ પ્રશ્નો છે? અમે મદદ કરવા માટે અહીં છીએ. અમને સંદેશ મોકલો અને અમે શક્ય તેટલી વહેલી તકે તમારો સંપર્ક કરીશું.",
      directChannelsBadge: "સીધા સંપર્ક માધ્યમો",
      supportHeading: "અમે તમારી ઉપજમાં કેવી રીતે મદદ કરી શકીએ?",
      supportSubtext: "અમારા પ્રાદેશિક માર્કેટ સંયોજકોનો સીધો સંપર્ક કરો અથવા અમારા શૈક્ષણિક વિકાસ કેન્દ્રની મુલાકાત લો.",
      hotlineTitle: "ટોલ-ફ્રી ખેડૂત હેલ્પલાઇન",
      hotlineDesc: "1800 240 8820 (ટોલ-ફ્રી, સમગ્ર ભારત)",
      hotlineLangs: "ગુજરાતી, હિન્દી, મરાઠી, પંજાબી, અંગ્રેજી",
      emailTitle: "ઇમેઇલ ઑપરેશન્સ ડેસ્ક",
      emailDesc: "desk@farmbridge.in",
      emailSub: "૪ કલાકની અંદર સીધો પ્રત્યુત્તર",
      labTitle: "મારવાડી યુનિવર્સિટી ઇનોવેશન લેબ",
      labAddress: "રાજકોટ-મોરબી હાઇવે, ગૌરીદડ, રાજકોટ, ગુજરાત ૩૬૦૦૦૩",
      labHours: "સોમવાર – શનિવાર: સવારે ૯:૦૦ થી સાંજે ૬:૩૦ IST",
      urgentTitle: "તાત્કાલિક એપીએમસી હરાજી સહાય",
      urgentDesc: "જો તમારો માલ ભરેલો ટ્રક હાલમાં મંડી ગેટ પર વજન કે ભાવ કપાતના વિવાદમાં અટવાયેલો હોય, તો તુરંત ડિજિટલ ખરીદદાર મેળવવા અમારા ઇમરજન્સી હેલ્પલાઇન પર કોલ કરો.",
      formTitle: "અમને સંદેશ મોકલો",
      formDesc: "અમારું એગ્રીકલ્ચર ડેસ્ક તમારા પાકની સમીક્ષા કરવા માટે એક સમર્પિત એકાઉન્ટ નિષ્ણાત ફાળવે છે.",
      fullName: "પૂરું નામ",
      fullNamePlaceholder: "દા.ત. રમેશ પટેલ",
      phoneNumber: "ફોન નંબર",
      phonePlaceholder: "દા.ત. +91 98765 43210",
      emailAddress: "ઇમેઇલ સરનામું",
      emailPlaceholder: "દા.ત. ramesh@agrifarm.in",
      roleLabel: "હું એક...",
      roleFarmer: "ખેડૂત / કૃષિ ઉત્પાદક",
      roleFpo: "ખેડૂત ઉત્પાદક સંસ્થા (FPO)",
      roleBuyer: "જથ્થાબંધ વ્યાપારી ખરીદદાર",
      roleProcessor: "ફૂડ પ્રોસેસિંગ ઉત્પાદક",
      roleLogistics: "ટ્રાન્સપોર્ટ અને લોજિસ્ટિક્સ પાર્ટનર",
      roleAcademic: "શૈક્ષણિક / સંશોધન ભાગીદાર",
      cropInterest: "રસ ધરાવતો પાક અથવા ઉપજ",
      cropInterestPlaceholder: "દા.ત. શરબતી ઘઉં (૧૦૦ ટન), કેસર કેરી, સોયાબીન",
      messageLabel: "સંદેશ / વિગત",
      messagePlaceholder: "તમારી પૂછપરછ, પાકની લણણીનો સમય, લોટ સાઇઝ, ડિલિવરી સ્થળ અથવા ભાગીદારી અંગે જણાવો...",
      submitting: "મોકલી રહ્યા છીએ...",
      submitBtn: "સંદેશ મોકલો",
      successTitle: "પૂછપરછ સફળતાપૂર્વક નોંધાઈ ગઈ છે",
      successDesc: "અમારા ઓપરેશન્સ ડેસ્કના પ્રાદેશિક સંયોજકને તમારી વિનંતી મળી ગઈ છે અને ૪ કામકાજના કલાકોમાં તેઓ ફોન દ્વારા સંપર્ક કરશે.",
      submitAnother: "બીજી પૂછપરછ સબમિટ કરો",
    },
    hi: {
      heroBadge: "संपर्क करें",
      heroTitle: "हमारी सहायता टीम से संपर्क करें",
      heroDesc: "फार्मब्रिज के बारे में कोई प्रश्न हैं? हम मदद के लिए यहां हैं। हमें संदेश भेजें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
      directChannelsBadge: "सीधे संपर्क माध्यम",
      supportHeading: "हम आपकी फसल में कैसे मदद कर सकते हैं?",
      supportSubtext: "हमारे क्षेत्रीय बाजार समन्वयकों से सीधे संपर्क करें या हमारे शैक्षणिक विकास केंद्र पर आएं।",
      hotlineTitle: "टोल-फ्री किसान हेल्पलाइन",
      hotlineDesc: "1800 240 8820 (टोल-फ्री, अखिल भारतीय)",
      hotlineLangs: "हिंदी, गुजराती, मराठी, पंजाबी, अंग्रेजी",
      emailTitle: "ईमेल ऑपरेशंस डेस्क",
      emailDesc: "desk@farmbridge.in",
      emailSub: "४ घंटे के भीतर सीधा उत्तर",
      labTitle: "मारवाड़ी यूनिवर्सिटी इनोवेशन लैब",
      labAddress: "राजकोट-मोरबी हाईवे, गौरीदड़, राजकोट, गुजरात ३६०००३",
      labHours: "सोमवार – शनिवार: सुबह ९:०० से शाम ६:३० IST",
      urgentTitle: "तत्काल मंडी नीलामी सहायता",
      urgentDesc: "यदि आपका लदा हुआ ट्रक वर्तमान में किसी मंडी गेट पर नीलामी विवाद में रुका है, तो तत्काल डिजिटल लॉट मिलान के लिए हमारी आपातकालीन हेल्पलाइन पर कॉल करें।",
      formTitle: "हमें संदेश भेजें",
      formDesc: "हमारा कृषि डेस्क आपकी फसल की समीक्षा के लिए एक समर्पित खाता विशेषज्ञ नियुक्त करता है।",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "उदा. रमेश पटेल",
      phoneNumber: "फ़ोन नंबर",
      phonePlaceholder: "उदा. +91 98765 43210",
      emailAddress: "ईमेल पता",
      emailPlaceholder: "उदा. ramesh@agrifarm.in",
      roleLabel: "मैं एक हूँ...",
      roleFarmer: "किसान / कृषि उत्पादक",
      roleFpo: "किसान उत्पादक संगठन (FPO)",
      roleBuyer: "थोक व्यापारिक खरीदार",
      roleProcessor: "खाद्य प्रसंस्करण निर्माता",
      roleLogistics: "लॉजिस्टिक्स फ्रेट पार्टनर",
      roleAcademic: "शैक्षणिक / अनुसंधान भागीदार",
      cropInterest: "रुचि की फसल या उपज",
      cropInterestPlaceholder: "उदा. शरबती गेहूं (१०० टन), केसर आम, सोयाबीन",
      messageLabel: "संदेश / विवरण",
      messagePlaceholder: "अपनी पूछताछ, फसल का समय, लॉट का आकार, डिलीवरी का स्थान या साझेदारी प्रस्ताव बताएं...",
      submitting: "भेज रहे हैं...",
      submitBtn: "संदेश भेजें",
      successTitle: "पूछताछ सफलतापूर्वक भेजी गई",
      successDesc: "हमारे संचालन डेस्क के क्षेत्रीय समन्वयक को आपका अनुरोध प्राप्त हो गया है और वे ४ कार्य घंटों के भीतर फ़ोन द्वारा संपर्क करेंगे।",
      submitAnother: "दूसरी पूछताछ भेजें",
    },
  };

  const tData = content[lang];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "farmer",
    cropInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        role: "farmer",
        cropInterest: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <Headphones className="w-3.5 h-3.5 text-[#A3B899]" />
            {tData.heroBadge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            {tData.heroTitle}
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {tData.heroDesc}
          </p>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS & FORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
                {tData.directChannelsBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D] mt-3">
                {tData.supportHeading}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1 leading-relaxed">
                {tData.supportSubtext}
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone Desk */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center flex-shrink-0 border border-[#D5E4D8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">{tData.hotlineTitle}</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">
                    {tData.hotlineDesc}
                  </p>
                  <span className="text-[11px] font-medium text-[#1E3F2D] bg-[#EEF4EF] px-2 py-0.5 rounded-md mt-1.5 inline-block border border-[#D5E4D8]">
                    {tData.hotlineLangs}
                  </span>
                </div>
              </div>

              {/* Email Desk */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#7A5B3E] flex items-center justify-center flex-shrink-0 border border-[#E8DDCD]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">{tData.emailTitle}</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">{tData.emailDesc}</p>
                  <p className="text-[11px] text-[#7F8B82] mt-0.5">{tData.emailSub}</p>
                </div>
              </div>

              {/* Physical Lab Address */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center flex-shrink-0 border border-[#D5E4D8]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">{tData.labTitle}</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">
                    {tData.labAddress}
                  </p>
                  <p className="text-[11px] text-[#7F8B82] mt-0.5">{tData.labHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Mandi Notice */}
            <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E4DA]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A261D] mb-1">
                <HelpCircle className="w-4 h-4 text-[#1E3F2D]" />
                {tData.urgentTitle}
              </div>
              <p className="text-xs text-[#5C6B5F] leading-relaxed">
                {tData.urgentDesc}
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-8">
            <h3 className="text-xl font-semibold text-[#1A261D] mb-2">{tData.formTitle}</h3>
            <p className="text-xs text-[#5C6B5F] mb-6">
              {tData.formDesc}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#EEF4EF] border border-[#D5E4D8] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#1E3F2D] mx-auto" />
                <h4 className="text-base font-semibold text-[#1A261D]">{tData.successTitle}</h4>
                <p className="text-xs text-[#5C6B5F] max-w-sm mx-auto">
                  {tData.successDesc}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2 text-xs font-semibold text-[#FAF8F3] bg-[#1E3F2D] hover:bg-[#18392B] rounded-xl transition-colors shadow-soft-xs"
                >
                  {tData.submitAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      {tData.fullName} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={tData.fullNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      {tData.phoneNumber} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={tData.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      {tData.emailAddress}
                    </label>
                    <input
                      type="email"
                      placeholder={tData.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      {tData.roleLabel}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    >
                      <option value="farmer">{tData.roleFarmer}</option>
                      <option value="fpo">{tData.roleFpo}</option>
                      <option value="buyer">{tData.roleBuyer}</option>
                      <option value="processor">{tData.roleProcessor}</option>
                      <option value="logistics">{tData.roleLogistics}</option>
                      <option value="academic">{tData.roleAcademic}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                    {tData.cropInterest}
                  </label>
                  <input
                    type="text"
                    placeholder={tData.cropInterestPlaceholder}
                    value={formData.cropInterest}
                    onChange={(e) => setFormData({ ...formData, cropInterest: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                    {tData.messageLabel} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={tData.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] leading-relaxed transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? tData.submitting : tData.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
