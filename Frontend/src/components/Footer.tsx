import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';
import img from "../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-[#142C1F] text-[#CAD7CD] border-t border-[#1E3F2D] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={img}
                alt="FarmBridge Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-[#FAF8F3]">
                FarmBridge
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#CAD7CD] max-w-sm leading-relaxed font-normal">
              India's direct agricultural marketplace connecting verified village harvest producers with institutional wholesale buyers. Zero middlemen markups. 100% transparent trade.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[#A5D6B1]">
              <ShieldCheck className="w-4 h-4 text-[#A5D6B1]" />
              <span>APMC Live Benchmarking • AGMARK Quality Logging</span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F3] mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/marketplace" className="hover:text-[#FAF8F3] transition-colors">
                  All Harvest Lots
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#FAF8F3] transition-colors">
                  Grains & Cereals
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#FAF8F3] transition-colors">
                  Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#FAF8F3] transition-colors">
                  Seasonal Fruits
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-[#FAF8F3] transition-colors">
                  Pulses & Lentils
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F3] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-[#FAF8F3] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-[#FAF8F3] transition-colors">
                  Farmer Success Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#FAF8F3] transition-colors">
                  Producer Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FAF8F3] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F3] mb-4">
              Helpdesk & Direct Line
            </h4>
            <ul className="space-y-3 text-xs text-[#CAD7CD]">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A5D6B1] flex-shrink-0" />
                <span>support@farmbridge.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A5D6B1] flex-shrink-0" />
                <span>1800 240 8820 (Toll-Free Helpline)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A5D6B1] flex-shrink-0 mt-0.5" />
                <span>Agricultural Trade Hub, Gujarat, India</span>
              </li>
            </ul>

            <div className="flex space-x-2.5 mt-5">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1E3F2D] hover:bg-[#2E614B] text-[#FAF8F3] flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1E3F2D] hover:bg-[#2E614B] text-[#FAF8F3] flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1E3F2D] hover:bg-[#2E614B] text-[#FAF8F3] flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1E3F2D] hover:bg-[#2E614B] text-[#FAF8F3] flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1E3F2D] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7F9A87]">
          <p>&copy; {new Date().getFullYear()} FarmBridge Digital Agricultural Commerce. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[#CAD7CD]">
            <span>Fair Agricultural Trade for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;