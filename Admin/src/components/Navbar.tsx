import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiSearch, HiOutlineBell } from "react-icons/hi";
import toast from "react-hot-toast";
import { LanguageSelector } from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import roleAtom from "../hooks/roleAtom";
import { User, LogOut, ChevronDown, Sparkles, MapPin, Menu as MenuIcon, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useLocationContext } from "../contexts/LocationContext";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./menu/Menu";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  profilePhoto?: string;
  email?: string;
}

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const recoilRole = useRecoilValue(roleAtom);
  const role = recoilRole || localStorage.getItem("role") || "farmer";
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token") || localStorage.getItem("authToken");
  const profilePicUrl = user?.profilePhoto || "/default-avatar.png";
  const { selectedMarket, locationConfig } = useLocationContext();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname.includes('/farmer/') || location.pathname.includes('/buyer/')) {
      return;
    }

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
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-[#FBF9F5] border-b border-[#E8E4DA] z-50 flex items-center justify-between px-3 sm:px-6 lg:px-8 transition-colors">
        {/* Left: Hamburger (Mobile/Tablet < 1024px) & Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-xl text-[#1A261D] hover:bg-[#F2EDE2] lg:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#1E3F2D]" />
            ) : (
              <MenuIcon className="w-5 h-5 text-[#1E3F2D]" />
            )}
          </button>

          <Link to={role === "buyer" ? "/buyer-products" : "/home"} className="flex items-center space-x-1.5 sm:space-x-2 group">
            <img
              src={logo}
              alt="FarmBridge logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#163022] group-hover:text-[#234E37] transition-colors">
              FarmBridge
            </span>
          </Link>

          {/* Role Pill Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF2EC] text-[#244C34] border border-[#D5E2D7] ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6845]"></span>
            {role === "farmer" ? "Farmer Producer" : role === "buyer" ? "Verified Buyer" : "Administrator"}
          </div>

          {/* Live APMC Pill */}
          <Link
            to="/apmc-prices"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF4EF] hover:bg-[#E2ECE4] text-[#1E3F2D] border border-[#CDE0D2] transition-colors shadow-soft-xs"
            title="Click to view live APMC Mandi rates"
          >
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#246A3E] flex-shrink-0" />
            <span className="max-w-[85px] sm:max-w-[130px] truncate">
              {selectedMarket?.name || locationConfig.district || "APMC Bhav"}
            </span>
          </Link>
        </div>

        {/* Center: Search bar simulation (Desktop only >= 1024px) */}
        <Link
          to="/apmc-prices"
          className="hidden xl:flex items-center w-72 lg:w-80 px-3.5 py-1.5 bg-[#F4F1E8] border border-[#E4DFD3] rounded-xl text-xs text-[#6F7A71] gap-2 hover:border-[#D0C9BA] transition-colors"
        >
          <HiSearch className="text-base text-[#6F7A71]" />
          <span className="flex-1 truncate">Search crops, mandi prices...</span>
          <kbd className="px-1.5 py-0.5 bg-[#FAF8F3] border border-[#DFD9CD] rounded text-[10px] text-[#6F7A71] font-mono shadow-soft-xs">
            APMC
          </kbd>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
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
              className="flex items-center gap-2 p-1 sm:p-1.5 sm:pr-2.5 rounded-xl hover:bg-[#F2EFE6] cursor-pointer transition-all border border-transparent hover:border-[#E4DFD3]"
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
                <span className="text-xs font-bold text-[#1A261D] leading-tight max-w-[120px] truncate">
                  {fullName}
                </span>
                <span className="text-[10px] text-[#78857B] capitalize">
                  {role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#78857B] hidden sm:inline" />
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
                <Link to="/apmc-prices" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#2A3B30] hover:bg-[#F2EEE4] transition-colors">
                  <MapPin className="w-4 h-4 text-[#2E6845]" />
                  <span>APMC Mandi Bhav</span>
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

      {/* Mobile Drawer Navigation (< 1024px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="relative w-[280px] max-w-[85vw] h-[calc(100vh-4rem)] bg-[#FAF8F3] border-r border-[#E8E4DA] p-4 overflow-y-auto shadow-soft-xl"
            >
              <Menu />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
