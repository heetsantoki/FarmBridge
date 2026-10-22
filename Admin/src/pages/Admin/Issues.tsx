import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from "../../hooks/use-toast";
import { HelpRequestCard } from '../../components/HelpRequestCard';
import { TabGroup } from '../../components/TabGroup';

// Define the farmer help request type
interface FarmerHelpRequest {
  id: string;
  farmerName: string;
  address: string;
  contactNo: string;
  email: string;
  issueDescription: string;
  date: string;
  photo: string | null;
  status: 'pending' | 'resolved';
}

// Define the buyer help request type
interface BuyerHelpRequest {
  id: string;
  buyerName: string;
  address: string;
  contactNo: string;
  email: string;
  productIssue: string;
  photo: string | null;
  status: 'pending' | 'resolved';
}

export const Issues = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('farmers');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');
  
  // States for both types of help requests
  const [farmerHelpRequests, setFarmerHelpRequests] = useState<FarmerHelpRequest[]>([]);
  const [buyerHelpRequests, setBuyerHelpRequests] = useState<BuyerHelpRequest[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      // Get farmer help requests from localStorage
      const storedFarmerRequests = localStorage.getItem('farmerHelpRequests');
      if (storedFarmerRequests) {
        const parsedRequests = JSON.parse(storedFarmerRequests);
        setFarmerHelpRequests(parsedRequests);
      } else {
        // Default data if no localStorage data exists
        setFarmerHelpRequests([
          {
            id: '1',
            farmerName: 'Ankit Singh',
            address: 'Village Gharoli, Delhi',
            contactNo: '+91 98765 43210',
            email: 'ankit.singh@example.com',
            issueDescription: 'Issues with irrigation system and need technical support.',
            date: new Date('2023-05-15').toISOString(),
            photo: null,
            status: 'pending'
          },
          {
            id: '2',
            farmerName: 'Rajesh Kumar',
            address: 'Sector 12, Noida',
            contactNo: '+91 87654 32109',
            email: 'rajesh.kumar@example.com',
            issueDescription: 'Need guidance on organic certification process.',
            date: new Date('2023-06-02').toISOString(),
            photo: null,
            status: 'pending'
          },
          {
            id: '3',
            farmerName: 'Suresh Patel',
            address: 'Ahmedabad, Gujarat',
            contactNo: '+91 76543 21098',
            email: 'suresh.patel@example.com',
            issueDescription: 'Pest infestation in wheat crop, requires immediate assistance.',
            date: new Date('2023-06-10').toISOString(),
            photo: null,
            status: 'resolved'
          }
        ]);
      }
      
      // Get buyer help requests from localStorage
      const storedBuyerRequests = localStorage.getItem('buyerHelpRequests');
      if (storedBuyerRequests) {
        const parsedRequests = JSON.parse(storedBuyerRequests);
        setBuyerHelpRequests(parsedRequests);
      } else {
        // Default data if no localStorage data exists
        setBuyerHelpRequests([
          {
            id: '1',
            buyerName: 'Priya Patel',
            address: 'Viman Nagar, Pune',
            contactNo: '+91 89012 34567',
            email: 'priya.palet@example.com',
            productIssue: 'Received damaged products in the recent order.',
            photo: null,
            status: 'pending'
          },
          {
            id: '2',
            buyerName: 'Rahul Sharma',
            address: 'Malviya Nagar, Jaipur',
            contactNo: '+91 78901 23456',
            email: 'rahul.sharma@example.com',
            productIssue: 'Quality of rice was not as described on the platform.',
            photo: null,
            status: 'resolved'
          },
          {
            id: '3',
            buyerName: 'Amit Kumar',
            address: 'Indiranagar, Bangalore',
            contactNo: '+91 67890 12345',
            email: 'amit.kumar@example.com',
            productIssue: 'Order delayed by more than a week.',
            photo: null,
            status: 'pending'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading help requests from localStorage:', error);
    }
  }, []);

  // Function to mark farmer help request as resolved
  const resolveFarmerIssue = (id: string) => {
    setFarmerHelpRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => {
        if (request.id === id) {
          return { ...request, status: 'resolved' as const };
        }
        return request;
      });
      
      localStorage.setItem('farmerHelpRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
    
    toast({
      title: 'Issue Resolved',
      description: 'The farmer\'s issue has been marked as resolved.',
      variant: 'default',
    });
  };

  // Function to mark buyer help request as resolved
  const resolveBuyerIssue = (id: string) => {
    setBuyerHelpRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => {
        if (request.id === id) {
          return { ...request, status: 'resolved' as const };
        }
        return request;
      });
      
      localStorage.setItem('buyerHelpRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
    
    toast({
      title: 'Issue Resolved',
      description: 'The buyer\'s issue has been marked as resolved.',
      variant: 'default',
    });
  };

  // Function to delete a resolved farmer issue
  const deleteFarmerIssue = (id: string) => {
    setFarmerHelpRequests(prevRequests => {
      const updatedRequests = prevRequests.filter(request => request.id !== id);
      localStorage.setItem('farmerHelpRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
    
    toast({
      title: 'Issue Deleted',
      description: 'The farmer\'s issue has been deleted.',
      variant: 'default',
    });
  };

  // Function to delete a resolved buyer issue
  const deleteBuyerIssue = (id: string) => {
    setBuyerHelpRequests(prevRequests => {
      const updatedRequests = prevRequests.filter(request => request.id !== id);
      localStorage.setItem('buyerHelpRequests', JSON.stringify(updatedRequests));
      return updatedRequests;
    });
    
    toast({
      title: 'Issue Deleted',
      description: 'The buyer\'s issue has been deleted.',
      variant: 'default',
    });
  };

  // Filter requests based on status
  const filteredFarmerRequests = farmerHelpRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  const filteredBuyerRequests = buyerHelpRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-20 pt-20">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-20 blur-3xl" aria-hidden="true">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-r from-gray-200 to-gray-300 opacity-30"
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center mt-1 justify-center px-4 py-1.5 mb-3 border border-border rounded-full text-xs font-medium text-muted-foreground"
          >
            Support Center
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            Help Request Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Efficiently manage and respond to farmer and buyer support inquiries
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center mb-10 space-y-6">
          <TabGroup 
            tabs={[
              { key: 'farmers', label: 'Farmers' },
              { key: 'buyers', label: 'Buyers' }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === 'pending' 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterStatus === 'resolved' 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + filterStatus}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeTab === 'farmers' ? (
              <>
                {filteredFarmerRequests.length > 0 ? (
                  filteredFarmerRequests.map((request) => (
                    <HelpRequestCard
                      key={request.id}
                      id={request.id}
                      name={request.farmerName}
                      address={request.address}
                      contactNo={request.contactNo}
                      email={request.email}
                      description={request.issueDescription}
                      date={request.date}
                      photo={request.photo}
                      status={request.status}
                      onResolve={resolveFarmerIssue}
                      onDelete={request.status === 'resolved' ? deleteFarmerIssue : undefined}
                    />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-xl p-10 text-center"
                  >
                    <p className="text-muted-foreground">
                      No farmer help requests found with {filterStatus === 'all' ? 'any' : filterStatus} status
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {filteredBuyerRequests.length > 0 ? (
                  filteredBuyerRequests.map((request) => (
                    <HelpRequestCard
                      key={request.id}
                      id={request.id}
                      name={request.buyerName}
                      address={request.address}
                      contactNo={request.contactNo}
                      email={request.email}
                      description={request.productIssue}
                      photo={request.photo}
                      status={request.status}
                      onResolve={resolveBuyerIssue}
                      onDelete={request.status === 'resolved' ? deleteBuyerIssue : undefined}
                    />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-xl p-10 text-center"
                  >
                    <p className="text-muted-foreground">
                      No buyer help requests found with {filterStatus === 'all' ? 'any' : filterStatus} status
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};