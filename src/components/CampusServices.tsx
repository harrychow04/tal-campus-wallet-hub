
import React from 'react';
import { Building, Wallet, Ticket, Calendar } from 'lucide-react';

const CampusServices = () => {
  const services = [
    { id: 1, name: 'Building Access', icon: <Building className="h-6 w-6" /> },
    { id: 2, name: 'Payments', icon: <Wallet className="h-6 w-6" /> },
    { id: 3, name: 'Event Tickets', icon: <Ticket className="h-6 w-6" /> },
    { id: 4, name: 'Calendar', icon: <Calendar className="h-6 w-6" /> },
  ];

  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold mb-3">Campus Services</h2>
      <div className="grid grid-cols-4 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            className="action-button"
          >
            <div className="text-tal-purple">{service.icon}</div>
            <span className="text-xs mt-1">{service.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CampusServices;
