
import React from 'react';

interface TokenBalanceProps {
  symbol: string;
  balance: string;
  usdValue?: string;
  icon: string;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ symbol, balance, usdValue, icon }) => {
  return (
    <div className="token-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: symbol === 'IOTA' ? '#04a1ec30' : '#9b87f530' }}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold">{symbol}</h3>
            <p className="text-xs text-tal-gray">{usdValue && `≈ ${usdValue}`}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">{balance}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
