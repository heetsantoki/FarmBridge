import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, UserCircle, Mail, Phone, Globe2, ShieldCheck, Edit3, X, Save, Upload, Trash2, AlertTriangle } from "lucide-react";
import { useRecoilValue } from "recoil";
import tokenAtom from "../hooks/tokenAtom";
import { toast } from "react-toastify";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    state: "",
    documentNo: "",
  });
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [proofDocFile, setProofDocFile] = useState<File | null>(null);

  const token = useRecoilValue(tokenAtom) || localStorage.getItem("token") || localStorage.getItem("authToken");

  const fetchUserProfile = async () => {
    if (!token || token === "login") {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedUser = response.data.user;
      setUser(fetchedUser);
      setFormData({
        firstName: fetchedUser.firstName || "",
        lastName: fetchedUser.lastName || "",
        phone: fetchedUser.phone || "",
        country: fetchedUser.country || "",
        state: fetchedUser.state || "",
        documentNo: fetchedUser.documentNo || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("country", formData.country);
    data.append("state", formData.state);
    data.append("documentNo", formData.documentNo);

    if (profilePhotoFile) data.append("profilePhoto", profilePhotoFile);
    if (proofDocFile) data.append("proofDocument", proofDocFile);

    try {
      const res = await axios.put("http://localhost:5000/api/user/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      setUser(res.data.user);
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) return;
    setIsDeleting(true);
    try {
      const response = await axios.delete("http://localhost:5000/api/user/account", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(response.data.message || "Account deleted successfully.");
      localStorage.clear();

      setTimeout(() => {
        window.location.href = "http://localhost:5173/login";
      }, 1000);
    } catch (err: any) {
      console.error("Delete account error:", err);
      toast.error(err.response?.data?.message || "Failed to delete account. Please try again.");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

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
    <div className="max-w-4xl mx-auto mt-6 p-8 bg-white shadow-soft rounded-3xl border border-[#E8E4DA] font-sans">
      {user ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-[#E8E4DA] pb-6">
            <div className="flex items-center gap-6">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#EEF4EF] object-cover shadow-soft-xs"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] flex items-center gap-2">
                  <UserCircle className="text-[#1E3F2D]" size={28} />
                  {user.firstName} {user.lastName}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF4EF] text-[#1E3F2D] border border-[#D5E4D8]">
                    {user.userType === "farmer" ? "🌾 Registered Producer" : "🛒 Verified Buyer"}
                  </span>
                  <span className="text-xs text-[#7F8B82] font-mono">@{user.email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1E3F2D] border border-[#E8E4DA] rounded-xl text-xs font-semibold shadow-soft-xs transition-colors self-start sm:self-auto"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateSubmit} className="space-y-5 bg-[#FAF8F3] p-6 rounded-2xl border border-[#E8E4DA]">
              <h2 className="text-base font-bold text-[#1A261D] mb-4">Edit Personal Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Gov Document / ID Number</label>
                <input
                  type="text"
                  value={formData.documentNo}
                  onChange={(e) => setFormData({ ...formData, documentNo: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E8E4DA] rounded-xl text-sm outline-none focus:border-[#1E3F2D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Change Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePhotoFile(e.target.files?.[0] || null)}
                    className="text-xs text-[#5C6B5F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#5C6B5F] mb-1">Update Proof Document</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProofDocFile(e.target.files?.[0] || null)}
                    className="text-xs text-[#5C6B5F]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E4DA] text-xs font-semibold text-[#5C6B5F] hover:bg-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] text-xs font-semibold transition-colors shadow-soft-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {isSaving ? "Saving Updates..." : "Save Profile Updates"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
                <h2 className="text-sm font-bold text-[#1A261D] mb-4 flex items-center gap-2">
                  <Mail className="text-[#1E3F2D]" size={16} /> Contact Information
                </h2>
                <div className="space-y-2 text-xs text-[#5C6B5F]">
                  <p><strong className="text-[#1A261D]">Email:</strong> {user.email}</p>
                  <p><strong className="text-[#1A261D]">Phone:</strong> {user.phone || "Not provided"}</p>
                </div>
              </div>

              <div className="bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
                <h2 className="text-sm font-bold text-[#1A261D] mb-4 flex items-center gap-2">
                  <Globe2 className="text-[#1E3F2D]" size={16} /> Location
                </h2>
                <div className="space-y-2 text-xs text-[#5C6B5F]">
                  <p><strong className="text-[#1A261D]">Region / State:</strong> {user.state || "India"}</p>
                  <p><strong className="text-[#1A261D]">Country:</strong> {user.country || "India"}</p>
                </div>
              </div>

              <div className="md:col-span-2 bg-[#FAF8F3] rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
                <h2 className="text-sm font-bold text-[#1A261D] mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-[#1E3F2D]" size={16} /> Document Verification
                </h2>
                <p className="text-xs text-[#5C6B5F] mb-3">
                  <strong className="text-[#1A261D]">Document ID:</strong> {user.documentNo || "Under verification"}
                </p>
                <div className="h-44 rounded-xl border border-[#E8E4DA] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={proofDocumentUrl}
                    alt="Proof Document"
                    className="max-h-full max-w-full object-contain p-2"
                  />
                </div>
              </div>

              {/* Danger Zone: Delete Account */}
              <div className="md:col-span-2 bg-[#FFF5F5] rounded-2xl p-5 sm:p-6 border border-[#F8D2D2] shadow-soft-xs mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-bold text-[#C93B3B] flex items-center gap-2 mb-1">
                      <AlertTriangle size={16} /> Danger Zone: Delete Account
                    </h2>
                    <p className="text-xs text-[#7A3838] leading-relaxed max-w-xl">
                      Once you delete your account, this action cannot be undone. All your profile information and active crop listings will be permanently wiped from the database.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="self-start sm:self-auto px-4 py-2.5 bg-[#C93B3B] hover:bg-[#A82828] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-soft-xs transition-colors whitespace-nowrap"
                  >
                    <Trash2 size={14} /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-rose-600 text-center text-sm font-semibold">Please log in to view your profile</p>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF8F3] border border-[#E8E4DA] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-[#1A261D]">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-center text-[#1A261D] mb-2">
              Delete Your Account?
            </h3>
            <p className="text-xs sm:text-sm text-center text-[#5C6B5F] mb-6 leading-relaxed">
              Are you sure you want to permanently delete your account? All your personal details, credentials, and <strong>all products you have listed for sale</strong> will be immediately removed from the marketplace.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-white hover:bg-gray-100 border border-[#D8D2C5] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-[#C93B3B] hover:bg-[#A82828] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-soft-xs transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Yes, Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
