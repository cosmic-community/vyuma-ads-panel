import { createBucketClient } from '@cosmicjs/sdk';
import type { User, Campaign, Ad, Audience, PlatformSettings } from '@/types';

// Initialize Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// User functions
export async function getUsers(): Promise<User[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as User[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch users');
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'users', 'metadata.email': email })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(1);
    
    if (response.objects.length === 0) {
      return null;
    }
    
    return response.objects[0] as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

// Campaign functions
export async function getCampaigns(userId?: string): Promise<Campaign[]> {
  try {
    const query: any = { type: 'campaigns' };
    if (userId) {
      query['metadata.user_id'] = userId;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Sort by created_at manually
    const campaigns = response.objects as Campaign[];
    return campaigns.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch campaigns');
  }
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  try {
    const response = await cosmic.objects
      .findOne({ id, type: 'campaigns' })
      .depth(1);
    return response.object as Campaign;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch campaign');
  }
}

export async function createCampaign(data: Partial<Campaign>): Promise<Campaign> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'campaigns',
      title: data.title || 'New Campaign',
      metadata: {
        ...data.metadata,
        created_at: new Date().toISOString(),
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        roi: 0
      }
    });
    return response.object as Campaign;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw new Error('Failed to create campaign');
  }
}

export async function updateCampaign(id: string, updates: Partial<Campaign['metadata']>): Promise<Campaign> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    return response.object as Campaign;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw new Error('Failed to update campaign');
  }
}

// Ad functions
export async function getAds(campaignId?: string): Promise<Ad[]> {
  try {
    const query: any = { type: 'ads' };
    if (campaignId) {
      query['metadata.campaign_id'] = campaignId;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    // Sort by created_at manually
    const ads = response.objects as Ad[];
    return ads.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch ads');
  }
}

export async function createAd(data: Partial<Ad>): Promise<Ad> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'ads',
      title: data.title || 'New Ad',
      metadata: {
        ...data.metadata,
        created_at: new Date().toISOString(),
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0
      }
    });
    return response.object as Ad;
  } catch (error) {
    console.error('Error creating ad:', error);
    throw new Error('Failed to create ad');
  }
}

export async function updateAd(id: string, updates: Partial<Ad['metadata']>): Promise<Ad> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: updates
    });
    return response.object as Ad;
  } catch (error) {
    console.error('Error updating ad:', error);
    throw new Error('Failed to update ad');
  }
}

// Audience functions
export async function getAudiences(userId?: string): Promise<Audience[]> {
  try {
    const query: any = { type: 'audiences' };
    if (userId) {
      query['metadata.user_id'] = userId;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Audience[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch audiences');
  }
}

// Platform Settings
export async function getPlatformSettings(): Promise<PlatformSettings[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'platform_settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as PlatformSettings[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch platform settings');
  }
}

export async function updatePlatformSetting(id: string, value: any): Promise<PlatformSettings> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: { value }
    });
    return response.object as PlatformSettings;
  } catch (error) {
    console.error('Error updating platform setting:', error);
    throw new Error('Failed to update platform setting');
  }
}