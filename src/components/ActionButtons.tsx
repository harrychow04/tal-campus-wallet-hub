
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight,
  Wallet
} from 'lucide-react';

interface ActionButtonsProps {
  onSendClick: () => void;
  onReceiveClick: () => void;
  onTransferClick: () => void;
  onRedeemClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSendClick,
  onReceiveClick,
  onTransferClick,
  onRedeemClick
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 my-4">
      <button 
        onClick={onSendClick}
        className="action-button"
      >
        <ArrowUpRight className="h-6 w-6 text-tal-purple mb-1" />
        <span className="text-xs">Send</span>
      </button>
      
      <button 
        onClick={onReceiveClick}
        className="action-button"
      >
        <ArrowDownLeft className="h-6 w-6 text-tal-blue mb-1" />
        <span className="text-xs">Receive</span>
      </button>
      
      <button 
        onClick={onTransferClick}
        className="action-button"
      >
        <ArrowLeftRight className="h-6 w-6 text-tal-purple mb-1" />
        <span className="text-xs">Transfer</span>
      </button>
      
      <button 
        onClick={onRedeemClick}
        className="action-button"
      >
        <Wallet className="h-6 w-6 text-tal-blue mb-1" />
        <span className="text-xs">Redeem</span>
      </button>
    </div>
  );
};

export default ActionButtons;
