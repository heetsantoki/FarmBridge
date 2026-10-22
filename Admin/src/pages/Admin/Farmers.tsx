import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  List, 
  Calendar 
} from 'lucide-react';

// Define interface for farmer data
interface Product {
  id: string;
  name: string;
  price: number;
  quantitySold: string;
}

interface Farmer {
  id: string;
  name: string;
  photo: string;
  address: string;
  contact: string;
  email: string;
  products: Product[];
  joiningDate: string;
}

const Farmers = () => {
  const { t } = useTranslation();

  // Sample farmer data - in a real application, this would come from an API
  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Ankit Singh',
      photo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&auto=format&fit=crop',
      address: 'Village Sundarpur, District Varanasi, Uttar Pradesh',
      contact: '+91 9876543210',
      email: 'ankit.singh@farmconnect.com',
      products: [
        { id: 'p1', name: 'Organic Tomatoes', price: 40, quantitySold: '500 kg' },
        { id: 'p2', name: 'Premium Rice', price: 50, quantitySold: '200 kg' },
        { id: 'p3', name: 'Fresh Apples', price: 100, quantitySold: '150 kg' }
      ],
      joiningDate: '15 Jan 2023',
    },
    {
      id: '2',
      name: 'Prabhu Bhai',
      photo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop',
      address: 'Near Sabarmati River, Ahmedabad, Gujarat',
      contact: '+91 8765432109',
      email: 'prabhu.bhai@farmconnect.com',
      products: [
        { id: 'p4', name: 'Garlic', price: 200, quantitySold: '100 kg' }
      ],
      joiningDate: '23 Mar 2023',
    },
    {
      id: '3',
      name: 'Mukesh Bhai',
      photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop',
      address: 'Junagadh District, Gujarat',
      contact: '+91 7654321098',
      email: 'mukesh.bhai@farmconnect.com',
      products: [
        { id: 'p5', name: 'Organic Mangoes', price: 75, quantitySold: '300 kg' }
      ],
      joiningDate: '12 Apr 2023',
    }
  ];

  // Calculate total earnings for each farmer in rupees
  const calculateTotalEarnings = (products: Product[]): number => {
    return products.reduce((total, product) => {
      const quantity = parseInt(product.quantitySold.split(' ')[0]);
      return total + (product.price * quantity);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center mt-14">Farmer Information</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 sm:flex sm:items-center sm:justify-between border-b">
              <div className="sm:flex sm:items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={farmer.photo} 
                      alt={farmer.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{farmer.name}</h2>
                  <div className="mt-2 flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{farmer.address}</span>
                  </div>
                  <div className="mt-1 flex items-center text-gray-600">
                    <Phone size={16} className="mr-1" />
                    <span>{farmer.contact}</span>
                  </div>
                  <div className="mt-1 flex items-center text-gray-600">
                    <Mail size={16} className="mr-1" />
                    <span>{farmer.email}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <div className="flex items-center justify-end text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>Joined: {farmer.joiningDate}</span>
                </div>
                <div className="mt-2 flex items-center justify-end text-gray-800 font-bold">
                  <span className="text-xl text-green-600">
                    ₹{calculateTotalEarnings(farmer.products).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <List size={18} className="mr-2" />
                Products Sold
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price (₹/kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity Sold
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {farmer.products.map((product) => {
                      const quantity = parseInt(product.quantitySold.split(' ')[0]);
                      const total = product.price * quantity;
                      
                      return (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.quantitySold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            ₹{total.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Farmers };