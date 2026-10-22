import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, UserCircle, FileText, Mail, Phone, Globe2, ShieldCheck } from "lucide-react";
import { useRecoilValue } from "recoil";
import tokenAtom from "../hooks/tokenAtom";

interface User {
  profilePhoto?: string;
  proofDocument?: string;
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  documentNo: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useRecoilValue(tokenAtom);

useEffect(() => {
  const fetchUserProfile = async () => {
    console.log("Current token in use:", token); // 👀 DEBUG

    if (!token || token === "login") {
      console.error("❌ Invalid token found:", token);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Fetched user profile:", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("🚫 Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserProfile();
}, [token]);

  const profilePicUrl = user?.profilePhoto || "/default-avatar.png";
  const proofDocumentUrl = user?.proofDocument || "/default-proof.png";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-500" size={50} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-3xl border border-gray-200">
      {user ? (
        <>
          <div className="flex items-center gap-6 mb-6">
            <img
              src={profilePicUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <UserCircle className="text-blue-500" size={28} />
                {user.firstName} {user.lastName}
              </h1>
              <span className="text-sm mt-1 inline-block bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
                {user.userType === "farmer" ? "🌾 Farmer" : "🛒 Buyer"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-5 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Mail className="text-gray-500" size={18} /> Contact Information
              </h2>
              <p className="text-gray-600 mb-2"><Mail className="inline mr-2" size={16} /> {user.email}</p>
              <p className="text-gray-600"><Phone className="inline mr-2" size={16} /> {user.phone}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Globe2 className="text-gray-500" size={18} /> Location
              </h2>
              <p className="text-gray-600">{user.country}, {user.state}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-gray-500" size={18} /> Document Verification
              </h2>
              <p className="text-gray-600 mb-2">🆔 Document No: {user.documentNo}</p>
              <img
                src={proofDocumentUrl}
                alt="Proof Document"
                className="w-full h-48 object-contain border border-gray-300 rounded-lg mt-2 hover:shadow-lg transition duration-300"
              />
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-center text-lg">❌ Unauthorized: Please log in</p>
      )}
    </div>
  );
};

export default Profile;
