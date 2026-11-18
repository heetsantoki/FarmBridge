import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  Sprout,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [error, setError] = useState("");

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/forgot-password", {
        identifier,
      });

      setSentSuccess(true);
      setSentEmail(response.data.email || identifier);
      toast.success(response.data.message || "Password reset link sent!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to process request. Please check username or email.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] font-sans pt-28 pb-16 px-4 flex items-center justify-center text-[#1A261D]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4EF] text-[#1E3F2D] text-xs font-semibold border border-[#D5E4D8]">
            <Sprout className="w-3.5 h-3.5 text-[#1E3F2D]" />
            Security & Account Protection
          </div>
          <h1 className="text-3xl font-semibold text-[#1A261D] tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F]">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-7 sm:p-8">
          {sentSuccess ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 bg-[#EEF4EF] rounded-full flex items-center justify-center mx-auto text-[#1E3F2D] border border-[#D5E4D8]">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#1A261D]">Check Your Email</h2>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                We've sent a password reset link to <strong className="text-[#1A261D]">{sentEmail}</strong>.
              </p>
              <div className="p-3.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl text-xs font-medium text-[#1E3F2D]">
                Please open the email in your inbox and click the <strong>Reset Password</strong> button to set a new password.
              </div>
              <p className="text-[11px] text-[#7F8B82]">
                Didn't see it? Please check your Spam or Junk folder. The link expires in 15 minutes.
              </p>

              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-[#1E3F2D] font-semibold text-xs hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  Username or Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7F8B82]" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D]"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-700 text-xs bg-rose-50 p-3 rounded-xl border border-rose-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-[#5C6B5F]">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 text-[#1E3F2D] font-semibold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
