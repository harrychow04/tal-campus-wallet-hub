
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface Credential {
  id: number;
  name: string;
  issuer: string;
  expiry?: string;
  status: 'active' | 'expired' | 'pending';
}

const CredentialsTab = () => {
  const credentials: Credential[] = [
    {
      id: 1,
      name: "Student ID",
      issuer: "TAL University",
      expiry: "May 30, 2026",
      status: 'active'
    },
    {
      id: 2,
      name: "Dorm Access",
      issuer: "Campus Housing",
      expiry: "Dec 20, 2025",
      status: 'active'
    },
    {
      id: 3,
      name: "Lab Access",
      issuer: "Science Department",
      expiry: "Jun 15, 2025",
      status: 'active'
    },
    {
      id: 4,
      name: "Alumni Association",
      issuer: "Alumni Office",
      status: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Your Credentials</h2>
      <div className="space-y-3">
        {credentials.map((credential) => (
          <div key={credential.id} className="bg-white p-3 rounded-lg border border-tal-gray-light shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{credential.name}</h3>
                <p className="text-sm text-tal-gray">Issued by {credential.issuer}</p>
                {credential.expiry && (
                  <p className="text-xs text-tal-gray">Expires: {credential.expiry}</p>
                )}
              </div>
              {getStatusBadge(credential.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CredentialsTab;
