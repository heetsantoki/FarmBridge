import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { MapPin, Phone, Mail, Calendar, ShoppingBag, CreditCard } from 'lucide-react';
import {LanguageSelector} from '../../components/LanguageSelector';

// Interface for buyer data
interface Buyer {
  id: string;
  name: string;
  photo: string;
  address: string;
  contact: string;
  email: string;
  productsBought: {
    name: string;
    quantity: string;
    price: number;
    date: string;
  }[];
  totalPurchase: number;
  joiningDate: string;
}

const Buyers = () => {
  const { t } = useTranslation();
  
  // Sample buyers data - in a real app this would come from an API
  const [buyers] = useState<Buyer[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      address: '123 Main Street, Mumbai, Maharashtra',
      contact: '+91 98765 43210',
      email: 'rahul.sharma@example.com',
      productsBought: [
        {
          name: 'Organic Tomatoes',
          quantity: '50 kg',
          price: 2000,
          date: '2023-11-15'
        },
        {
          name: 'Fresh Apples',
          quantity: '20 kg',
          price: 1800,
          date: '2023-12-05'
        }
      ],
      totalPurchase: 3800,
      joiningDate: '2023-10-01'
    },
    {
      id: '2',
      name: 'Priya Patel',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      address: '456 Park Avenue, Ahmedabad, Gujarat',
      contact: '+91 87654 32109',
      email: 'priya.patel@example.com',
      productsBought: [
        {
          name: 'Premium Rice',
          quantity: '100 kg',
          price: 5000,
          date: '2023-11-20'
        }
      ],
      totalPurchase: 5000,
      joiningDate: '2023-09-15'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      address: '789 Garden Road, Delhi',
      contact: '+91 76543 21098',
      email: 'amit.kumar@example.com',
      productsBought: [
        {
          name: 'Fresh Apples',
          quantity: '30 kg',
          price: 3000,
          date: '2023-12-10'
        },
        {
          name: 'Organic Vegetables',
          quantity: '25 kg',
          price: 2200,
          date: '2023-12-18'
        }
      ],
      totalPurchase: 5200,
      joiningDate: '2023-08-20'
    },
    {
      id: '4',
      name: 'Bharat Patel',
      photo: 'https://randomuser.me/api/portraits/men/4.jpg',
      address: '234 Farm View, Surat, Gujarat',
      contact: '+91 65432 10987',
      email: 'bharat.patel@example.com',
      productsBought: [
        {
          name: 'Garlic',
          quantity: '30 kg',
          price: 2000,
          date: '2023-12-12'
        }
      ],
      totalPurchase: 2000,
      joiningDate: '2023-07-10'
    },
    {
      id: '5',
      name: 'Nitin Sharma',
      photo: 'https://randomuser.me/api/portraits/men/5.jpg',
      address: '567 Fruit Market, Pune, Maharashtra',
      contact: '+91 54321 09876',
      email: 'nitin.sharma@example.com',
      productsBought: [
        {
          name: 'Organic Mangoes',
          quantity: '20 kg',
          price: 1500,
          date: '2023-11-25'
        },
        {
          name: 'Premium Rice',
          quantity: '50 kg',
          price: 2500,
          date: '2023-12-15'
        }
      ],
      totalPurchase: 4000,
      joiningDate: '2023-06-01'
    }
  ]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold mt-12 mx-auto">Buyers Dashboard</h1>
        
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Buyer Details</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Contact Information</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Products Purchased</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Total Purchase</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Joining Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {buyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-gray-50 transition-all duration-300">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">
                        <img
                          src={buyer.photo}
                          alt={buyer.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{buyer.name}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin size={12} className="mr-1" /> {buyer.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700 flex items-center mb-1">
                      <Phone size={14} className="mr-2 text-gray-500" />
                      {buyer.contact}
                    </div>
                    <div className="text-sm text-gray-700 flex items-center">
                      <Mail size={14} className="mr-2 text-gray-500" />
                      {buyer.email}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      {buyer.productsBought.map((product, index) => (
                        <div key={index} className="text-sm text-gray-700 border-l-2 border-blue-500 pl-2">
                          <div className="font-medium">{product.name}</div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{product.quantity}</span>
                            <span>₹{product.price}</span>
                            <span>{formatDate(product.date)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <CreditCard size={16} className="mr-2 text-green-600" />
                      ₹{buyer.totalPurchase}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-700 flex items-center">
                      <Calendar size={16} className="mr-2 text-blue-600" />
                      {formatDate(buyer.joiningDate)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Buyers;