import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Package, UploadCloud, Trash2, Sparkles } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import tokenAtom from '../hooks/tokenAtom';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(tokenAtom) || localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Grains',
    minQuantity: '',
    unit: 'kg',
    priceMin: '',
    priceMax: '',
    qualityCertificateNo: '',
    qualityParameters: '',
    extraDetails: '',
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.priceMin || !formData.minQuantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedImages.length === 0) {
      toast.error('Please upload at least one image of your harvest');
      return;
    }

    if (!token) {
      toast.error('Please log in to upload products');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('minQuantity', formData.minQuantity);
    data.append('unit', formData.unit);
    data.append('priceMin', formData.priceMin);
    data.append('priceMax', formData.priceMax || formData.priceMin);
    data.append('qualityCertificateNo', formData.qualityCertificateNo);
    data.append('qualityParameters', formData.qualityParameters);
    data.append('extraDetails', formData.extraDetails);

    selectedImages.forEach((image) => data.append('images', image));

    try {
      await axios.post('http://localhost:5000/api/product/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Crop listed successfully in marketplace!');
      navigate('/home');
    } catch (error: any) {
      console.error('Error submitting product:', error);
      toast.error(error.response?.data?.error || error.message || 'Failed to submit crop listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-16 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C6B5F] hover:text-[#18392B] transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Producer Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
            Upload New Harvest Lot
          </h1>
          <p className="text-sm text-[#5C6B5F] mt-1 font-normal">
            Provide harvest specifications, quality parameters, and photos for direct discovery by verified buyers.
          </p>
        </div>

        <Link
          to="/manageProduct"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] hover:bg-[#F2EDE2] rounded-xl text-xs font-semibold text-[#1A261D] transition-all shadow-soft-xs"
        >
          <Package className="w-4 h-4 text-[#1E3F2D]" />
          View Active Listings
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm p-6 md:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF4EF] text-[#1E3F2D] rounded-lg text-xs font-semibold mb-5 border border-[#D5E4D8]">
          <Sparkles className="w-3.5 h-3.5 text-[#1E3F2D]" />
          Direct Producer Marketplace Listing
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Crop Name <span className="text-[#842A2A]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sharbati Wheat, Fresh Alphonso Mango"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Category <span className="text-[#842A2A]">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-semibold text-[#1A261D]"
              >
                <option value="Grains">🌾 Grains & Cereals (Wheat, Rice, Maize)</option>
                <option value="Vegetables">🥬 Fresh Vegetables (Tomato, Potato, Onion)</option>
                <option value="Fruits">🍎 Fruits (Mango, Apple, Citrus)</option>
                <option value="Pulses">🫘 Pulses & Lentils (Chana, Toor, Moong)</option>
                <option value="Spices">🌶️ Spices & Herbs</option>
                <option value="Oilseeds">🌻 Oilseeds & Mustard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Minimum Order Quantity <span className="text-[#842A2A]">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 50"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Unit of Measure <span className="text-[#842A2A]">*</span>
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-semibold text-[#1A261D]"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal (100 kg)</option>
                <option value="ton">Metric Ton</option>
                <option value="box">Standard Box / Crate</option>
                <option value="dozen">Dozen</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Minimum Price (₹) <span className="text-[#842A2A]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-[#7F8B82] font-semibold">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Min price per unit"
                  value={formData.priceMin}
                  onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Maximum / Asking Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-[#7F8B82] font-semibold">₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Max price per unit"
                  value={formData.priceMax}
                  onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Quality Certificate No. (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. AGMARK-IND-88219"
                value={formData.qualityCertificateNo}
                onChange={(e) => setFormData({ ...formData, qualityCertificateNo: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
                Quality Parameters (Moisture, Grade)
              </label>
              <input
                type="text"
                placeholder="e.g. Moisture < 12%, Organic Grade A"
                value={formData.qualityParameters}
                onChange={(e) => setFormData({ ...formData, qualityParameters: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
              Harvest & Produce Description
            </label>
            <textarea
              rows={3}
              placeholder="Mention variety, harvest date, packaging details, and any organic certification..."
              value={formData.extraDetails}
              onChange={(e) => setFormData({ ...formData, extraDetails: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E8E4DA] rounded-xl focus:bg-[#FFFFFF] focus:border-[#1E3F2D] outline-none transition-all text-sm font-medium text-[#1A261D]"
            />
          </div>

          {/* Photos upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A261D] mb-1.5">
              Crop & Harvest Photos <span className="text-[#842A2A]">*</span>
            </label>

            <div className="border border-dashed border-[#E8E4DA] hover:border-[#1E3F2D] rounded-2xl p-6 text-center bg-[#FAF8F3] transition-colors">
              <input
                type="file"
                id="crop-photo-upload-page"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="crop-photo-upload-page"
                className="cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center border border-[#D5E4D8]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#1A261D]">
                  Click to browse or drop harvest photos here
                </span>
                <span className="text-[11px] text-[#7F8B82]">
                  PNG, JPG, WEBP up to 10MB (Multiple pictures supported)
                </span>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E8E4DA] shadow-soft-xs group">
                    <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-[#842A2A] text-white rounded-full p-1 opacity-90 hover:opacity-100 shadow-soft-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing Listing...' : 'Publish Harvest Lot to Marketplace'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-5 py-3 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#5C6B5F] hover:text-[#1A261D] font-semibold text-xs rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
