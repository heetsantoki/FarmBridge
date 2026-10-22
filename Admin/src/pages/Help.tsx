import React, { useState, useRef, useEffect } from 'react';
import Calendar from "../components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "../hooks/use-toast";
import { Camera, MapPin, MessageSquare, Calendar as CalendarIcon, Phone, Mail, User } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';

const Help = () => {
  const { t } = useTranslation(); // Initialize custom translation hook
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

  const [formData, setFormData] = useState({
    farmerName: '',
    address: '',
    contactNo: '',
    email: '',
    issueDescription: '',
    photo: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.farmerName || !formData.contactNo || !formData.issueDescription) {
      toast({
        title: t('Help.missingInformation.title'),
        description: t('Help.missingInformation.description'),
        variant: "destructive",
      });
      return;
    }

    // Create a new help request object
    const newRequest = {
      id: uuidv4(),
      farmerName: formData.farmerName,
      address: formData.address,
      contactNo: formData.contactNo,
      email: formData.email,
      issueDescription: formData.issueDescription,
      date: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
      photo: imagePreview,
      status: 'pending' as const
    };

    // Get existing requests from localStorage or initialize empty array
    const existingRequests = JSON.parse(localStorage.getItem('farmerHelpRequests') || '[]');
    
    // Add new request to the array
    const updatedRequests = [newRequest, ...existingRequests];
    
    // Save back to localStorage
    localStorage.setItem('farmerHelpRequests', JSON.stringify(updatedRequests));

    toast({
      title: t('Help.helpRequestSubmitted.title'),
      description: t('Help.helpRequestSubmitted.description'),
    });

    // Reset form
    setFormData({
      farmerName: '',
      address: '',
      contactNo: '',
      email: '',
      issueDescription: '',
      photo: null,
    });
    setImagePreview(null);
    setSelectedDate(new Date());

    // Show success message
    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-neutral-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold mb-2 text-neutral-900">
            {t('Help.title')}
          </h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Farmer Photo Section */}
              <div className="col-span-full mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.photo')}
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {imagePreview ? (
                      <div className="relative w-24 h-24">
                        <img 
                          src={imagePreview} 
                          alt="Farmer preview" 
                          className="w-24 h-24 rounded-full object-cover border-2 border-neutral-200"
                        />
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
                      id="photo"
                      name="photo"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md border border-neutral-200 hover:bg-neutral-200 transition-colors text-sm font-medium flex items-center"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {formData.photo ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    <p className="mt-1 text-xs text-neutral-500">
                      
                    </p>
                  </div>
                </div>
              </div>
              {/* Farmer Name */}
              <div className="col-span-1">
                <label htmlFor="farmerName" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.farmerName')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="farmerName"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              
              {/* Contact Number */}
              <div className="col-span-1">
                <label htmlFor="contactNo" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.contactNo')} <span className="text-red-500">*</span>
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
                  {t('Help.email')}
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
              
              {/* Date Selection */}
              <div className="col-span-1">
                <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.date')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="date"
                    value={selectedDate ? format(selectedDate, 'PPP') : ''}
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg cursor-pointer focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    readOnly
                  />
                  {isCalendarOpen && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Address */}
              <div className="col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.address')}
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
              
              {/* Issue Description */}
              <div className="col-span-2">
                <label htmlFor="issueDescription" className="block text-sm font-medium text-neutral-700 mb-2">
                  {t('Help.issueDescription')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-4 w-4 text-neutral-400" />
                  </div>
                  <textarea
                    id="issueDescription"
                    name="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-3 pl-10 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all duration-200"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                {t('Help.submit')}
              </button>
            </div>
          </form>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              {t('Help.helpRequestSubmitted.title')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { Help };