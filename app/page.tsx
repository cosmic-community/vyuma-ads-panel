import Link from 'next/link';
import { TrendingUp, Target, DollarSign, BarChart3, Users, Shield, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900">Vyuma Ads</h1>
          <div className="flex gap-4">
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Advertising Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create, manage, and optimize your advertising campaigns with our comprehensive platform
            inspired by industry leaders.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Start Your Campaign
            </Link>
            <Link href="/developer/login" className="btn-secondary text-lg px-8 py-3">
              Developer Access
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="dashboard-card text-center">
            <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Advanced Targeting</h3>
            <p className="text-gray-600 text-sm">
              Reach your exact audience with precise demographic and interest targeting
            </p>
          </div>

          <div className="dashboard-card text-center">
            <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600 text-sm">
              Track performance metrics and optimize campaigns in real-time
            </p>
          </div>

          <div className="dashboard-card text-center">
            <DollarSign className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Budgets</h3>
            <p className="text-gray-600 text-sm">
              Daily or lifetime budgets with automated bidding strategies
            </p>
          </div>

          <div className="dashboard-card text-center">
            <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Ad Review System</h3>
            <p className="text-gray-600 text-sm">
              Quality control and policy compliance for all advertisements
            </p>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="dashboard-card">
            <Users className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Advertisers</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Create and manage multiple campaigns
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Multiple ad formats (image, video, carousel)
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Detailed performance analytics
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Audience targeting and segmentation
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Budget optimization tools
              </li>
            </ul>
          </div>

          <div className="dashboard-card">
            <Zap className="w-10 h-10 text-primary-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Administrators</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Complete platform oversight
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Ad review and approval system
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                User management and controls
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Financial and revenue tracking
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Platform configuration tools
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">Platform Capabilities</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-primary-100">Ad Formats</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Real-time</div>
              <div className="text-primary-100">Analytics</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Advanced</div>
              <div className="text-primary-100">Targeting</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Support</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="mb-4">
            Professional advertising platform built for modern businesses
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/login" className="hover:text-primary-600">
              Advertiser Login
            </Link>
            <Link href="/developer/login" className="hover:text-primary-600">
              Developer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}