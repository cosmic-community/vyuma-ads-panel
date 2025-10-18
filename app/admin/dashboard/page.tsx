import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';
import { getUsers, getAds, getCampaigns } from '@/lib/cosmic';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookies(cookieStore.get('auth-token')?.value || null);
  
  if (!token) {
    redirect('/developer/login');
  }

  const user = verifyToken(token);
  
  if (!user || (user.role !== 'admin' && user.role !== 'developer')) {
    redirect('/developer/login');
  }

  const [users, ads, campaigns] = await Promise.all([
    getUsers(),
    getAds(),
    getCampaigns()
  ]);

  const pendingAds = ads.filter(ad => ad.metadata.status === 'pending');
  const activeUsers = users.filter(u => u.metadata.status === 'active');
  
  const totalRevenue = campaigns.reduce((sum, c) => sum + (c.metadata.spend || 0), 0);

  const metrics = {
    totalUsers: users.length,
    activeUsers: activeUsers.length,
    pendingAds: pendingAds.length,
    totalRevenue,
    systemHealth: 'good' as const,
    recentAlerts: []
  };

  return <AdminDashboardClient user={user} metrics={metrics} recentAds={ads.slice(0, 5)} />;
}