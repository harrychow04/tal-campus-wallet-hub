
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (recipient: string, amount: string) => void;
  tokenType: 'IOTA' | 'TAL';
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, onSend, tokenType }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.trim()) {
      toast({
        title: "Error",
        description: "Please enter a recipient address or ID",
        variant: "destructive"
      });
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      onSend(recipient, amount);
      setIsLoading(false);
      setRecipient('');
      setAmount('');
      
      toast({
        title: "Success",
        description: `Sent ${amount} ${tokenType} to ${recipient}`,
      });
      
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send {tokenType}</DialogTitle>
          <DialogDescription>
            Enter the recipient and amount to send.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient {tokenType === 'TAL' ? 'ID' : 'Address'}</Label>
            <Input
              id="recipient"
              placeholder={tokenType === 'TAL' ? "Enter recipient ID" : "Enter wallet address"}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="pr-12"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-sm text-tal-gray">{tokenType}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-tal-purple hover:bg-tal-purpleDark"
            >
              {isLoading ? 'Processing...' : `Send ${tokenType}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendModal;
