import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  HelpCircle,
  ArrowRight,
  Sprout,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ConfirmPasswordResetPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!token) {
      setError("No confirmation token found in URL.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/user/confirm-password-reset", {
        token,
      });

      setConfirmed(true);
      toast.success(response.data.message || "Reset link sent to your email!");

      // If backend passed reset link or token, we can also extract it
      if (response.data.resetLink) {
        setResetUrl(response.data.resetLink);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid or expired confirmation link.";
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
            Password Reset Confirmation
          </div>
          <h1 className="text-3xl font-semibold text-[#1A261D] tracking-tight">
            Confirm Reset Request
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-7 sm:p-8 text-center space-y-5">
          {confirmed ? (
            <div className="space-y-4 py-2">
              <CheckCircle2 className="w-14 h-14 text-[#1E3F2D] mx-auto" />
              <h2 className="text-xl font-bold text-[#1A261D]">Request Confirmed!</h2>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                A secure, time-limited password reset link has been dispatched to your email address.
              </p>

              {resetUrl && (
                <div className="mt-4">
                  <a
                    href={resetUrl}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors"
                  >
                    Proceed to Set New Password <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              <div className="pt-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-[#5C6B5F] hover:text-[#1A261D] text-xs font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="w-16 h-16 bg-[#F7F2E9] rounded-full flex items-center justify-center mx-auto text-[#7A5B22] border border-[#EBDDC7]">
                <HelpCircle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#1A261D]">
                  Do you want to reset your password?
                </h2>
                <p className="text-xs text-[#5C6B5F] mt-2 leading-relaxed">
                  To protect your account against unauthorized changes, please confirm that you requested this password reset.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-700 text-xs bg-rose-50 p-3 rounded-xl border border-rose-200 text-left">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleConfirm}
                  disabled={isLoading || !token}
                  className="w-full py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Yes, Reset My Password
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

                <Link
                  to="/login"
                  className="w-full inline-block py-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#5C6B5F] text-xs font-semibold rounded-xl border border-[#E8E4DA] transition-colors"
                >
                  No, Cancel & Keep My Password
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
