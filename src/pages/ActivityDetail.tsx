
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import ActivityHeader from '@/components/activities/ActivityHeader';
import ActivityImageGallery from '@/components/activities/ActivityImageGallery';
import ActivityDetailTabs from '@/components/activities/ActivityDetailTabs';
import ActivityBookingCalendar from '@/components/activities/ActivityBookingCalendar';
import ActivityOwnerCard from '@/components/activities/ActivityOwnerCard';
import ActivityAuthAlert from '@/components/activities/ActivityAuthAlert';
import { Activity } from '@/types/activity';

// Mock data for demonstration
const mockActivity: Activity = {
  id: '1',
  title: 'رحلة جبل شمس',
  description: 'استكشف أعلى قمة في عمان مع مرشدين محترفين وتمتع بالمناظر الخلابة والهواء النقي',
  shortDescription: 'رحلة استكشافية لجبل شمس مع مرشدين',
  price: 75,
  duration: 480,
  maxParticipants: 15,
  location: 'جبل شمس، نزوى، عمان',
  latitude: 23.2367,
  longitude: 57.2633,
  categoryId: 'cat1',
  ownerId: 'owner1',
  status: 'active',
  featured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  images: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1464822759844-d150baec0494'
  ],
  amenities: ['مرشد سياحي', 'وجبة غداء', 'مياه', 'معدات السلامة'],
  requirements: ['لياقة بدنية متوسطة', 'ملابس رياضية', 'حذاء مشي'],
  cancellationPolicy: 'يمكن الإلغاء قبل 24 ساعة من الرحلة'
};

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile, isAuthenticated } = useAuth();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setActivity(mockActivity);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!activity) {
    return <Navigate to="/activities" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <ActivityHeader activity={activity} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <ActivityImageGallery images={activity.images} title={activity.title} />
            <ActivityDetailTabs activity={activity} />
          </div>
          
          <div className="space-y-6">
            <ActivityOwnerCard activity={activity} />
            
            {!isAuthenticated && <ActivityAuthAlert />}
            
            {isAuthenticated && (
              <ActivityBookingCalendar 
                activity={activity}
                onBookingComplete={(booking) => {
                  console.log('Booking created:', booking);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityDetail;
