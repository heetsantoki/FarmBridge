import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Lock,
  ArrowRight,
  Sprout,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Reset token is missing or invalid. Please check the link from your email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/user/reset-password", {
        token,
        newPassword,
      });

      setIsSuccess(true);
      toast.success(response.data.message || "Password reset successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to reset password. The link may have expired.";
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
            Set New Password
          </div>
          <h1 className="text-3xl font-semibold text-[#1A261D] tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F]">
            Choose a strong password to secure your FarmBridge account.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-7 sm:p-8">
          {isSuccess ? (
            <div className="text-center space-y-4 py-3">
              <CheckCircle2 className="w-14 h-14 text-[#1E3F2D] mx-auto" />
              <h2 className="text-xl font-bold text-[#1A261D]">Password Updated!</h2>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                Your password has been securely reset. Redirecting you to the login page...
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors"
                >
                  Sign In Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7F8B82]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter at least 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7F8B82] hover:text-[#1A261D]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  Confirm New Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7F8B82]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Confirm & Update Password
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
