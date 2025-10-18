import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken, getTokenFromCookies } from '@/lib/auth';
import { getCampaigns } from '@/lib/cosmic';
import DashboardClient from '@/components/DashboardClient';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = getTokenFromCookies(cookieStore.get('auth-token')?.value || null);
  
  if (!token) {
    redirect('/login');
  }

  const user = verifyToken(token);
  
  if (!user) {
    redirect('/login');
  }

  const campaigns = await getCampaigns(user.id);

  return <DashboardClient user={user} initialCampaigns={campaigns} />;
}