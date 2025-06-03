
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Calendar, MapPin, Star, Eye } from 'lucide-react';

// Mock data
const mockStats = {
  totalBookings: 8,
  upcomingBookings: 3,
  completedBookings: 5,
  favorites: 12
};

const mockBookings = [
  { 
    id: '1', 
    activityTitle: 'رحلة جبل شمس', 
    date: '2024-02-15', 
    time: '08:00',
    status: 'confirmed', 
    price: 75,
    location: 'جبل شمس، نزوى'
  },
  { 
    id: '2', 
    activityTitle: 'رحلة وادي شاب', 
    date: '2024-02-18', 
    time: '09:00',
    status: 'pending', 
    price: 45,
    location: 'وادي شاب، صور'
  },
  { 
    id: '3', 
    activityTitle: 'جولة في قلعة بهلاء', 
    date: '2024-02-20', 
    time: '10:00',
    status: 'confirmed', 
    price: 25,
    location: 'قلعة بهلاء، بهلاء'
  }
];

const mockFavorites = [
  { 
    id: '1', 
    title: 'رحلة جبل شمس', 
    price: 75, 
    rating: 4.8, 
    location: 'جبل شمس، نزوى',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
  },
  { 
    id: '2', 
    title: 'رحلة وادي شاب', 
    price: 45, 
    rating: 4.6, 
    location: 'وادي شاب، صور',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000'
  }
];

const UserDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [bookings, setBookings] = useState(mockBookings);
  const [favorites, setFavorites] = useState(mockFavorites);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-gray-600 mt-2">مرحباً {profile?.name}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الحجوزات</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الحجوزات القادمة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرحلات المكتملة</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المفضلة</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.favorites}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Tabs */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">حجوزاتي</TabsTrigger>
            <TabsTrigger value="favorites">المفضلة</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>حجوزاتي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.activityTitle}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date} في {booking.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                          </Badge>
                          <span className="text-sm font-medium text-green-600">{booking.price} ر.ع</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة المفضلة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map((activity) => (
                    <div key={activity.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{activity.title}</h3>
                        <div className="flex items-center gap-1 mb-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{activity.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{activity.rating}</span>
                          </div>
                          <span className="font-bold text-primary">{activity.price} ر.ع</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">الاسم</label>
                    <p className="mt-1 text-gray-900">{profile?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                    <p className="mt-1 text-gray-900">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                    <p className="mt-1 text-gray-900">{profile?.phone || 'غير محدد'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">نوع الحساب</label>
                    <p className="mt-1 text-gray-900">
                      {profile?.role === 'admin' ? 'مدير' : 
                       profile?.role === 'owner' ? 'صاحب نشاط' : 'مستخدم'}
                    </p>
                  </div>
                  <Button className="mt-4">تعديل الملف الشخصي</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboard;
