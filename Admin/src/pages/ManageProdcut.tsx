import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, PlusCircle, Trash2, ArrowLeft, RefreshCw, ShieldCheck, Calendar, Search } from "lucide-react";

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
  extraDetails?: string;
  createdAt?: string;
}

const ManageProduct: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
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

                  <button
                    onClick={() => handleDelete(prod._id)}
                    title="Remove Crop Listing"
                    className="absolute top-3.5 right-3.5 w-8 h-8 bg-[#FAF8F3] text-[#7F8B82] hover:text-[#842A2A] border border-[#E8E4DA] rounded-full flex items-center justify-center shadow-soft-xs transition-all hover:scale-105"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

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
                    <span className="text-[#1E3F2D] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#1E3F2D] inline-block" />
                      Live in Market
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageProduct;

