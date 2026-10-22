import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiOutlineBell } from "react-icons/hi";
import toast from "react-hot-toast";
import { LanguageSelector } from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import roleAtom from "../hooks/roleAtom";
import { User, LogOut, ChevronDown, Sparkles } from "lucide-react";
import logo from "../assets/logo.png";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  profilePhoto?: string;
  email?: string;
}

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const recoilRole = useRecoilValue(roleAtom);
  const role = recoilRole || localStorage.getItem("role") || "farmer";
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const profilePicUrl = user?.profilePhoto || "/default-avatar.png";

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        window.location.href = "http://localhost:5173/login";
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.user);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "http://localhost:5173/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, token]);

  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : role === "farmer"
    ? "Farmer Portal"
    : "Buyer Account";

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#FBF9F5] border-b border-[#E8E4DA] z-50 flex items-center justify-between px-4 lg:px-8 transition-colors">
      {/* Left: Brand Identity */}
      <div className="flex items-center gap-3">
        <Link to={role === "buyer" ? "/buyer-products" : "/home"} className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="FarmBridge logo"
            className="h-10 w-10 object-contain mr-1 transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold tracking-tight text-[#163022] group-hover:text-[#234E37] transition-colors">
            FarmBridge
          </span>
        </Link>

        {/* Role Pill Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF2EC] text-[#244C34] border border-[#D5E2D7] ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E6845]"></span>
          {role === "farmer" ? "Farmer Producer" : role === "buyer" ? "Verified Buyer" : "Administrator"}
        </div>
      </div>

      {/* Center / Search bar simulation */}
      <div className="hidden md:flex items-center w-72 lg:w-96 px-3.5 py-1.5 bg-[#F4F1E8] border border-[#E4DFD3] rounded-xl text-xs text-[#6F7A71] gap-2 hover:border-[#D0C9BA] transition-colors">
        <HiSearch className="text-base text-[#6F7A71]" />
        <span className="flex-1">Search crops, mandi prices, orders...</span>
        <kbd className="px-1.5 py-0.5 bg-[#FAF8F3] border border-[#DFD9CD] rounded text-[10px] text-[#6F7A71] font-mono shadow-soft-xs">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {role !== "admin" && (
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
        )}

        {/* Notification Bell */}
        <button
          onClick={() => toast("All caught up! No unread notifications.")}
          className="relative p-2 rounded-xl text-[#3A4B3F] hover:text-[#183B2B] hover:bg-[#F0ECE2] transition-colors"
          title="Notifications"
        >
          <HiOutlineBell className="text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2E6845] ring-2 ring-[#FBF9F5]"></span>
        </button>

        {/* User Profile Pill & Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl hover:bg-[#F2EFE6] cursor-pointer transition-all border border-transparent hover:border-[#E4DFD3]"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#2E6845]/25 bg-[#EAE6DC] flex-shrink-0">
              <img
                src={profilePicUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";
                }}
              />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#1A261D] leading-tight">
                {fullName}
              </span>
              <span className="text-[10px] text-[#78857B] capitalize">
                {role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#78857B]" />
          </div>

          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow-soft menu menu-sm dropdown-content bg-[#FAF8F3] border border-[#E8E4DA] rounded-2xl w-52 z-50 divide-y divide-[#EFECE3]"
          >
            <div className="px-3 py-2 text-xs text-[#6F7A71]">
              Signed in as <strong className="text-[#1A261D] block truncate">{user?.email || fullName}</strong>
            </div>
            <div className="py-1">
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#2A3B30] hover:bg-[#F2EEE4] transition-colors">
                <User className="w-4 h-4 text-[#2E6845]" />
                <span>My Profile</span>
              </Link>
            </div>
            <div className="pt-1">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "http://localhost:5173/login";
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
