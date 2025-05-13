
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
import { Settings, Calendar, Home, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OwnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'owner') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'owner') {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">لوحة تحكم صاحب النشاط</h1>
        
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
                      <span>الحجوزات</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Edit size={20} />
                      <span>الأنشطة</span>
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
                  صاحب النشاط: {user?.name}
                </div>
              </SidebarFooter>
            </Sidebar>
            
            <div className="flex-1 p-6">
              <Tabs defaultValue="dashboard">
                <TabsList>
                  <TabsTrigger value="dashboard">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="activities">الأنشطة</TabsTrigger>
                  <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي الأنشطة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">2</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي الحجوزات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">8</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>تقييم النشاط</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">4.5/5</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>آخر الحجوزات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[1, 2, 3].map((booking) => (
                          <div key={booking} className="p-3 border rounded-lg">
                            <p className="font-medium">حجز رقم #{booking}</p>
                            <p className="text-sm text-gray-500">النشاط: رحلة سفاري في الصحراء</p>
                            <p className="text-sm text-gray-500">تاريخ الحجز: {new Date().toLocaleDateString('ar-SA')}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activities">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>إدارة الأنشطة</CardTitle>
                      <Button size="sm">+ إضافة نشاط جديد</Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 1, name: 'رحلة سفاري في الصحراء', category: 'مغامرات', bookings: 5 },
                          { id: 4, name: 'فندق الواحة', category: 'إقامة', bookings: 3 }
                        ].map((activity) => (
                          <div key={activity.id} className="p-3 border rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-sm text-gray-500">التصنيف: {activity.category}</p>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">الحجوزات: {activity.bookings}</div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline">تعديل</Button>
                                <Button size="sm" variant="outline" onClick={() => navigate(`/activity/${activity.id}`)}>عرض</Button>
                              </div>
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
                      <CardTitle>إدارة الحجوزات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((booking) => (
                          <div key={booking} className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">حجز رقم #{booking}</p>
                                <p className="text-sm text-gray-500">النشاط: رحلة سفاري في الصحراء</p>
                                <p className="text-sm text-gray-500">المستخدم: مستخدم عادي</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">تاريخ الحجز: {new Date().toLocaleDateString('ar-SA')}</p>
                                <div className="mt-2 flex gap-2">
                                  <Button size="sm" variant="outline">تأكيد</Button>
                                  <Button size="sm" variant="outline">إلغاء</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
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

export default OwnerDashboard;
