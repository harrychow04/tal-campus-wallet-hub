
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings } from 'lucide-react';

const WalletHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8 bg-tal-navy text-white">
          <AvatarImage src="/profile.png" alt="User profile" />
          <AvatarFallback className="text-sm font-medium">JS</AvatarFallback>
        </Avatar>
        <span className="font-semibold">John Smith</span>
      </div>
      <button className="h-8 w-8 rounded-full bg-tal-gray-light flex items-center justify-center hover:bg-tal-gray-light/80 transition-colors">
        <span className="sr-only">Settings</span>
        <Settings className="h-5 w-5 text-tal-gray-dark" />
      </button>
    </header>
  );
};

export default WalletHeader;
