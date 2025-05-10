
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedItemCard from '@/components/home/FeaturedItemCard';

// Mock owner data
const ownerData = {
  id: 1,
  name: 'شركة الفنادق الدولية',
  image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300',
  bio: 'شركة متخصصة في إدارة الفنادق الفاخرة في فلسطين منذ عام 2005. نهدف إلى تقديم تجربة إقامة استثنائية مع الحفاظ على الطابع المحلي الأصيل.',
  phone: '+970 59 123 4567',
  email: 'contact@palestine-hotels.com',
  website: 'www.palestine-hotels.com',
  establishedYear: 2005,
  location: 'جنين، فلسطين',
  activities: [
    {
      id: 1,
      name: 'فندق جنين الدولي',
      category: 'hotels',
      location: 'وسط المدينة، جنين',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
      rating: 4.8
    },
    {
      id: 4,
      name: 'فندق القدس الجديد',
      category: 'hotels',
      location: 'الجهة الشرقية، جنين',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1080',
      rating: 4.6
    },
    {
      id: 5,
      name: 'شاليهات النخيل',
      category: 'chalets',
      location: 'غرب جنين',
      image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1080',
      rating: 4.5
    }
  ]
};

const OwnerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch owner data
    setTimeout(() => {
      setOwner(ownerData);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-64 w-full md:w-1/3 rounded-lg" />
            <div className="w-full md:w-2/3 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!owner) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <p className="text-xl text-gray-600">المالك غير موجود</p>
          <Link to="/" className="text-primary hover:underline mt-4 block">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Owner Profile Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage src={owner.image} alt={owner.name} />
              <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-right space-y-4 flex-1">
              <h1 className="text-3xl font-bold">{owner.name}</h1>
              <p className="text-lg">{owner.bio}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{owner.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>تأسست عام {owner.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">معلومات الاتصال</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                  <p className="font-medium">{owner.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                  <p className="font-medium">{owner.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الموقع الإلكتروني</p>
                  <a href={`https://${owner.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                    {owner.website}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Activities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">الأنشطة الترفيهية ({owner.activities.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {owner.activities.map((activity) => (
              <FeaturedItemCard key={activity.id} {...activity} />
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline">العودة إلى الصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OwnerProfile;
