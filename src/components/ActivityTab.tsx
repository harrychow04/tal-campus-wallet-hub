
import React from 'react';

interface ActivityItem {
  id: number;
  type: 'sent' | 'received' | 'earned' | 'redeemed' | 'access';
  description: string;
  amount?: string;
  currency?: string;
  timestamp: string;
}

const ActivityTab = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'received',
      description: 'Received from Alex',
      amount: '+2.5',
      currency: 'IOTA',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      type: 'access',
      description: 'Building Access - Science Hall',
      timestamp: 'Yesterday'
    },
    {
      id: 3,
      type: 'earned',
      description: 'Earned from Survey',
      amount: '+25',
      currency: 'TAL',
      timestamp: 'Yesterday'
    },
    {
      id: 4,
      type: 'sent',
      description: 'Sent to Maria',
      amount: '-1.2',
      currency: 'IOTA',
      timestamp: '2 days ago'
    },
    {
      id: 5,
      type: 'redeemed',
      description: 'Café Discount Redeemed',
      amount: '-50',
      currency: 'TAL',
      timestamp: '2 days ago'
    },
    {
      id: 6,
      type: 'access',
      description: 'Gym Check-in',
      timestamp: '3 days ago'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return (
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        );
      case 'received':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        );
      case 'earned':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'redeemed':
        return (
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'access':
        return (
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center p-3 bg-white rounded-lg border border-tal-gray-light shadow-sm">
            {getActivityIcon(activity.type)}
            <div className="ml-3 flex-grow">
              <p className="font-medium">{activity.description}</p>
              <p className="text-xs text-tal-gray">{activity.timestamp}</p>
            </div>
            {activity.amount && (
              <div className={`font-semibold ${activity.type === 'sent' || activity.type === 'redeemed' ? 'text-red-500' : 'text-green-500'}`}>
                {activity.amount} {activity.currency}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;
