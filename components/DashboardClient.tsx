'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AuthUser, Campaign } from '@/types';
import { TrendingUp, Users, DollarSign, Eye, MousePointer, Target, Plus, BarChart3, Settings, LogOut } from 'lucide-react';

interface DashboardClientProps {
  user: AuthUser;
  initialCampaigns: Campaign[];
}

export default function DashboardClient({ user, initialCampaigns }: DashboardClientProps) {
  const [campaigns] = useState(initialCampaigns);
  
  // Calculate metrics
  const activeCampaigns = campaigns.filter(c => c.metadata.status === 'active');
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.metadata.spend || 0), 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.metadata.impressions || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.metadata.clicks || 0), 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.metadata.conversions || 0), 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900">Vyuma Ads Manager</h1>
              <div className="flex gap-6">
                <Link href="/dashboard" className="text-primary-600 font-medium">Dashboard</Link>
                <Link href="/campaigns" className="text-gray-600 hover:text-gray-900">Campaigns</Link>
                <Link href="/audience" className="text-gray-600 hover:text-gray-900">Audience</Link>
                <Link href="/reports" className="text-gray-600 hover:text-gray-900">Reports</Link>
                <Link href="/billing" className="text-gray-600 hover:text-gray-900">Billing</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Hello, {user.name}</span>
              <Link href="/settings" className="text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </Link>
              <button className="text-gray-600 hover:text-gray-900">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">Monitor your advertising performance</p>
          </div>
          <Link href="/campaigns/create" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Campaign
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Active Campaigns</span>
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{activeCampaigns.length}</div>
            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Total Spend</span>
              <DollarSign className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalSpend.toLocaleString()}</div>
            <p className="text-sm text-gray-600 mt-1">Budget utilized</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Impressions</span>
              <Eye className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</div>
            <p className="text-sm text-green-600 mt-1">+25% from last week</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">CTR</span>
              <MousePointer className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageCTR.toFixed(2)}%</div>
            <p className="text-sm text-green-600 mt-1">Above average</p>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
            <Link href="/campaigns" className="text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Campaign Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Budget</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Impressions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Clicks</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">CTR</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns.slice(0, 5).map(campaign => {
                  const ctr = campaign.metadata.impressions && campaign.metadata.impressions > 0 
                    ? ((campaign.metadata.clicks || 0) / campaign.metadata.impressions * 100).toFixed(2)
                    : '0.00';
                  
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500">
                          {campaign.metadata.objective?.replace('_', ' ')}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`status-badge status-${campaign.metadata.status}`}>
                          {campaign.metadata.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        ${campaign.metadata.daily_budget || campaign.metadata.lifetime_budget || 0}/day
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {(campaign.metadata.impressions || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900">
                        {(campaign.metadata.clicks || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{ctr}%</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-primary-600 hover:text-primary-700">Edit</button>
                          <button className="text-gray-600 hover:text-gray-700">View</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}