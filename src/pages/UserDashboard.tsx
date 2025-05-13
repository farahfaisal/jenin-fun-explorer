
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider, 
  SidebarFooter 
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Calendar, Home } from 'lucide-react';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
        
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-200px)] w-full rounded-lg border">
            <Sidebar>
              <SidebarHeader>
                <div className="px-4 py-2">
                  <h2 className="text-lg font-semibold">القائمة</h2>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home size={20} />
                      <span>الرئيسية</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Calendar size={20} />
                      <span>حجوزاتي</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings size={20} />
                      <span>الإعدادات</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <div className="px-4 py-2 text-xs text-gray-500">
                  المستخدم: {user?.name}
                </div>
              </SidebarFooter>
            </Sidebar>
            
            <div className="flex-1 p-6">
              <Tabs defaultValue="dashboard">
                <TabsList>
                  <TabsTrigger value="dashboard">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="bookings">حجوزاتي</TabsTrigger>
                  <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي حجوزاتي</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">3</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>الأنشطة المفضلة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">2</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>أنشطة مقترحة لك</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { id: 2, name: 'جولة في المدينة التاريخية', category: 'ثقافي' },
                          { id: 3, name: 'رحلة غوص في البحر الأحمر', category: 'مغامرات' },
                          { id: 5, name: 'زيارة متحف الفن الحديث', category: 'ثقافي' }
                        ].map((activity) => (
                          <div key={activity.id} className="p-3 border rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-sm text-gray-500">التصنيف: {activity.category}</p>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => navigate(`/activity/${activity.id}`)}
                                className="text-primary text-sm hover:underline"
                              >
                                عرض التفاصيل
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>حجوزاتي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((booking) => (
                          <div key={booking} className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">حجز رقم #{booking}</p>
                                <p className="text-sm text-gray-500">النشاط: رحلة سفاري في الصحراء</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">تاريخ الحجز: {new Date().toLocaleDateString('ar-SA')}</p>
                                <div className="mt-2">
                                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">مؤكد</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات الملف الشخصي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">الاسم</label>
                          <p>{user?.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">البريد الإلكتروني</label>
                          <p>{user?.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">العضوية</label>
                          <p>
                            {user?.role === 'admin' ? 'مدير النظام' : 
                             user?.role === 'owner' ? 'صاحب نشاط' : 'مستخدم عادي'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </Layout>
  );
};

export default UserDashboard;
