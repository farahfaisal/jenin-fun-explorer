
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Hotel, MapPin as ParkIcon, Home } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity } from '@/types/activity';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityImageGallery } from '@/components/activities/ActivityImageGallery';
import { ActivityHeader } from '@/components/activities/ActivityHeader';
import { ActivityAuthAlert } from '@/components/activities/ActivityAuthAlert';
import { ActivityOwnerCard } from '@/components/activities/ActivityOwnerCard';
import { ActivityDetailTabs } from '@/components/activities/ActivityDetailTabs';

// Temporary mock data
const activityData = {
  id: 1,
  name: 'فندق جنين الدولي',
  category: 'hotels',
  categoryLabel: 'فندق',
  icon: Hotel,
  owner: 'شركة الفنادق الدولية',
  ownerProfile: {
    id: 1,
    name: 'شركة الفنادق الدولية',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300',
    bio: 'شركة متخصصة في إدارة الفنادق الفاخرة في فلسطين منذ عام 2005. نهدف إلى تقديم تجربة إقامة استثنائية مع الحفاظ على الطابع المحلي الأصيل.',
    phone: '+970 59 123 4567',
    email: 'contact@palestine-hotels.com',
    activitiesCount: 3
  },
  location: 'وسط المدينة، جنين',
  description: 'فندق فاخر يقع في قلب مدينة جنين، يوفر إطلالات خلابة على المدينة والتلال المحيطة بها. يضم الفندق 120 غرفة مجهزة بأحدث وسائل الراحة، بالإضافة إلى مطعمين ومركز للياقة البدنية وقاعات للاجتماعات والمناسبات.',
  rating: 4.8,
  amenities: ['واي فاي مجاني', 'موقف سيارات', 'مسبح', 'مطعم', 'خدمة الغرف', 'مركز لياقة بدنية'],
  priceRange: '$$',
  openingHours: 'مفتوح 24 ساعة',
  contactPhone: '+970 59 123 4567',
  contactEmail: 'info@jenin-hotel.ps',
  website: 'www.jenin-hotel.ps',
  establishedYear: 2010,
  reviews: [
    { id: 1, user: 'أحمد محمد', date: '2023-12-15', rating: 5, comment: 'خدمة ممتازة وموقع مثالي في وسط المدينة.' },
    { id: 2, user: 'سارة أحمد', date: '2023-11-20', rating: 4.5, comment: 'تجربة رائعة، الغرف نظيفة ومريحة.' },
    { id: 3, user: 'محمود علي', date: '2023-10-05', rating: 4, comment: 'فندق جيد، لكن الإفطار يمكن أن يكون أفضل.' }
  ],
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1080',
    'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&q=80&w=1080',
    'https://images.unsplash.com/photo-1445991842772-097fea258e7b?auto=format&fit=crop&q=80&w=1080'
  ],
  panorama: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080'
};

