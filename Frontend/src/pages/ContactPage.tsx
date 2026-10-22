import React, { useState } from "react";
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
            Direct Agricultural Advisory & Operations Desk
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            Connect With Our <br className="hidden sm:block" />
            <span className="text-[#CAD7CD]">Operations & Support Team</span>
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Need assistance listing your harvest, verifying APMC wholesale rates, or arranging bulk freight logistics? Our agricultural desk is here to help.
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
                Direct Channels
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D] mt-3">
                How Can We Support Your Harvest?
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1 leading-relaxed">
                Reach out directly to our regional market coordinators or visit our academic development center.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone Desk */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center flex-shrink-0 border border-[#D5E4D8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">Toll-Free Farmer Hotline</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">
                    1800 240 8820 (Toll-Free, Pan-India)
                  </p>
                  <span className="text-[11px] font-medium text-[#1E3F2D] bg-[#EEF4EF] px-2 py-0.5 rounded-md mt-1.5 inline-block border border-[#D5E4D8]">
                    Hindi, Gujarati, Marathi, Punjabi, English
                  </span>
                </div>
              </div>

              {/* Email Desk */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] text-[#7A5B3E] flex items-center justify-center flex-shrink-0 border border-[#E8DDCD]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">Email Operations Desk</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">desk@farmbridge.in</p>
                  <p className="text-[11px] text-[#7F8B82] mt-0.5">Direct response within 4 hours</p>
                </div>
              </div>

              {/* Physical Lab Address */}
              <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center flex-shrink-0 border border-[#D5E4D8]">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A261D]">Marwadi University Innovation Lab</h3>
                  <p className="text-xs text-[#5C6B5F] mt-0.5">
                    Rajkot-Morbi Highway, Gauridad, Rajkot, Gujarat 360003
                  </p>
                  <p className="text-[11px] text-[#7F8B82] mt-0.5">Monday – Saturday: 9:00 AM – 6:30 PM IST</p>
                </div>
              </div>
            </div>

            {/* Quick Mandi Notice */}
            <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E4DA]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1A261D] mb-1">
                <HelpCircle className="w-4 h-4 text-[#1E3F2D]" />
                Urgent Mandi Auction Assistance
              </div>
              <p className="text-xs text-[#5C6B5F] leading-relaxed">
                If your loaded truck is currently waiting at a physical mandi gate with disputed auction deductions, call our emergency dispatch hotline for immediate digital lot matching.
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-8">
            <h3 className="text-xl font-semibold text-[#1A261D] mb-2">Send an Advisory Request</h3>
            <p className="text-xs text-[#5C6B5F] mb-6">
              Our agricultural desk assigns a dedicated account specialist to review your produce lots.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#EEF4EF] border border-[#D5E4D8] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#1E3F2D] mx-auto" />
                <h4 className="text-base font-semibold text-[#1A261D]">Inquiry Dispatched Successfully</h4>
                <p className="text-xs text-[#5C6B5F] max-w-sm mx-auto">
                  A regional coordinator from our operations desk has received your ticket and will contact you via phone within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2 text-xs font-semibold text-[#FAF8F3] bg-[#1E3F2D] hover:bg-[#18392B] rounded-xl transition-colors shadow-soft-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@agrifarm.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                      I am a...
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    >
                      <option value="farmer">Farmer / Agricultural Producer</option>
                      <option value="fpo">Farmer Producer Org (FPO)</option>
                      <option value="buyer">Wholesale Commercial Buyer</option>
                      <option value="processor">Food Processing Manufacturer</option>
                      <option value="logistics">Logistics Freight Partner</option>
                      <option value="academic">Academic / Research Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                    Crop or Produce of Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sharbati Wheat (100 Tons), Alphonso Mangoes, Soybean"
                    value={formData.cropInterest}
                    onChange={(e) => setFormData({ ...formData, cropInterest: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] mb-1.5">
                    Message / Specifications <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry, harvest timeline, lot size, delivery location, or partnership proposal..."
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
                  {isSubmitting ? "Transmitting to Operations Desk..." : "Submit Inquiry to Operations Desk"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}