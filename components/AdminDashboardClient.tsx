'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AuthUser, AdminMetrics, Ad } from '@/types';
import { Users, DollarSign, FileCheck, AlertCircle, TrendingUp, Settings, LogOut, Shield, Activity } from 'lucide-react';

interface AdminDashboardClientProps {
  user: AuthUser;
  metrics: AdminMetrics;
  recentAds: Ad[];
}

export default function AdminDashboardClient({ user, metrics, recentAds }: AdminDashboardClientProps) {
  const [ads] = useState(recentAds);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary-500" />
                <h1 className="text-2xl font-bold text-white">Vyuma Admin Panel</h1>
              </div>
              <div className="flex gap-6">
                <Link href="/admin/dashboard" className="text-primary-400 font-medium">Overview</Link>
                <Link href="/admin/ads" className="text-gray-400 hover:text-white">Ad Review</Link>
                <Link href="/admin/users" className="text-gray-400 hover:text-white">Users</Link>
                <Link href="/admin/financials" className="text-gray-400 hover:text-white">Financials</Link>
                <Link href="/admin/analytics" className="text-gray-400 hover:text-white">Analytics</Link>
                <Link href="/admin/settings" className="text-gray-400 hover:text-white">Settings</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{user.name}</span>
              <button className="text-gray-400 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-gray-400 mt-1">Platform overview and management</p>
        </div>

        {/* System Health Alert */}
        <div className={`rounded-lg p-4 mb-8 ${
          metrics.systemHealth === 'good' ? 'bg-green-900/50 border border-green-700' :
          metrics.systemHealth === 'warning' ? 'bg-yellow-900/50 border border-yellow-700' :
          'bg-red-900/50 border border-red-700'
        }`}>
          <div className="flex items-center gap-3">
            <Activity className={`w-5 h-5 ${
              metrics.systemHealth === 'good' ? 'text-green-400' :
              metrics.systemHealth === 'warning' ? 'text-yellow-400' :
              'text-red-400'
            }`} />
            <span className="text-white font-medium">System Status:</span>
            <span className={`${
              metrics.systemHealth === 'good' ? 'text-green-400' :
              metrics.systemHealth === 'warning' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {metrics.systemHealth === 'good' ? 'All Systems Operational' :
               metrics.systemHealth === 'warning' ? 'Minor Issues Detected' :
               'Critical Issues Require Attention'}
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Users</span>
              <Users className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-2xl font-bold text-white">{metrics.totalUsers}</div>
            <p className="text-sm text-green-400 mt-1">{metrics.activeUsers} active</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Pending Review</span>
              <FileCheck className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-2xl font-bold text-white">{metrics.pendingAds}</div>
            <p className="text-sm text-orange-400 mt-1">Requires attention</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Platform Revenue</span>
              <DollarSign className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-2xl font-bold text-white">${metrics.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-green-400 mt-1">+18% this month</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Growth Rate</span>
              <TrendingUp className="w-5 h-5 text-primary-500" />
            </div>
            <div className="text-2xl font-bold text-white">+24%</div>
            <p className="text-sm text-green-400 mt-1">User acquisition</p>
          </div>
        </div>

        {/* Recent Ads for Review */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Ad Submissions</h3>
            <Link href="/admin/ads" className="text-primary-400 hover:text-primary-300">
              Review All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Ad Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Format</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {ads.map(ad => (
                  <tr key={ad.id} className="hover:bg-gray-700/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{ad.title}</div>
                      <div className="text-sm text-gray-400">{ad.metadata.headline}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {ad.metadata.format}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ad.metadata.status === 'pending' ? 'bg-orange-900/50 text-orange-300' :
                        ad.metadata.status === 'approved' ? 'bg-green-900/50 text-green-300' :
                        ad.metadata.status === 'rejected' ? 'bg-red-900/50 text-red-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {ad.metadata.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {new Date(ad.metadata.created_at || ad.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-primary-400 hover:text-primary-300">Review</button>
                        {ad.metadata.status === 'pending' && (
                          <>
                            <button className="text-green-400 hover:text-green-300">Approve</button>
                            <button className="text-red-400 hover:text-red-300">Reject</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}