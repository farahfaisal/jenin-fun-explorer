
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Hotel, Park, Home } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Mock data
const activitiesData = [
  {
    id: '1',
    name: 'فندق جنين الدولي',
    category: 'hotels',
    categoryLabel: 'فندق',
    icon: Hotel,
    owner: 'شركة الفنادق الدولية',
    location: 'شارع الملك حسين، وسط المدينة، جنين',
    description: 'فندق فاخر في وسط مدينة جنين، يقدم خدمات متميزة وإطلالات رائعة على المدينة. يتميز الفندق بغرف مريحة وأنيقة، ومطعم يقدم أشهى المأكولات المحلية والعالمية، وصالة رياضية مجهزة بالكامل، وقاعات اجتماعات مناسبة للفعاليات والمؤتمرات.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?auto=format&fit=crop&q=80&w=1080',
    ],
    panorama: 'https://www.google.com/maps/embed?pb=!4v1713553073493!6m8!1m7!1sCAoSLEFGMVFpcFA3Nzh0OExBb1hoWDRUOFByNUg0RlEycllJalMySGQxWmZJRFhJ!2m2!1d31.9486681!2d35.5939121!3f180!4f0!5f0.7820865974627469',
    rating: 4.8,
    price: '100$',
    website: 'https://jenin-hotel.example.com',
    phone: '+970 59 123 4567',
    email: 'info@jenin-hotel.example.com',
    openHours: 'مفتوح 24 ساعة',
    amenities: ['واي فاي مجاني', 'موقف سيارات', 'مسبح', 'مطعم', 'خدمة الغرف', 'صالة رياضية'],
    reviews: [
      { id: 1, user: 'أحمد محمود', date: '12/04/2025', rating: 5, comment: 'فندق رائع مع خدمة ممتازة والموقع مثالي في وسط المدينة' },
      { id: 2, user: 'سارة خليل', date: '05/04/2025', rating: 4, comment: 'إقامة مريحة، الغرف نظيفة والإفطار متنوع ولذيذ' }
    ]
  },
  {
    id: '2',
    name: 'شاليه الربيع',
    category: 'chalets',
    categoryLabel: 'شاليه',
    icon: Home,
    owner: 'علي أحمد',
    location: 'منطقة المراح، شمال جنين',
    description: 'شاليه هادئ محاط بالطبيعة الخلابة، مثالي للعائلات والاسترخاء بعيداً عن صخب المدينة. يوفر الشاليه مساحة واسعة مع حديقة خاصة ومنطقة للشواء، بالإضافة إلى مسبح خاص للضيوف. يتسع الشاليه لعائلة كبيرة ويقدم جميع وسائل الراحة اللازمة لإقامة لا تُنسى.',
    images: [
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?auto=format&fit=crop&q=80&w=1080',
    ],
    panorama: 'https://www.google.com/maps/embed?pb=!4v1713553073493!6m8!1m7!1sCAoSLEFGMVFpcFA3Nzh0OExBb1hoWDRUOFByNUg0RlEycllJalMySGQxWmZJRFhJ!2m2!1d31.9486681!2d35.5939121!3f180!4f0!5f0.7820865974627469',
    rating: 4.6,
    price: '70$',
    website: 'https://spring-chalet.example.com',
    phone: '+970 59 765 4321',
    email: 'booking@spring-chalet.example.com',
    openHours: 'تسجيل الدخول: 14:00، تسجيل الخروج: 12:00',
    amenities: ['مسبح خاص', 'حديقة', 'شواء', 'واي فاي مجاني', 'موقف سيارات', 'تلفزيون'],
    reviews: [
      { id: 1, user: 'محمد علي', date: '20/04/2025', rating: 5, comment: 'مكان رائع للاسترخاء مع العائلة، المسبح نظيف والمنظر خلاب' },
      { id: 2, user: 'رنا خالد', date: '15/03/2025', rating: 4, comment: 'قضينا عطلة نهاية أسبوع ممتعة، الشاليه مجهز بشكل جيد' }
    ]
  },
  {
    id: '3',
    name: 'حديقة السلام',
    category: 'parks',
    categoryLabel: 'حديقة',
    icon: Park,
    owner: 'بلدية جنين',
    location: 'شارع الحدائق، شرق جنين',
    description: 'حديقة عامة واسعة مع مساحات خضراء شاسعة وملاعب للأطفال ومناطق مخصصة للشواء والنزهات العائلية. تضم الحديقة مسارات للمشي وركوب الدراجات، ونافورة مياه جميلة في المنتصف. مكان مثالي لقضاء يوم ممتع مع العائلة والأصدقاء في أحضان الطبيعة.',
    images: [
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1464288550599-43d5a73451b8?auto=format&fit=crop&q=80&w=1080',
      'https://images.unsplash.com/photo-1557779170-33066eb1b9cc?auto=format&fit=crop&q=80&w=1080',
    ],
    panorama: 'https://www.google.com/maps/embed?pb=!4v1713553073493!6m8!1m7!1sCAoSLEFGMVFpcFA3Nzh0OExBb1hoWDRUOFByNUg0RlEycllJalMySGQxWmZJRFhJ!2m2!1d31.9486681!2d35.5939121!3f180!4f0!5f0.7820865974627469',
    rating: 4.5,
    price: '5$',
    website: 'https://jenin-municipality.example.com/peace-park',
    phone: '+970 59 111 2222',
    email: 'parks@jenin-municipality.example.com',
    openHours: '8:00 صباحاً - 10:00 مساءً',
    amenities: ['ملاعب أطفال', 'مسارات للمشي', 'مناطق للشواء', 'مقاعد ومظلات', 'مرافق عامة', 'موقف سيارات'],
    reviews: [
      { id: 1, user: 'فاطمة أحمد', date: '18/04/2025', rating: 5, comment: 'مكان رائع للعائلات، المساحات الخضراء جميلة والألعاب مناسبة للأطفال من جميع الأعمار' },
      { id: 2, user: 'خالد محمود', date: '10/04/2025', rating: 4, comment: 'حديقة نظيفة ومنظمة، لكن يمكن إضافة المزيد من المظلات للحماية من الشمس' }
    ]
  }
];

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    const foundActivity = activitiesData.find(act => act.id === id);
    setActivity(foundActivity || null);
  }, [id]);
  
  if (!activity) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">النشاط غير موجود</h2>
          <p className="mb-6">عذراً، لم نتمكن من العثور على النشاط المطلوب</p>
          <Link to="/activities">
            <Button>العودة إلى صفحة الأنشطة</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const ActivityIcon = activity.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-20" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${activity.images[0]})` 
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-3">
              <ActivityIcon size={20} className="ml-2" />
              <span>{activity.categoryLabel}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{activity.name}</h1>
            <div className="flex items-center mb-4">
              <MapPin size={18} className="ml-1" />
              <p>{activity.location}</p>
            </div>
            <div className="flex items-center space-s-4">
              <div className="bg-white text-primary py-1 px-3 rounded-lg font-bold">
                {activity.rating} / 5
              </div>
              <span className="text-accent font-bold">{activity.price} / اليوم</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="photos">الصور</TabsTrigger>
              <TabsTrigger value="panorama">صور 360°</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">عن {activity.name}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{activity.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-3">المميزات</h3>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                      {activity.amenities.map((amenity: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <div className="bg-primary/10 text-primary p-1 rounded-full ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                          </div>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">معلومات الاتصال</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">المالك:</p>
                        <p className="text-gray-700">{activity.owner}</p>
                      </div>
                      <div>
                        <p className="font-semibold">الهاتف:</p>
                        <a href={`tel:${activity.phone}`} className="text-primary hover:underline">{activity.phone}</a>
                      </div>
                      <div>
                        <p className="font-semibold">البريد الإلكتروني:</p>
                        <a href={`mailto:${activity.email}`} className="text-primary hover:underline">{activity.email}</a>
                      </div>
                      <div>
                        <p className="font-semibold">الموقع الإلكتروني:</p>
                        <a href={activity.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{activity.website.split('//')[1]}</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">أوقات العمل</h3>
                    <div className="flex items-center text-gray-700">
                      <Calendar size={18} className="ml-2" />
                      <span>{activity.openHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">معرض الصور</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activity.images.map((image: string, index: number) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${activity.name} - صورة ${index + 1}`} 
                        className="w-full h-64 object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="panorama">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">صور 360 درجة</h2>
                <div className="panorama-container">
                  <iframe
                    src={activity.panorama}
                    title={`${activity.name} - صورة 360 درجة`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">التقييمات والمراجعات</h2>
                {activity.reviews && activity.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {activity.reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{review.user}</h4>
                          <span className="text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill={i < review.rating ? "currentColor" : "none"} 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className={i < review.rating ? "text-accent" : "text-gray-300"}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                          ))}
                          <span className="mr-2 text-gray-600">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">لا توجد تقييمات بعد.</p>
                )}
                
                <div className="mt-8 text-center">
                  <Button>إضافة تقييم</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Activities */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">أنشطة مشابهة قد تعجبك</h2>
          
          <Carousel className="w-full">
            <CarouselContent>
              {activitiesData
                .filter(a => a.id !== id && a.category === activity.category)
                .map((relatedActivity) => (
                  <CarouselItem key={relatedActivity.id} className="md:basis-1/2 lg:basis-1/3">
                    <Link to={`/activity/${relatedActivity.id}`} className="block">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={relatedActivity.images[0]} 
                            alt={relatedActivity.name} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-white py-1 px-3 rounded-full text-sm">
                            {relatedActivity.rating}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{relatedActivity.name}</h3>
                          <p className="flex items-center text-gray-600 mb-2 text-sm">
                            <MapPin size={14} className="ml-1" />
                            {relatedActivity.location.split(',')[0]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </Layout>
  );
};

export default ActivityDetail;
