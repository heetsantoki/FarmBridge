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
import { GoogleLogin } from "@react-oauth/google";
import { GoogleRoleModal } from "../components/GoogleRoleModal";

export default function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [pendingGoogleToken, setPendingGoogleToken] = useState("");
  const [pendingGoogleInfo, setPendingGoogleInfo] = useState<{ name: string; email: string }>({ name: "", email: "" });
  const navigate = useNavigate();

  const handleLoginSuccessRedirect = (role: string, token: string, user?: any) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", role);
    if (user) {
      localStorage.setItem("profilePhoto", user.profilePhoto || "");
      localStorage.setItem("firstName", user.firstName || "");
      localStorage.setItem("lastName", user.lastName || "");
    }
    window.location.href = `http://localhost:5174/${role}/${encodeURIComponent(token)}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", { username, password });
    
      if (!response.data || !response.data.token) {
        throw new Error("Invalid login response");
      }
    
      handleLoginSuccessRedirect(response.data.role, response.data.token, response.data.user);
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      const errMsg = error.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post("http://localhost:5000/api/user/google-auth", {
        credential: credentialResponse.credential,
      });

      // If brand new user, ask for their role!
      if (response.data.requiresRoleSelection) {
        setPendingGoogleToken(credentialResponse.credential);
        setPendingGoogleInfo({
          name: response.data.googleName || "",
          email: response.data.googleEmail || "",
        });
        setGoogleModalOpen(true);
        return;
      }

      toast.success(response.data.message || "Google Authentication successful!");
      handleLoginSuccessRedirect(response.data.role, response.data.token, response.data.user);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      const msg = err.response?.data?.message || "Google Authentication failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelected = async (chosenRole: "farmer" | "buyer") => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/user/google-auth", {
        credential: pendingGoogleToken,
        userType: chosenRole,
      });

      toast.success("Welcome to FarmBridge! Account registered successfully.");
      setGoogleModalOpen(false);
      handleLoginSuccessRedirect(response.data.role, response.data.token, response.data.user);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to complete role selection. Please try again.";
      toast.error(msg);
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
          {/* Continue with Google Button */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setError("Google Login was unsuccessful. Please try again.");
                toast.error("Google login failed");
              }}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#E8E4DA] w-full" />
            <span className="bg-white px-3 text-xs font-semibold uppercase tracking-wider text-[#7F8B82] absolute">
              or with credentials
            </span>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                  {t("login.username", "Username / Mobile / Email")}
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
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">
                    {t("login.password", "Password")}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#1E3F2D] font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
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

      {/* Role Selection Modal for 1st-time Google users */}
      <GoogleRoleModal
        isOpen={googleModalOpen}
        googleName={pendingGoogleInfo.name}
        googleEmail={pendingGoogleInfo.email}
        onSelectRole={handleRoleSelected}
        onCancel={() => setGoogleModalOpen(false)}
        isLoading={isLoading}
      />
    </div>
  );
}
