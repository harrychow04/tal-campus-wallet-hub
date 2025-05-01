
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Asset {
  id: number;
  name: string;
  description: string;
  type: 'token' | 'nft' | 'voucher';
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

const AssetsTab = () => {
  const assets: Asset[] = [
    {
      id: 1,
      name: "Spring Concert Ticket",
      description: "Valid for entry on May 15, 2025",
      type: "nft",
      badge: { text: "May 15", variant: "default" }
    },
    {
      id: 2,
      name: "Café Voucher",
      description: "15% discount at Campus Café",
      type: "voucher",
      badge: { text: "15% OFF", variant: "secondary" }
    },
    {
      id: 3,
      name: "Library Late Fee Waiver",
      description: "One-time waiver for late returns",
      type: "voucher",
      badge: { text: "One use", variant: "outline" }
    },
    {
      id: 4,
      name: "Campus Store NFT",
      description: "Exclusive merchandise access",
      type: "nft",
      badge: { text: "Limited", variant: "destructive" }
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Your Assets</h2>
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white p-3 rounded-lg border border-tal-gray-light shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{asset.name}</h3>
                <p className="text-sm text-tal-gray">{asset.description}</p>
              </div>
              {asset.badge && (
                <Badge variant={asset.badge.variant}>{asset.badge.text}</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsTab;
