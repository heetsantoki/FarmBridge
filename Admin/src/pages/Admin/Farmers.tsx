import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from '../../hooks/useTranslation';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  RefreshCw,
  ShieldCheck,
  Search
} from 'lucide-react';
import { toast } from 'react-toastify';

interface Farmer {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePhoto?: string;
  proofDocument?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  documentNo?: string;
  createdAt?: string;
}

const Farmers = () => {
  const { t } = useTranslation();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const token = localStorage.getItem('token');

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/user/all?role=farmer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFarmers(res.data || []);
    } catch (err: any) {
      console.error('Fetch farmers error:', err);
      toast.error('Failed to load registered farmers from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const filteredFarmers = farmers.filter(f => {
    const fullName = `${f.firstName || ''} ${f.lastName || ''} ${f.username || ''}`.toLowerCase();
    const location = `${f.state || ''} ${f.country || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || location.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
            Admin Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            Registered Farmers Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            Real-time verification and profile tracking directly from MongoDB database ({farmers.length} registered producers).
          </p>
        </div>

        <button
          onClick={fetchFarmers}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1E3F2D]' : ''}`} />
          Refresh Database
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FAF8F3] rounded-2xl p-4 border border-[#E8E4DA] shadow-soft-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#7F8B82]" />
          <input
            type="text"
            placeholder="Search farmers by name, username, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D]"
          />
        </div>
        <span className="text-xs text-[#5C6B5F] font-semibold hidden sm:inline">
          Showing <strong>{filteredFarmers.length}</strong> farmers
        </span>
      </div>

      {/* Farmers List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : filteredFarmers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E4DA] max-w-md mx-auto shadow-soft-xs">
          <User className="w-12 h-12 text-[#7F8B82] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1A261D]">No Farmers Found</h3>
          <p className="text-xs text-[#5C6B5F] mt-1">
            {searchTerm ? 'No registered farmers match your search query.' : 'No farmers have registered in the database yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((f) => (
            <div
              key={f._id}
              className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-xs hover:shadow-soft transition-all duration-200 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={f.profilePhoto || '/default-avatar.png'}
                  alt={f.firstName}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E8E4DA] bg-[#FAF8F3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&auto=format&fit=crop';
                  }}
                />
                <div>
                  <h3 className="text-base font-bold text-[#1A261D]">
                    {f.firstName} {f.lastName || ''}
                  </h3>
                  <span className="text-xs font-mono text-[#5C6B5F]">@{f.username}</span>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#1E3F2D] bg-[#EEF4EF] px-2 py-0.5 rounded-md border border-[#D5E4D8] w-fit">
                    <ShieldCheck className="w-3 h-3 text-[#1E3F2D]" />
                    <span>Verified Producer</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#5C6B5F] bg-[#FAF8F3] p-3.5 rounded-xl border border-[#E8E4DA]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#1E3F2D] flex-shrink-0" />
                  <span>{f.state || 'State not provided'}, {f.country || 'India'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#1E3F2D] flex-shrink-0" />
                  <a href={`tel:${f.phone}`} className="hover:underline text-[#1A261D] font-medium">{f.phone || 'N/A'}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#1E3F2D] flex-shrink-0" />
                  <span className="truncate">{f.email || 'N/A'}</span>
                </div>
                {f.documentNo && (
                  <div className="flex items-center gap-2 pt-1 border-t border-[#E8E4DA]">
                    <span className="font-semibold text-[#1A261D]">Gov ID / Doc:</span>
                    <span className="font-mono text-[#1E3F2D]">{f.documentNo}</span>
                  </div>
                )}
              </div>

              {f.proofDocument && (
                <a
                  href={f.proofDocument}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#1A261D] rounded-xl text-xs font-semibold text-center transition-colors shadow-soft-xs"
                >
                  Inspect Verification Proof
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Farmers;
