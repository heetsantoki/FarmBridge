import { motion, AnimatePresence } from "framer-motion";
import { Star, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from 'embla-carousel-react';

interface ProductType {
  id: number;
  images: string[];
  name: string;
  priceRange: {
    min: number;
    max: number;
  };
  description: string;
  farmerName: string;
  farmerCity?: string;
  quality: number;
  category: string;
  quantity: string;
}

interface ProductDetailsModalProps {
  product: ProductType;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const images = product.images; // Use the images from the product

  const renderStars = (quality: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < Math.floor(quality) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const mockProductDetails = {
    certification: "Organic Certified by FSSAI",
    landType: "Fertile Black Soil",
    farmingPractices: [
      "No chemical pesticides used",
      "Natural fertilizers only",
      "Sustainable irrigation methods",
      "Crop rotation practiced"
    ],
    qualityParameters: [
      "Hand-picked at optimal ripeness",
      "Carefully sorted and graded",
      "Stored in temperature-controlled environment",
      "Regular quality checks performed"
    ],
    farmerExperience: "15+ years in organic farming",
    contactNumber: "+91 98765 43210"
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A261D]/60"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-[#FAF8F3] border border-[#E8E4DA] rounded-2xl shadow-soft-lg overflow-hidden h-[85vh] flex flex-col font-sans text-[#1A261D]"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute right-6 top-6 p-2.5 rounded-full bg-white hover:bg-[#F2EDE2] shadow-soft-xs transition-colors z-10 border border-[#E8E4DA]"
            >
              <X className="h-5 w-5 text-[#1A261D]" />
            </motion.button>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
                <div className="space-y-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 h-[450px] group">
                    <div className="embla" ref={emblaRef}>
                      <div className="flex">
                        {images.map((img, index) => (
                          <div key={index} className="flex-[0_0_100%]">
                            <img
                              src={img}
                              alt={`${product.name} ${index + 1}`}
                              className="w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button
                      onClick={() => emblaApi?.scrollPrev()}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-800" />
                    </button>
                    <button
                      onClick={() => emblaApi?.scrollNext()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-800" />
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#E8E4DA] shadow-soft-xs">
                      {renderStars(product.quality)}
                      <motion.span className="text-sm font-medium text-[#5C6B5F]">
                        {product.quality}/5 {t("products.rating")}
                      </motion.span>
                      <button
                        onClick={() => setShowMoreDetails(!showMoreDetails)}
                        className="ml-auto bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] px-4 py-2 rounded-xl text-xs font-semibold shadow-soft-xs transition-colors flex items-center gap-1.5"
                      >
                        {showMoreDetails ? t("products.View Less") : t("products.Read More")}
                        {showMoreDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-[#18392B]"
                  >
                    {t(`products.${product.name}`)}
                  </motion.h2>

                  <div className="bg-white rounded-2xl p-5 shadow-soft-xs border border-[#E8E4DA] space-y-3">
                    <h3 className="font-semibold text-[#1A261D] text-base">{t("products.Product Info")}</h3>
                    <div className="space-y-2 divide-y divide-[#E8E4DA]">
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Quantity")}:</span>
                        <span className="font-semibold text-[#1A261D]">{product.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Price Range")}:</span>
                        <span className="font-semibold text-[#1E3F2D]">₹{product.priceRange.min} - ₹{product.priceRange.max}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Category")}:</span>
                        <span className="font-semibold text-[#1A261D]">{product.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-soft-xs border border-[#E8E4DA] space-y-3">
                    <h3 className="font-semibold text-[#1A261D] text-base">{t("products.Farmer Details")}</h3>
                    <div className="space-y-2 divide-y divide-[#E8E4DA]">
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Name")}:</span>
                        <span className="font-semibold text-[#1A261D]">{t(`products.farmerNames.${product.farmerName}`)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Contact")}:</span>
                        <span className="font-semibold text-[#1A261D]">{mockProductDetails.contactNumber}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 text-xs">
                        <span className="text-[#5C6B5F]">{t("products.Location")}:</span>
                        <span className="font-semibold text-[#1A261D]">{t(`products.cities.${product.farmerCity}`)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <AnimatePresence>
                {showMoreDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200/80"
                  >
                    <div className="p-8 bg-[#FAF8F3] border-t border-[#E8E4DA]">
                    <h3 className="text-xl font-semibold text-[#18392B] mb-6">
          {t("products.Detailed Information")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#1A261D] text-xs uppercase tracking-wider mb-2">{t("products.Product Certification")}</h4>
              <p className="text-xs text-[#5C6B5F] bg-white p-3 rounded-xl border border-[#E8E4DA] shadow-soft-xs">{mockProductDetails.certification}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1A261D] text-xs uppercase tracking-wider mb-2">{t("products.Land Type")}</h4>
              <p className="text-xs text-[#5C6B5F] bg-white p-3 rounded-xl border border-[#E8E4DA] shadow-soft-xs">{mockProductDetails.landType}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1A261D] text-xs uppercase tracking-wider mb-2">{t("products.Farming Practices")}</h4>
              <ul className="space-y-2">
                {mockProductDetails.farmingPractices.map((practice, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#E8E4DA] shadow-soft-xs text-xs"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#1E3F2D]" />
                    <span className="text-[#1A261D] font-medium">{t(`products.farmingPractices.${practice}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#1A261D] text-xs uppercase tracking-wider mb-2">{t("products.Quality Parameters")}</h4>
              <ul className="space-y-2">
                {mockProductDetails.qualityParameters.map((param, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-[#E8E4DA] shadow-soft-xs text-xs"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#588157]" />
                    <span className="text-[#1A261D] font-medium">{t(`products.qualityParameters.${param}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1A261D] text-xs uppercase tracking-wider mb-2">{t("products.Farmer Experience")}</h4>
              <p className="text-xs text-[#5C6B5F] bg-white p-3 rounded-xl border border-[#E8E4DA] shadow-soft-xs">
                {mockProductDetails.farmerExperience}
              </p>
            </div>
          </div>
        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;