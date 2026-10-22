import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Mail, Phone, MapPin, Calendar, Package, ArrowRight, ArrowLeft, Pencil, X, Check, Upload } from "lucide-react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useTranslation } from "../../hooks/useTranslation";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";

// Enhanced buyer data with profile image and more orders
const buyerData = {
  personalInfo: {
    profileImage: "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
    totalPurchases: 5,
  },
  purchaseHistory: [
    {
      id: "ORD001",
      product: "organicTomatoes",
      quantity: "10 kg",
      date: "2024-03-15",
      amount: 1500,
      status: "delivered",
    },
    {
      id: "ORD002",
      product: "freshPotatoes",
      quantity: "15 kg",
      date: "2024-03-10",
      amount: 900,
      status: "inTransit",
    },
    {
      id: "ORD003",
      product: "greenPeas",
      quantity: "5 kg",
      date: "2024-03-05",
      amount: 750,
      status: "delivered",
    },
    {
      id: "ORD004",
      product: "carrots",
      quantity: "8 kg",
      date: "2024-03-01",
      amount: 600,
      status: "delivered",
    },
    {
      id: "ORD005",
      product: "onions",
      quantity: "12 kg",
      date: "2024-02-28",
      amount: 480,
      status: "delivered",
    },
  ],
  favorites: [
    "organicTomatoes",
    "freshPotatoes",
    "greenPeas",
    "carrots",
    "onions",
  ],
};

const BuyerProfile = () => {
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Add state for editing and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: 'franswinata6@gmail.com',
    phone: '081-234-5678',
    address: '1234 Tech Park Avenue, San Francisco, CA',
    profileImage: buyerData.personalInfo.profileImage
  });

  // Add state for handling file upload
  const [imagePreview, setImagePreview] = useState(buyerData.personalInfo.profileImage);

  // Calculate total amount
  const totalAmount = buyerData.purchaseHistory.reduce((sum, order) => sum + order.amount, 0);

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = buyerData.purchaseHistory.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(buyerData.purchaseHistory.length / ordersPerPage);

  // Function to handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle save
  const handleSave = () => {
    // In a real application, you would save this data to a backend
    // Here we're just showing a success message and updating the UI
    buyerData.personalInfo.profileImage = formData.profileImage;
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  // Function to handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      email: 'franswinata6@gmail.com',
      phone: '081-234-5678',
      address: '1234 Tech Park Avenue, San Francisco, CA',
      profileImage: buyerData.personalInfo.profileImage
    });
    setImagePreview(buyerData.personalInfo.profileImage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 animate-fadeIn">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section with enhanced styling */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-2 mt-16">{t('profile.title')}</h1>
          <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <Calendar className="h-4 w-4" />
            {t('profile.memberSince')}: January 2023
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Personal Information Card with Avatar */}
          <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src={isEditing ? imagePreview : buyerData.personalInfo.profileImage} alt={t('profile.personalInfo.buyer.name')} />
                  </Avatar>
                  
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <label htmlFor="profile-upload" className="cursor-pointer bg-primary text-white rounded-full p-1 shadow-md hover:bg-primary/90 transition-colors">
                        <Upload size={16} />
                        <input 
                          id="profile-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="ms-12">{t('profile.personalInfo.buyer.name')}</CardTitle>
                  <CardDescription className='ms-8'>{t('profile.personalInfo.title')}</CardDescription>
                </div>
              </div>
              
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1"
                >
                  <Pencil className="h-3 w-3" />
                  {t('profile1.editProfile')}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCancel}
                    className="flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                    {t('profile.cancel')}
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    {t('profile1.saveProfile')}
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditing ? (
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{formData.address}</span>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                     {t('profile.email')}
                    </label>
                    <Input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="max -w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t('profile.phone')}
                    </label>
                    <Input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="max-w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                     {t('profile.address')}
                    </label>
                    <Textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="max-w-md resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Purchase Statistics Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{t('profile.statistics.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{t('profile.statistics.totalOrders')}</span>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="text-2xl font-semibold">{buyerData.personalInfo.totalPurchases}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-gray-600">{t('profile.statistics.totalAmount')}</span>
                    <span className="text-2xl font-semibold text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-gray-700">{t('profile.statistics.favoriteProducts')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {buyerData.favorites.map((product) => (
                      <Badge 
                        key={product} 
                        variant="secondary"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {t(`profile.statistics.products.${product}`)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase History Table with Pagination */}
          <Card className="md:col-span-3 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{t('profile.purchaseHistory.title')}</CardTitle>
              <CardDescription>{t('profile.purchaseHistory.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('profile.purchaseHistory.orderId')}</TableHead>
                      <TableHead>{t('profile.purchaseHistory.product')}</TableHead>
                      <TableHead>{t('profile.purchaseHistory.quantity')}</TableHead>
                      <TableHead>{t('profile.purchaseHistory.date')}</TableHead>
                      <TableHead>{t('profile.purchaseHistory.amount')}</TableHead>
                      <TableHead>{t('profile.purchaseHistory.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{t(`profile.statistics.products.${order.product}`)}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={order.status === "delivered" ? "default" : "secondary"}
                            className={order.status === "delivered" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                          >
                            {t(`profile.purchaseHistory.statusValues.${order.status}`)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="flex items-center justify-end space-x- 2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('profile.purchaseHistory.pagination.previous')}
                  </Button>
                  <span className="text-sm text-gray-600">
                    {t('profile.purchaseHistory.pagination.page')} {currentPage} {t('profile.purchaseHistory.pagination.of')} {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-gray-100"
                  >
                    {t('profile.purchaseHistory.pagination.next')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export {BuyerProfile};