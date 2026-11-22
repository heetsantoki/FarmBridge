import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Sprout, ShoppingCart, User, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import img from "../assets/logo.png"
import { LanguageSelector } from "./LanguageSelector"
import { useLocationContext } from "../contexts/LocationContext"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { selectedMarket, locationConfig, setIsSelectorOpen } = useLocationContext()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/about", label: "About" },
    { path: "/resources", label: "Resources" },
    { path: "/success-stories", label: "Success Stories" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 font-sans ${
        scrolled
          ? "bg-[#FBF9F5] border-b border-[#E8E4DA] shadow-soft-xs"
          : "bg-[#FBF9F5] border-b border-[#E8E4DA]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={img}
              alt="FarmBridge logo"
              className="h-11 w-11 object-contain mr-2 transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-[#1A261D] group-hover:text-[#18392B] transition-colors tracking-tight">
              FarmBridge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "text-[#1E3F2D] bg-[#EEF4EF]"
                    : "text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1E3F2D] rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-2.5">
          {/* APMC Location Pill */}
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EEF4EF] hover:bg-[#E2ECE4] text-[#1E3F2D] border border-[#CDE0D2] transition-all cursor-pointer shadow-soft-xs"
            title="Click to view or change your nearest APMC market"
          >
            <MapPin className="w-3.5 h-3.5 text-[#246A3E] flex-shrink-0" />
            <span className="max-w-[130px] truncate">
              {selectedMarket?.name || locationConfig.district || "Select APMC"}
            </span>
          </button>

          {/* Language Selector */}
          <div className="w-24">
            <LanguageSelector />
          </div>

          <Link
            to="/login"
            className="px-4 py-2 text-xs font-semibold text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] rounded-xl transition-all"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] text-xs font-semibold rounded-xl shadow-soft-xs transition-all"
          >
            Join Marketplace
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 text-[#1A261D] hover:bg-[#F2EDE2] rounded-xl md:hidden transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#FAF8F3] border-b border-[#E8E4DA] md:hidden overflow-hidden shadow-soft font-sans"
          >
            <nav className="px-5 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#EEF4EF] text-[#1E3F2D]"
                      : "text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#E8E4DA] space-y-3">
                <div className="flex items-center justify-between px-2 gap-2">
                  <LanguageSelector />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSelectorOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EEF4EF] text-[#1E3F2D] border border-[#CDE0D2]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#246A3E]" />
                    <span className="max-w-[120px] truncate">
                      {selectedMarket?.name || locationConfig.district || "Select APMC"}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-2.5 bg-[#FFFFFF] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#1A261D] rounded-xl text-xs font-semibold text-center transition-colors shadow-soft-xs"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl text-xs font-semibold text-center shadow-soft-xs transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
export default Header;