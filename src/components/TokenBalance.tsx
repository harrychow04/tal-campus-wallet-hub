
import React from 'react';
import { Circle } from 'lucide-react';

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
               style={{ backgroundColor: symbol === 'IOTA' ? '#04a1ec30' : '#2c3e5030' }}>
            {symbol === 'IOTA' ? (
              <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" fill="#04A1EC" fillOpacity="0.1" />
                <path d="M16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23Z" fill="#04A1EC" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Circle className="text-tal-navy" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{symbol}</h3>
            <p className="text-xs text-tal-gray">{usdValue && `≈ ${usdValue}`}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">{balance}</p>
          {symbol === 'TAL' && <p className="text-xs text-tal-gray">≈ $0.18 USD</p>}
        </div>
      </div>
    </div>
  );
};

export default TokenBalance;
