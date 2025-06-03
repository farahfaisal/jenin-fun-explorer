import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Activity, Calendar, TrendingUp, Eye, Edit, Trash2, Sliders } from 'lucide-react';
import SlidesManager from '@/components/admin/SlidesManager';

// Mock data
const mockStats = {
  totalUsers: 1234,
  totalActivities: 89,
  totalBookings: 456,
  revenue: 12450
};

const mockUsers = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', role: 'user', createdAt: '2024-01-15' },
  { id: '2', name: 'فاطمة علي', email: 'fatima@example.com', role: 'owner', createdAt: '2024-01-10' },
  { id: '3', name: 'محمد سالم', email: 'mohammed@example.com', role: 'user', createdAt: '2024-01-08' }
];

const mockActivities = [
  { id: '1', title: 'رحلة جبل شمس', owner: 'فاطمة علي', status: 'active', bookings: 12 },
  { id: '2', title: 'جولة في قلعة بهلاء', owner: 'أحمد سالم', status: 'pending', bookings: 8 },
  { id: '3', title: 'رحلة وادي شاب', owner: 'سارة محمد', status: 'active', bookings: 15 }
];

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [users, setUsers] = useState(mockUsers);
  const [activities, setActivities] = useState(mockActivities);

  if (profile?.role !== 'admin') {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">غير مصرح لك بالوصول</h1>
            <p className="text-gray-600 mt-2">هذه الصفحة مخصصة للمدراء فقط</p>
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
            <h1 className="text-3xl font-bold">لوحة تحكم المدير</h1>
            <p className="text-gray-600 mt-2">مرحباً {profile?.name}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

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
        <Tabs defaultValue="slides" className="space-y-4">
          <TabsList>
            <TabsTrigger value="slides">إدارة الشرائح</TabsTrigger>
            <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
            <TabsTrigger value="activities">إدارة الأنشطة</TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-4">
            <SlidesManager />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>المستخدمون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'owner' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'مدير' : user.role === 'owner' ? 'صاحب نشاط' : 'مستخدم'}
                          </Badge>
                          <span className="text-xs text-gray-500">انضم في {user.createdAt}</span>
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

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm text-gray-600">صاحب النشاط: {activity.owner}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                            {activity.status === 'active' ? 'نشط' : 'في الانتظار'}
                          </Badge>
                          <span className="text-xs text-gray-500">{activity.bookings} حجز</span>
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
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
