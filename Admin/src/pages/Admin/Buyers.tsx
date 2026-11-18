import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag,
  RefreshCw,
  Search,
  Store
} from 'lucide-react';
import { toast } from 'react-toastify';

interface Buyer {
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

const Buyers = () => {
  const { t } = useTranslation();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const token = localStorage.getItem('token');

  const fetchBuyers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/user/all?role=buyer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuyers(res.data || []);
    } catch (err: any) {
      console.error('Fetch buyers error:', err);
      toast.error('Failed to load registered buyers from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const filteredBuyers = buyers.filter(b => {
    const fullName = `${b.firstName || ''} ${b.lastName || ''} ${b.username || ''}`.toLowerCase();
    const location = `${b.state || ''} ${b.country || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || location.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C485E] bg-[#EEF2F6] px-3.5 py-1.5 rounded-full border border-[#DCE4EC]">
            Admin Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            Registered Wholesale Buyers
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            Institutional buyers, retail processors, and agricultural traders ({buyers.length} registered buyers).
          </p>
        </div>

        <button
          onClick={fetchBuyers}
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
            placeholder="Search buyers by name, username, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs font-medium text-[#1A261D]"
          />
        </div>
        <span className="text-xs text-[#5C6B5F] font-semibold hidden sm:inline">
          Showing <strong>{filteredBuyers.length}</strong> buyers
        </span>
      </div>

      {/* Buyers List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : filteredBuyers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8E4DA] max-w-md mx-auto shadow-soft-xs">
          <Store className="w-12 h-12 text-[#7F8B82] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#1A261D]">No Buyers Found</h3>
          <p className="text-xs text-[#5C6B5F] mt-1">
            {searchTerm ? 'No registered buyers match your search query.' : 'No buyers have registered in the database yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-xs hover:shadow-soft transition-all duration-200 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={b.profilePhoto || '/default-avatar.png'}
                  alt={b.firstName}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#E8E4DA] bg-[#FAF8F3]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop';
                  }}
                />
                <div>
                  <h3 className="text-base font-bold text-[#1A261D]">
                    {b.firstName} {b.lastName || ''}
                  </h3>
                  <span className="text-xs font-mono text-[#5C6B5F]">@{b.username}</span>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#2C485E] bg-[#EEF2F6] px-2 py-0.5 rounded-md border border-[#DCE4EC] w-fit">
                    <ShoppingBag className="w-3 h-3 text-[#2C485E]" />
                    <span>Commercial Buyer</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#5C6B5F] bg-[#FAF8F3] p-3.5 rounded-xl border border-[#E8E4DA]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2C485E] flex-shrink-0" />
                  <span>{b.state || 'State not provided'}, {b.country || 'India'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#2C485E] flex-shrink-0" />
                  <a href={`tel:${b.phone}`} className="hover:underline text-[#1A261D] font-medium">{b.phone || 'N/A'}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#2C485E] flex-shrink-0" />
                  <span className="truncate">{b.email || 'N/A'}</span>
                </div>
                {b.documentNo && (
                  <div className="flex items-center gap-2 pt-1 border-t border-[#E8E4DA]">
                    <span className="font-semibold text-[#1A261D]">Business Doc:</span>
                    <span className="font-mono text-[#2C485E]">{b.documentNo}</span>
                  </div>
                )}
              </div>

              {b.proofDocument && (
                <a
                  href={b.proofDocument}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#1A261D] rounded-xl text-xs font-semibold text-center transition-colors shadow-soft-xs"
                >
                  Inspect Registration Proof
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buyers;
