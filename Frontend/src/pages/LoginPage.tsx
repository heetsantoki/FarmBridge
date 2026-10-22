import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Lock,
  User,
  ArrowRight,
  Sprout,
} from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import { LanguageSelector } from "../components/LanguageSelector";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", { username, password });
    
      if (!response.data || !response.data.token) {
        throw new Error("Invalid login response");
      }
    
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.role);
    
      if (response.data.user) {
        localStorage.setItem("profilePhoto", response.data.user.profilePhoto || "");
        localStorage.setItem("firstName", response.data.user.firstName || "");
        localStorage.setItem("lastName", response.data.user.lastName || "");
      }
    
      window.location.href = `http://localhost:5174/${response.data.role}/${encodeURIComponent(response.data.token)}`;
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      const errMsg = error.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] font-sans pt-28 pb-16 px-4 flex items-center justify-center text-[#1A261D]">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <LanguageSelector />
        </div>

        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4EF] text-[#1E3F2D] text-xs font-semibold border border-[#D5E4D8]">
            <Sprout className="w-3.5 h-3.5 text-[#1E3F2D]" />
            Direct Agricultural Portal
          </div>
          <h1 className="text-3xl font-semibold text-[#1A261D] tracking-tight">
            {t("login.welcome", "Welcome Back")}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F]">
            {t("login.login_message", "Sign in to access your direct marketplace dashboard.")}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft p-7 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  {t("login.username", "Username / Mobile")}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7F8B82]" />
                  <input
                    id="username"
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    placeholder={t("login.usernamePlaceholder", "Enter your username or phone")}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  {t("login.password", "Password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7F8B82]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-white focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D] transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7F8B82] hover:text-[#1A261D] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
              className="w-full py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t("login.login", "Sign In to Dashboard")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-[#5C6B5F] space-y-2">
              <div>
                {t("login.no_account", "Don't have an account?")}{" "}
                <Link
                  to="/register"
                  className="text-[#1E3F2D] font-semibold hover:underline"
                >
                  {t("login.register", "Register Here")}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
