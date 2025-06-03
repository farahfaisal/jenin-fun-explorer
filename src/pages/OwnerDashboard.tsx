
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Activity, Calendar, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';

// Mock data
const mockStats = {
  totalActivities: 5,
  totalBookings: 23,
  revenue: 1250,
  activeActivities: 4
};

const mockActivities = [
  { id: '1', title: 'رحلة جبل شمس', status: 'active', bookings: 12, revenue: 900 },
  { id: '2', title: 'جولة في قلعة بهلاء', status: 'pending', bookings: 8, revenue: 200 },
  { id: '3', title: 'رحلة وادي شاب', status: 'active', bookings: 15, revenue: 675 }
];

const mockBookings = [
  { id: '1', activityTitle: 'رحلة جبل شمس', customerName: 'أحمد محمد', date: '2024-02-15', status: 'confirmed' },
  { id: '2', activityTitle: 'رحلة وادي شاب', customerName: 'فاطمة علي', date: '2024-02-18', status: 'pending' },
  { id: '3', activityTitle: 'جولة في قلعة بهلاء', customerName: 'محمد سالم', date: '2024-02-20', status: 'confirmed' }
];

const OwnerDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [activities, setActivities] = useState(mockActivities);
  const [bookings, setBookings] = useState(mockBookings);

  if (profile?.role !== 'owner') {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">غير مصرح لك بالوصول</h1>
            <p className="text-gray-600 mt-2">هذه الصفحة مخصصة لأصحاب الأنشطة فقط</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة تحكم صاحب النشاط</h1>
            <p className="text-gray-600 mt-2">مرحباً {profile?.name}</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            إضافة نشاط جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأنشطة</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalActivities}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الأنشطة النشطة</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeActivities}</div>
            </CardContent>
          </Card>

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
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue} ر.ع</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activities">أنشطتي</TabsTrigger>
            <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>أنشطتي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                            {activity.status === 'active' ? 'نشط' : 'في الانتظار'}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.bookings} حجز</span>
                          <span className="text-xs text-gray-500">{activity.revenue} ر.ع إيرادات</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الحجوزات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.activityTitle}</h3>
                        <p className="text-sm text-gray-600">العميل: {booking.customerName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status === 'confirmed' ? 'مؤكد' : 'في الانتظار'}
                          </Badge>
                          <span className="text-xs text-gray-500">التاريخ: {booking.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
