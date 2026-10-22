import React, { useState, useRef } from 'react';
import { toast } from "sonner";
import { User, MapPin, MessageSquare, Phone, Mail, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "../../hooks/useTranslation";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const BuyerHelp = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyerName: '',
    address: '',
    contactNo: '',
    email: '',
    productIssue: '',
  });
  const [buyerPhoto, setBuyerPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBuyerPhoto(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setBuyerPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.buyerName || !formData.contactNo || !formData.productIssue) {
      toast.error(t('BuyerHelp.missingInformation.title'), {
        description: t('BuyerHelp.missingInformation.description'),
      });
      return;
    }
    
    // Create a new help request
    const newRequest = {
      id: uuidv4(),
      buyerName: formData.buyerName,
      address: formData.address,
      contactNo: formData.contactNo,
      email: formData.email,
      productIssue: formData.productIssue,
      photo: photoPreview,
      status: 'pending' as const,
      date: new Date().toISOString(),
    };
    
    // Get existing requests from localStorage or initialize with empty array
    const existingRequests = JSON.parse(localStorage.getItem('buyerHelpRequests') || '[]');
    
    // Add new request to the array
    const updatedRequests = [newRequest, ...existingRequests];
    
    // Save back to localStorage
    localStorage.setItem('buyerHelpRequests', JSON.stringify(updatedRequests));
    
    // Log the submission for debugging
    console.log('Submitted buyer help request:', newRequest);
    
    // Show success toast
    toast.success(t('BuyerHelp.helpRequestSubmitted.title'), {
      description: t('BuyerHelp.helpRequestSubmitted.description'),
    });
    
    // Reset form
    setFormData({
      buyerName: '',
      address: '',
      contactNo: '',
      email: '',
      productIssue: '',
    });
    setBuyerPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Optional: redirect to the issues page to see the submitted request
    // Uncomment the line below to enable redirection
    // navigate('/issues');
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-neutral-200 text-neutral-700 rounded-full text-xs font-medium tracking-wider mb-3 mt-6">
              {t('BuyerHelp.customerSupport')}
            </span>
          </motion.div>
          <motion.h1 
            className="text-3xl font-semibold mb-2 text-neutral-900 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('BuyerHelp.formTitle')}
          </motion.h1>
          <motion.p 
            className="text-neutral-500 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('BuyerHelp.formDescription')}
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buyer Photo Section */}
              <div className="col-span-full mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.buyerPhoto')}
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {photoPreview ? (
                      <div className="relative w-24 h-24">
                        <img 
                          src={photoPreview} 
                          alt="Buyer preview" 
                          className="w-24 h-24 rounded-full object-cover border-2 border-neutral-200"
                        />
                        <button 
                          type="button"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-neutral-200 transition-colors hover:bg-neutral-100"
                        >
                          <X className="h-4 w-4 text-neutral-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center border-2 border-dashed border-neutral-300">
                        <User className="h-10 w-10 text-neutral-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      id="buyerPhoto"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 hover:bg-neutral-200 transition-colors text-sm font-medium flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {buyerPhoto ? t('BuyerHelp.changePhoto') : t('BuyerHelp.uploadPhoto')}
                    </button>
                    <p className="mt-1 text-xs text-neutral-500">
                     
                    </p>
                  </div>
                </div>
              </div>

              {/* Buyer Name */}
              <div className="col-span-1">
                <label htmlFor="buyerName" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.buyerName')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="buyerName"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    required
                    
                  />
                </div>
              </div>
              
              {/* Contact Number */}
              <div className="col-span-1">
                <label htmlFor="contactNo" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.contactNo')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    required
                    
                  />
                </div>
              </div>
              
              {/* Email */}
              <div className="col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                 
                  />
                </div>
              </div>
              
              {/* Address */}
              <div className="col-span-1">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.address')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                   
                  />
                </div>
              </div>
              
              {/* Product Issue */}
              <div className="col-span-2">
                <label htmlFor="productIssue" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('BuyerHelp.productIssue')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-4 w-4 text-neutral-400" />
                  </div>
                  <textarea
                    id="productIssue"
                    name="productIssue"
                    value={formData.productIssue}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    required
                    
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <motion.button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('BuyerHelp.submit')}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};
 
export { BuyerHelp };