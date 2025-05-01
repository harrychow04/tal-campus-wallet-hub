
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: number;
  name: string;
  description: string;
  talCost: number;
  image: string;
}

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedeem: (rewardId: number, cost: number) => void;
  talBalance: number;
}

const RedeemModal: React.FC<RedeemModalProps> = ({ isOpen, onClose, onRedeem, talBalance }) => {
  const { toast } = useToast();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const rewards: Reward[] = [
    {
      id: 1,
      name: "Café Discount",
      description: "15% off at the campus café",
      talCost: 50,
      image: "☕"
    },
    {
      id: 2,
      name: "Bookstore Voucher",
      description: "$5 off your next purchase",
      talCost: 100,
      image: "📚"
    },
    {
      id: 3,
      name: "Gym Day Pass",
      description: "One free day pass for a friend",
      talCost: 75,
      image: "🏋️"
    },
    {
      id: 4,
      name: "Print Credits",
      description: "50 pages of free printing",
      talCost: 30,
      image: "🖨️"
    }
  ];

  const handleRedeem = () => {
    if (!selectedReward) return;
    
    if (talBalance < selectedReward.talCost) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough TAL coins for this reward",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate redemption process
    setTimeout(() => {
      onRedeem(selectedReward.id, selectedReward.talCost);
      setIsLoading(false);
      
      toast({
        title: "Success",
        description: `Redeemed ${selectedReward.name} for ${selectedReward.talCost} TAL`,
      });
      
      onClose();
      setSelectedReward(null);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Redeem TAL Coins</DialogTitle>
          <DialogDescription>
            Your balance: <span className="font-semibold">{talBalance} TAL</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-3 py-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedReward?.id === reward.id 
                  ? 'border-tal-purple bg-tal-purpleLight' 
                  : 'border-tal-gray-light hover:bg-tal-gray-light'
              }`}
              onClick={() => setSelectedReward(reward)}
            >
              <div className="text-3xl mb-2">{reward.image}</div>
              <h3 className="font-semibold">{reward.name}</h3>
              <p className="text-xs text-tal-gray mb-2">{reward.description}</p>
              <p className="text-sm font-medium text-tal-purple">{reward.talCost} TAL</p>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleRedeem}
            disabled={!selectedReward || isLoading || (selectedReward && talBalance < selectedReward.talCost)}
            className="bg-tal-purple hover:bg-tal-purpleDark"
          >
            {isLoading ? 'Processing...' : 'Redeem Selected Reward'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RedeemModal;
