
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
import { Settings, Users, Calendar, Home } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">لوحة تحكم مدير النظام</h1>
        
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
                      <Users size={20} />
                      <span>إدارة المستخدمين</span>
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
                      <Settings size={20} />
                      <span>الإعدادات</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <div className="px-4 py-2 text-xs text-gray-500">
                  مدير النظام: {user?.name}
                </div>
              </SidebarFooter>
            </Sidebar>
            
            <div className="flex-1 p-6">
              <Tabs defaultValue="dashboard">
                <TabsList>
                  <TabsTrigger value="dashboard">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="users">المستخدمين</TabsTrigger>
                  <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي المستخدمين</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">3</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي الأنشطة</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">5</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي الحجوزات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">12</p>
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
                            <p className="text-sm text-gray-500">تاريخ الحجز: {new Date().toLocaleDateString('ar-SA')}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <CardTitle>إدارة المستخدمين</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: 1, name: 'مدير النظام', email: 'admin@example.com', role: 'admin' },
                          { id: 2, name: 'شركة الفنادق الدولية', email: 'owner@example.com', role: 'owner' },
                          { id: 3, name: 'مستخدم عادي', email: 'user@example.com', role: 'user' }
                        ].map((user) => (
                          <div key={user.id} className="p-3 border rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div>
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                                {user.role === 'admin' ? 'مدير النظام' : 
                                 user.role === 'owner' ? 'صاحب نشاط' : 'مستخدم'}
                              </span>
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
                        {[1, 2, 3].map((booking) => (
                          <div key={booking} className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">حجز رقم #{booking}</p>
                                <p className="text-sm text-gray-500">النشاط: رحلة سفاري في الصحراء</p>
                                <p className="text-sm text-gray-500">المستخدم: مستخدم عادي</p>
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
              </Tabs>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
