import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Eye, FileText, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const { content } = useData();

  const stats = [
    { name: 'Total Page Views', value: '12,450', icon: Eye, change: '+12%', changeType: 'positive' },
    { name: 'Blog Posts', value: content.blog.length.toString(), icon: FileText, change: '+2', changeType: 'positive' },
    { name: 'Contact Submissions', value: '48', icon: MessageSquare, change: '+5%', changeType: 'positive' },
    { name: 'Unique Visitors', value: '8,210', icon: Users, change: '+18%', changeType: 'positive' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className={`font-medium ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                  <span className="text-gray-500 ml-2">from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Contact Submissions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-gray-900">John Doe {i}</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600">Project Proposal: Environmental Impact Assessment for new development...</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
              <FileText className="h-6 w-6 text-blue-500 mb-2" />
              <span className="block font-medium text-gray-900">New Blog Post</span>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors">
              <MessageSquare className="h-6 w-6 text-blue-500 mb-2" />
              <span className="block font-medium text-gray-900">View Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
