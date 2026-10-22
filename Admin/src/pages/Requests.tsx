import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

// Define interface for request data
interface Request {
  id: string;
  buyerName: string;
  productName: string;
  farmerName: string;
  quantity: string;
  requestedPrice: number;
  productImage: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const Requests = () => {
  // Sample data - would be fetched from backend in real application
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      buyerName: 'Rahul Sharma',
      productName: 'Organic Tomatoes',
      farmerName: 'Ankit Singh',
      quantity: '50 kg',
      requestedPrice: 2000,
      productImage: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      status: 'pending',
    },
    {
      id: '2',
      buyerName: 'Priya Patel',
      productName: 'Premium Rice',
      farmerName: 'Ankit Singh',
      quantity: '100 kg',
      requestedPrice: 5000,
      productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
      status: 'pending',
    },
    {
      id: '3',
      buyerName: 'Amit Kumar',
      productName: 'Fresh Apples',
      farmerName: 'Ankit Singh',
      quantity: '30 kg',
      requestedPrice: 3000,
      productImage: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb',
      status: 'pending',
    },
    {
      id: '4',
      buyerName: 'Bharat bhai',
      productName: 'Garlic',
      farmerName: 'Prabhu bhai',
      quantity: '30 kg',
      requestedPrice: 2000,
      productImage: 'https://plus.unsplash.com/premium_photo-1666877049261-ea88f75e7be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdhcmxpY3xlbnwwfHwwfHx8MA%3D%3D',
      status: 'pending',
    },
    {
      id: '4',
      buyerName: 'Nitin bhai',
      productName: 'Organic Mangoes',
      farmerName: 'Mukesh bhai',
      quantity: '20 kg',
      requestedPrice: 1500,
      productImage: 'https://plus.unsplash.com/premium_photo-1666877049261-ea88f75e7be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdhcmxpY3xlbnwwfHwwfHx8MA%3D%3D',
      status: 'pending',
    },
  ]);

  // Function to handle accept request
  const handleAccept = (id: string) => {
    setRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === id 
          ? { ...request, status: 'accepted' } 
          : request
      ).sort((a, b) => {
        // Sort accepted requests to the top
        if (a.status === 'accepted' && b.status !== 'accepted') return -1;
        if (a.status !== 'accepted' && b.status === 'accepted') return 1;
        return 0;
      })
    );
    toast.success('Request accepted successfully!');
  };

  // Function to handle reject request
  const handleReject = (id: string) => {
    setRequests(prevRequests => 
      prevRequests.filter(request => request.id !== id)
    );
    toast.error('Request rejected and removed!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center mt-14">Product Requests</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Product</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Buyer Name</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Quantity</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Requested Price</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((request) => (
                <tr 
                  key={request.id} 
                  className={`transition-all duration-300 ${
                    request.status === 'accepted' ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={request.productImage}
                          alt={request.productName}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.productName}</div>
                        <div className="text-sm text-gray-500">Farmer: {request.farmerName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{request.buyerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{request.quantity}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">₹{request.requestedPrice}</td>
                  <td className="py-4 px-6 text-sm">
                    {request.status === 'accepted' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Accepted
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-right flex gap-3">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="text-green-600 hover:text-green-900 bg-green-100 p-2 rounded-full transition-all duration-200 hover:bg-green-200"
                          title="Accept"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-full transition-all duration-200 hover:bg-red-200"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <span className="text-green-600 font-medium">Accepted</span>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests; 