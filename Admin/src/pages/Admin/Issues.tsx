import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from "../../hooks/use-toast";
import { HelpRequestCard } from '../../components/HelpRequestCard';
import { TabGroup } from '../../components/TabGroup';
import axios from 'axios';
import { RefreshCw, Loader2 } from 'lucide-react';

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
  date?: string;
}

export const Issues = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('farmers');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all');
  const [loading, setLoading] = useState<boolean>(true);
  
  // Real database states (no hardcoded fake data)
  const [farmerHelpRequests, setFarmerHelpRequests] = useState<FarmerHelpRequest[]>([]);
  const [buyerHelpRequests, setBuyerHelpRequests] = useState<BuyerHelpRequest[]>([]);

  // Fetch real issues from MongoDB backend
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/issues');
      const issues = res.data || [];

      const farmers: FarmerHelpRequest[] = issues
        .filter((item: any) => item.userType === 'farmer')
        .map((item: any) => ({
          id: item.id || item._id,
          farmerName: item.name || item.farmerName || 'Farmer',
          address: item.address || '',
          contactNo: item.contactNo || '',
          email: item.email || '',
          issueDescription: item.issueDescription || '',
          date: item.date || item.createdAt || new Date().toISOString(),
          photo: item.photo || null,
          status: item.status || 'pending',
        }));

      const buyers: BuyerHelpRequest[] = issues
        .filter((item: any) => item.userType === 'buyer')
        .map((item: any) => ({
          id: item.id || item._id,
          buyerName: item.name || item.buyerName || 'Buyer',
          address: item.address || '',
          contactNo: item.contactNo || '',
          email: item.email || '',
          productIssue: item.issueDescription || item.productIssue || '',
          photo: item.photo || null,
          status: item.status || 'pending',
          date: item.date || item.createdAt || new Date().toISOString(),
        }));

      setFarmerHelpRequests(farmers);
      setBuyerHelpRequests(buyers);
    } catch (error) {
      console.error('Error fetching issues from backend:', error);
      toast({
        title: 'Error loading issues',
        description: 'Could not fetch help requests from the server.',
        variant: 'destructive',
      });
      setFarmerHelpRequests([]);
      setBuyerHelpRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear out any old fake data cached in localStorage
    localStorage.removeItem('farmerHelpRequests');
    localStorage.removeItem('buyerHelpRequests');
    fetchIssues();
  }, []);

  // Function to mark farmer help request as resolved
  const resolveFarmerIssue = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/issues/${id}`, { status: 'resolved' });
      setFarmerHelpRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'resolved' as const } : request
        )
      );
      toast({
        title: 'Issue Resolved',
        description: "The farmer's issue has been marked as resolved.",
        variant: 'default',
      });
    } catch (error) {
      console.error('Error resolving farmer issue:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update issue status on server.',
        variant: 'destructive',
      });
    }
  };

  // Function to mark buyer help request as resolved
  const resolveBuyerIssue = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/issues/${id}`, { status: 'resolved' });
      setBuyerHelpRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'resolved' as const } : request
        )
      );
      toast({
        title: 'Issue Resolved',
        description: "The buyer's issue has been marked as resolved.",
        variant: 'default',
      });
    } catch (error) {
      console.error('Error resolving buyer issue:', error);
      toast({
        title: 'Update failed',
        description: 'Failed to update issue status on server.',
        variant: 'destructive',
      });
    }
  };

  // Function to delete a resolved farmer issue
  const deleteFarmerIssue = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/issues/${id}`);
      setFarmerHelpRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      toast({
        title: 'Issue Deleted',
        description: "The farmer's issue has been deleted.",
        variant: 'default',
      });
    } catch (error) {
      console.error('Error deleting farmer issue:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete issue from server.',
        variant: 'destructive',
      });
    }
  };

  // Function to delete a resolved buyer issue
  const deleteBuyerIssue = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/issues/${id}`);
      setBuyerHelpRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      toast({
        title: 'Issue Deleted',
        description: "The buyer's issue has been deleted.",
        variant: 'default',
      });
    } catch (error) {
      console.error('Error deleting buyer issue:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete issue from server.',
        variant: 'destructive',
      });
    }
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
          className="text-center mb-16 relative"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-border rounded-full text-xs font-medium text-muted-foreground">
              Support Center
            </div>
            <button
              onClick={fetchIssues}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-50"
              title="Refresh requests"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">
            Help Request Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real-time inquiries and dispute requests submitted by registered farmers and buyers
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center mb-10 space-y-6">
          <TabGroup 
            tabs={[
              { key: 'farmers', label: `Farmers (${farmerHelpRequests.length})` },
              { key: 'buyers', label: `Buyers (${buyerHelpRequests.length})` }
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
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Loading help requests...</p>
          </div>
        ) : (
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
                        No farmer help requests found with {filterStatus === 'all' ? 'any' : filterStatus} status.
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
                        No buyer help requests found with {filterStatus === 'all' ? 'any' : filterStatus} status.
                      </p>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Issues;
