
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

const ReceiveModal: React.FC<ReceiveModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const { toast } = useToast();
  const addressRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        toast({
          title: "Address Copied",
          description: "Wallet address copied to clipboard",
        });
      })
      .catch((error) => {
        toast({
          title: "Copy Failed",
          description: "Could not copy address",
          variant: "destructive",
        });
        console.error('Failed to copy: ', error);
      });
  };

  const shareAddress = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My IOTA Wallet Address',
          text: `Here's my IOTA wallet address: ${walletAddress}`,
        });
        toast({
          title: "Sharing",
          description: "Opening share dialog",
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard();
    }
  };

  // Generate QR code SVG (simplified version for demo)
  const qrCode = (
    <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
      <svg 
        viewBox="0 0 29 29" 
        className="w-full h-full"
        stroke="currentColor"
      >
        <path d="M4 4h7v7h-7z" fill="black" />
        <rect x="6" y="6" width="3" height="3" fill="white" />
        <path d="M18 4h7v7h-7z" fill="black" />
        <rect x="20" y="6" width="3" height="3" fill="white" />
        <path d="M4 18h7v7h-7z" fill="black" />
        <rect x="6" y="20" width="3" height="3" fill="white" />
        <path d="M13 4h3v3h-3z" fill="black" />
        <path d="M13 9h3v3h-3z" fill="black" />
        <path d="M13 18h3v3h-3z" fill="black" />
        <path d="M18 13h3v3h-3z" fill="black" />
        <path d="M18 18h3v3h-3z" fill="black" />
        <path d="M18 22h3v3h-3z" fill="black" />
        <path d="M22 13h3v8h-3z" fill="black" />
      </svg>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Receive IOTA</DialogTitle>
          <DialogDescription>
            Share your address to receive IOTA tokens.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          {qrCode}
          
          <div 
            ref={addressRef}
            className="mt-4 p-3 bg-tal-gray-light rounded-lg text-xs font-mono text-center break-all"
          >
            {walletAddress}
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={copyToClipboard}
            className="w-full sm:w-auto bg-tal-blue hover:bg-blue-600"
          >
            Copy Address
          </Button>
          <Button 
            onClick={shareAddress}
            className="w-full sm:w-auto bg-tal-purple hover:bg-tal-purpleDark"
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveModal;
