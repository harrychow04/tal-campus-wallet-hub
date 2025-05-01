
import React, { useState, useEffect } from 'react';
import WalletHeader from '@/components/WalletHeader';
import TokenBalance from '@/components/TokenBalance';
import ActionButtons from '@/components/ActionButtons';
import CampusServices from '@/components/CampusServices';
import AssetsTab from '@/components/AssetsTab';
import CredentialsTab from '@/components/CredentialsTab';
import ActivityTab from '@/components/ActivityTab';
import SendModal from '@/components/SendModal';
import ReceiveModal from '@/components/ReceiveModal';
import RedeemModal from '@/components/RedeemModal';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'assets' | 'credentials' | 'activity'>('assets');
  
  // Wallet state
  const [iotaBalance, setIotaBalance] = useState(42.8);
  const [talBalance, setTalBalance] = useState(215);
  const [iotaUsdValue, setIotaUsdValue] = useState(12.84);
  
  // Modal states
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  
  // Selected token for modals
  const [selectedToken, setSelectedToken] = useState<'IOTA' | 'TAL'>('IOTA');
  
  // Mock wallet address
  const walletAddress = 'iota1qpw44d7lzd8n4jxe0xhcyshd9dqcznh8ceq6mfkyc4vsjvczh6rtqqfkdep';
  
  // Handlers for token actions
  const handleSend = (recipient: string, amount: string) => {
    const numAmount = parseFloat(amount);
    
    if (selectedToken === 'IOTA') {
      setIotaBalance(prev => {
        const newBalance = Math.max(0, prev - numAmount);
        return parseFloat(newBalance.toFixed(2));
      });
    } else {
      setTalBalance(prev => {
        const newBalance = Math.max(0, prev - numAmount);
        return Math.floor(newBalance);
      });
    }
  };
  
  const handleTransfer = (recipient: string, amount: string) => {
    const numAmount = parseFloat(amount);
    setTalBalance(prev => {
      const newBalance = Math.max(0, prev - numAmount);
      return Math.floor(newBalance);
    });
  };
  
  const handleRedeem = (rewardId: number, cost: number) => {
    setTalBalance(prev => {
      const newBalance = Math.max(0, prev - cost);
      return newBalance;
    });
  };
  
  // Handle modal openings
  const handleSendClick = () => {
    setSelectedToken('IOTA');
    setSendModalOpen(true);
  };
  
  const handleReceiveClick = () => {
    setReceiveModalOpen(true);
  };
  
  const handleTransferClick = () => {
    setSelectedToken('TAL');
    setTransferModalOpen(true);
  };
  
  const handleRedeemClick = () => {
    setRedeemModalOpen(true);
  };
  
  // Simulated balance update
  useEffect(() => {
    // Simulate slight IOTA price fluctuation
    const interval = setInterval(() => {
      // Random small change to IOTA USD value (±2%)
      const change = iotaUsdValue * (Math.random() * 0.04 - 0.02);
      const newUsdValue = Math.max(11, Math.min(14, iotaUsdValue + change));
      setIotaUsdValue(parseFloat(newUsdValue.toFixed(2)));
    }, 30000);
    
    return () => clearInterval(interval);
  }, [iotaUsdValue]);
  
  // Tab content mapping
  const tabContent = {
    assets: <AssetsTab />,
    credentials: <CredentialsTab />,
    activity: <ActivityTab />
  };

  return (
    <div className="wallet-container">
      <WalletHeader />
      
      <div className="p-4 flex-1 overflow-y-auto">
        <TokenBalance 
          symbol="IOTA" 
          balance={`${iotaBalance.toFixed(1)} Mi`}
          usdValue={`$${iotaUsdValue} USD`}
          icon="🔷"
        />
        
        <TokenBalance 
          symbol="TAL" 
          balance={`${talBalance} TAL`}
          icon="🟣"
        />
        
        <ActionButtons 
          onSendClick={handleSendClick}
          onReceiveClick={handleReceiveClick}
          onTransferClick={handleTransferClick}
          onRedeemClick={handleRedeemClick}
        />
        
        <CampusServices />
      </div>
      
      <div className="mt-auto">
        {/* Tab Bar */}
        <div className="border-t flex">
          <button 
            className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            Assets
          </button>
          <button 
            className={`tab-button ${activeTab === 'credentials' ? 'active' : ''}`}
            onClick={() => setActiveTab('credentials')}
          >
            Credentials
          </button>
          <button 
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-tal-gray-light flex-1 overflow-y-auto">
          {tabContent[activeTab]}
        </div>
      </div>
      
      {/* Modals */}
      <SendModal 
        isOpen={sendModalOpen} 
        onClose={() => setSendModalOpen(false)}
        onSend={handleSend}
        tokenType={selectedToken}
      />
      
      <SendModal 
        isOpen={transferModalOpen} 
        onClose={() => setTransferModalOpen(false)}
        onSend={handleTransfer}
        tokenType="TAL"
      />
      
      <ReceiveModal 
        isOpen={receiveModalOpen} 
        onClose={() => setReceiveModalOpen(false)}
        walletAddress={walletAddress}
      />
      
      <RedeemModal 
        isOpen={redeemModalOpen} 
        onClose={() => setRedeemModalOpen(false)}
        onRedeem={handleRedeem}
        talBalance={talBalance}
      />
    </div>
  );
};

export default Index;
