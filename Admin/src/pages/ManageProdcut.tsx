import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Package,
  PlusCircle,
  Trash2,
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  Calendar,
  Search,
  Edit3,
  X
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
  images: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minQuantity: number;
  unit: string;
  qualityCertificateNo?: string;
  qualityParameters?: string;
  extraDetails?: string;
  createdAt?: string;
}

const ManageProduct: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    minQuantity: "",
    unit: "",
    priceMin: "",
    priceMax: "",
    qualityCertificateNo: "",
    qualityParameters: "",
    extraDetails: "",
  });
  const [editImages, setEditImages] = useState<File[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMyProducts = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/product/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err: any) {
      console.error("Error fetching my products:", err);
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product listing?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product listing removed");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setEditFormData({
      name: prod.name,
      category: prod.category,
      minQuantity: String(prod.minQuantity || ""),
      unit: prod.unit || "kg",
      priceMin: String(prod.priceRange?.min || ""),
      priceMax: String(prod.priceRange?.max || ""),
      qualityCertificateNo: prod.qualityCertificateNo || "",
      qualityParameters: prod.qualityParameters || "",
      extraDetails: prod.extraDetails || "",
    });
    setEditImages([]);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdating(true);
    const data = new FormData();
    data.append("name", editFormData.name);
    data.append("category", editFormData.category);
    data.append("minQuantity", editFormData.minQuantity);
    data.append("unit", editFormData.unit);
    data.append("priceMin", editFormData.priceMin);
    data.append("priceMax", editFormData.priceMax);
    data.append("qualityCertificateNo", editFormData.qualityCertificateNo);
    data.append("qualityParameters", editFormData.qualityParameters);
    data.append("extraDetails", editFormData.extraDetails);

    editImages.forEach((f) => {
      data.append("images", f);
    });

    try {
      const res = await axios.put(`http://localhost:5000/api/product/${editingProduct._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Crop details updated successfully!");
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? res.data.product : p))
      );
      setEditingProduct(null);
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Failed to update product");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C6B5F] hover:text-[#18392B] transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Producer Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
            My Crop Inventory
          </h1>
          <p className="text-sm text-[#5C6B5F] mt-1 font-normal">
            Active farm produce lots listed for verified bulk procurement in the marketplace.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchMyProducts}
            title="Refresh"
            className="p-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-[#5C6B5F] hover:text-[#1A261D] transition-all shadow-soft-xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#1E3F2D]" : ""}`} />
          </button>
          <Link
            to="/view-products"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl text-xs font-semibold shadow-soft-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            + Upload New Harvest
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FAF8F3] rounded-2xl p-4 border border-[#E8E4DA] shadow-soft-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7F8B82]" />
          <input
            type="text"
            placeholder="Search crops by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm font-medium text-[#1A261D] placeholder:text-[#7F8B82] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${selectedCategory === cat
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                : "bg-[#FFFFFF] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
                }`}
            >
              {cat === "all" ? "All Crops" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-[#FAF8F3] rounded-2xl p-14 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
          <div className="w-14 h-14 bg-[#EEF4EF] text-[#1E3F2D] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D5E4D8]">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A261D]">No Crops Found</h3>
          <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
            {searchTerm
              ? "No crops matched your search filter. Try clearing your search keyword."
              : "You haven't listed any crops in the marketplace yet. Add your first harvest to get started!"}
          </p>
          <Link
            to="/view-products"
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-all"
          >
            <PlusCircle className="w-4 h-4" /> Upload New Harvest
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const imgUrl =
              prod.images && prod.images.length > 0
                ? `http://localhost:5000${prod.images[0]}`
                : "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";

            return (
              <div
                key={prod._id}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-0.5"
              >
                <div className="relative h-52 w-full bg-[#F5F1E8] overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142C1F]/60 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3.5 left-3.5 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#1A261D] shadow-soft-xs border border-[#E8E4DA]">
                    {prod.category}
                  </span>

                  <div className="absolute top-3.5 right-3.5 flex gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      title="Edit Crop Listing"
                      className="w-8 h-8 bg-[#FAF8F3] text-[#1E3F2D] hover:bg-white border border-[#E8E4DA] rounded-full flex items-center justify-center shadow-soft-xs transition-all hover:scale-105"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      title="Remove Crop Listing"
                      className="w-8 h-8 bg-[#FAF8F3] text-[#7F8B82] hover:text-[#842A2A] border border-[#E8E4DA] rounded-full flex items-center justify-center shadow-soft-xs transition-all hover:scale-105"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-end text-[#FAF8F3]">
                    <span className="text-xs font-normal">
                      Min: <strong className="font-semibold">{prod.minQuantity} {prod.unit}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1A261D] group-hover:text-[#18392B] transition-colors line-clamp-1">
                      {prod.name}
                    </h3>

                    <div className="mt-3 bg-[#FAF8F3] rounded-xl p-3 border border-[#E8E4DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">Listed Rate</span>
                        <div className="text-base font-bold text-[#18392B]">
                          ₹{prod.priceRange?.min} - ₹{prod.priceRange?.max}
                          <span className="text-xs font-normal text-[#5C6B5F]"> / {prod.unit}</span>
                        </div>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 bg-[#EEF4EF] text-[#1E3F2D] border border-[#D5E4D8] rounded-md font-semibold">
                        Active
                      </span>
                    </div>

                    {prod.qualityCertificateNo && (
                      <div className="mt-2.5 text-xs text-[#5C6B5F] flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1.5 rounded-lg border border-[#E8E4DA]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1E3F2D] flex-shrink-0" />
                        <span>Cert: <strong className="font-mono text-[#1A261D]">{prod.qualityCertificateNo}</strong></span>
                      </div>
                    )}

                    {prod.extraDetails && (
                      <p className="mt-2.5 text-xs text-[#5C6B5F] line-clamp-2 leading-relaxed">
                        {prod.extraDetails}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DA]/70 flex justify-between items-center text-xs text-[#7F8B82]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#7F8B82]" />
                      {prod.createdAt ? new Date(prod.createdAt).toLocaleDateString() : "Listed"}
                    </span>
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="text-[#1E3F2D] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-[#142C1F]/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E8E4DA] shadow-soft-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-1.5 text-[#7F8B82] hover:text-[#1A261D] bg-[#FAF8F3] hover:bg-[#F2EDE2] rounded-full transition-colors border border-[#E8E4DA]"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-bold text-[#1A261D] mb-1">
              Edit Crop Listing: {editingProduct.name}
            </h2>
            <p className="text-xs text-[#5C6B5F] mb-6">
              Update pricing, minimum quantity, or certification parameters in real-time.
            </p>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Category</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  >
                    <option value="Grains">Grains & Cereals</option>
                    <option value="Vegetables">Fresh Vegetables</option>
                    <option value="Fruits">Seasonal Fruits</option>
                    <option value="Pulses">Pulses & Lentils</option>
                    <option value="Spices">Spices & Herbs</option>
                    <option value="Oilseeds">Oilseeds & Mustard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Min Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editFormData.priceMin}
                    onChange={(e) => setEditFormData({ ...editFormData, priceMin: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Max Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editFormData.priceMax}
                    onChange={(e) => setEditFormData({ ...editFormData, priceMax: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Min Lot Qty</label>
                  <input
                    type="number"
                    required
                    value={editFormData.minQuantity}
                    onChange={(e) => setEditFormData({ ...editFormData, minQuantity: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Unit</label>
                  <select
                    value={editFormData.unit}
                    onChange={(e) => setEditFormData({ ...editFormData, unit: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="ton">ton</option>
                    <option value="box">box</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Quality Certificate No</label>
                  <input
                    type="text"
                    placeholder="e.g. AGMARK-GJ-1092"
                    value={editFormData.qualityCertificateNo}
                    onChange={(e) => setEditFormData({ ...editFormData, qualityCertificateNo: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[#5C6B5F] mb-1">Quality Parameters</label>
                  <input
                    type="text"
                    placeholder="e.g. Moisture < 11%, Grade A"
                    value={editFormData.qualityParameters}
                    onChange={(e) => setEditFormData({ ...editFormData, qualityParameters: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-[#5C6B5F] mb-1">Extra Details</label>
                <textarea
                  rows={2}
                  value={editFormData.extraDetails}
                  onChange={(e) => setEditFormData({ ...editFormData, extraDetails: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm text-[#1A261D]"
                />
              </div>

              <div>
                <label className="block uppercase text-[#5C6B5F] mb-1">Replace Harvest Photos (optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setEditImages(e.target.files ? Array.from(e.target.files) : [])}
                  className="w-full text-xs text-[#5C6B5F]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8E4DA] text-[#5C6B5F] hover:bg-[#FAF8F3] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2.5 rounded-xl bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold transition-colors shadow-soft-xs"
                >
                  {isUpdating ? "Saving Updates..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