// Example of other activities with different categories for testing
const otherActivities = [
  activityData, // hotels
  {
    id: 2,
    name: 'شاليه الربيع',
    category: 'chalets',
    categoryLabel: 'شاليه',
    icon: Home,
    owner: 'مجموعة شاليهات جنين',
    location: 'شمال جنين',
    description: 'شاليه فاخر محاط بالمناظر الطبيعية الخلابة، ويوفر أجواء هادئة بعيدة عن ضوضاء المدينة. يتكون الشاليه من طابقين مع شرفة واسعة وحديقة خاصة وبركة سباحة.',
    rating: 4.6,
    amenities: ['واي فاي مجاني', 'بركة سباحة خاصة', 'حديقة', 'شواية', 'تدفئة مركزية', 'موقف سيارات'],
    priceRange: '$$$',
    openingHours: 'متاح للحجز طوال العام',
    contactPhone: '+970 59 765 4321',
    contactEmail: 'booking@spring-chalet.ps',
    website: 'www.spring-chalet.ps',
    establishedYear: 2018,
    reviews: [
      { id: 1, user: 'خالد إبراهيم', date: '2024-01-10', rating: 5, comment: 'مكان رائع للاسترخاء. قضينا عطلة نهاية أسبوع مميزة.' },
      { id: 2, user: 'ريم نادر', date: '2023-12-23', rating: 4.5, comment: 'الشاليه نظيف جداً والمنظر خلاب.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1080'
    ],
    panorama: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1080'
  },
  {
    id: 3,
    name: 'حديقة السلام',
    category: 'parks',
    categoryLabel: 'حديقة',
    icon: ParkIcon,
    owner: 'بلدية جنين',
    location: 'شارع الحدائق، شرق جنين',
    description: 'حديقة عامة واسعة مع مساحات خضراء شاسعة وملاعب للأطفال ومناطق مخصصة للشواء والنزهات العائلية. تضم الحديقة مسارات للمشي وركوب الدراجات، ونافورة مياه جميلة في المنتصف. مكان مثالي لقضاء يوم ممتع مع العائلة والأصدقاء في أحضان الطبيعة.',
    rating: 4.5,
    amenities: ['مواقف سيارات مجانية', 'ملاعب أطفال', 'مناطق شواء', 'مسارات للمشي', 'كافيتيريا', 'دورات مياه'],
    priceRange: '$',
    openingHours: '8:00 صباحًا - 9:00 مساءً، يومياً',
    contactPhone: '+970 59 111 2222',
    contactEmail: 'parks@jenin-municipality.ps',
    website: 'www.jenin-parks.ps',
    establishedYear: 2005,
    reviews: [
      { id: 1, user: 'فاطمة عمر', date: '2024-02-05', rating: 5, comment: 'مكان رائع للعائلات، قضينا وقتاً ممتعاً مع الأطفال.' },
      { id: 2, user: 'سامي حسن', date: '2023-11-18', rating: 4, comment: 'حديقة جميلة ونظيفة، لكن يمكن تحسين المرافق.' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1552617542-b5f500372f34?auto=format&fit=crop&q=80&w=1080'
    ],
    panorama: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080'
  }
];

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      const foundActivity = otherActivities.find((item) => item.id === Number(id));
      setActivity(foundActivity as Activity);
      setIsLoading(false);
    }, 500);
  }, [id]);

  // Check if user has access to view detailed activity info
  const hasDetailedAccess = isAuthenticated;
  
  // Check if user is the owner of this activity
  const isOwner = user?.role === 'owner' && user?.ownedActivities?.includes(Number(id));
  
  // Check if user is an admin
  const isAdmin = user?.role === 'admin';

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <Skeleton className="w-full h-64 rounded-md mb-4" />
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
          <Skeleton className="h-6 w-full rounded-md mb-2" />
          <Skeleton className="h-6 w-full rounded-md mb-2" />
          <Skeleton className="h-6 w-full rounded-md mb-2" />
        </div>
      </Layout>
    );
  }

  if (!activity) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-xl text-gray-600">النشاط غير موجود</p>
          <Link to="/activities" className="text-primary hover:underline">
            العودة إلى قائمة الأنشطة
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section with Image Gallery */}
        <ActivityImageGallery 
          images={activity.images} 
          name={activity.name} 
          rating={activity.rating}
        />

        {/* Activity Header Information */}
        <ActivityHeader 
          name={activity.name}
          icon={activity.icon}
          categoryLabel={activity.categoryLabel}
          location={activity.location}
        />

        {/* Restricted Access Message */}
        {!hasDetailedAccess && (
          <ActivityAuthAlert onLoginClick={handleLoginRedirect} />
        )}

        {/* Owner Card - Visible to all */}
        <ActivityOwnerCard 
          owner={activity.owner}
          ownerProfile={activity.ownerProfile}
        />

        {/* Tabs Section - Only visible to authenticated users */}
        {hasDetailedAccess && (
          <ActivityDetailTabs 
            description={activity.description}
            amenities={activity.amenities}
            reviews={activity.reviews}
            contactPhone={activity.contactPhone}
            contactEmail={activity.contactEmail}
            website={activity.website}
            isOwner={isOwner}
            isAdmin={isAdmin}
          />
        )}

        {/* Back to Activities Button */}
        <div className="mt-8">
          <Link to="/activities">
            <Button variant="secondary">العودة إلى قائمة الأنشطة</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ActivityDetail;
