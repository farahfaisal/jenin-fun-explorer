
import { useEffect, useState } from 'react';
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
import { Settings, Calendar, Home, Edit, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const OwnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activities, setActivities] = useState([
    { id: 1, name: 'رحلة سفاري في الصحراء', category: 'مغامرات', bookings: 5 },
    { id: 4, name: 'فندق الواحة', category: 'إقامة', bookings: 3 }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, activityName: 'رحلة سفاري في الصحراء', userName: 'مستخدم عادي', date: new Date().toLocaleDateString('ar-SA'), status: 'مؤكد' },
    { id: 2, activityName: 'فندق الواحة', userName: 'مستخدم عادي', date: new Date().toLocaleDateString('ar-SA'), status: 'قيد المراجعة' },
    { id: 3, activityName: 'رحلة سفاري في الصحراء', userName: 'مستخدم آخر', date: new Date().toLocaleDateString('ar-SA'), status: 'مؤكد' },
    { id: 4, activityName: 'فندق الواحة', userName: 'مستخدم ثالث', date: new Date().toLocaleDateString('ar-SA'), status: 'قيد المراجعة' },
    { id: 5, activityName: 'رحلة سفاري في الصحراء', userName: 'مستخدم رابع', date: new Date().toLocaleDateString('ar-SA'), status: 'مؤكد' }
  ]);

  const [newActivity, setNewActivity] = useState({ name: '', category: '' });
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'owner') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.category) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const activity = {
      id: activities.length + 1,
      ...newActivity,
      bookings: 0
    };
    setActivities([...activities, activity]);
    setNewActivity({ name: '', category: '' });
    setIsAddActivityOpen(false);
    toast({
      title: "تم بنجاح",
      description: "تم إضافة النشاط بنجاح",
    });
  };

  const handleDeleteActivity = (activityId: number) => {
    setActivities(activities.filter(activity => activity.id !== activityId));
    toast({
      title: "تم بنجاح",
      description: "تم حذف النشاط بنجاح",
    });
  };

  const handleUpdateBookingStatus = (bookingId: number, status: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    toast({
      title: "تم بنجاح",
      description: `تم ${status === 'مؤكد' ? 'تأكيد' : 'إلغاء'} الحجز بنجاح`,
    });
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
    toast({
      title: "تم بنجاح",
      description: "تم حذف الحجز بنجاح",
    });
  };

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
                        <p className="text-3xl font-bold">{activities.length}</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي الحجوزات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">{bookings.length}</p>
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
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="p-3 border rounded-lg">
                            <p className="font-medium">حجز رقم #{booking.id}</p>
                            <p className="text-sm text-gray-500">النشاط: {booking.activityName}</p>
                            <p className="text-sm text-gray-500">تاريخ الحجز: {booking.date}</p>
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
                      <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus size={16} className="mr-2" />
                            إضافة نشاط جديد
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>إضافة نشاط جديد</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="activityName">اسم النشاط</Label>
                              <Input
                                id="activityName"
                                value={newActivity.name}
                                onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                                placeholder="أدخل اسم النشاط"
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">التصنيف</Label>
                              <Select value={newActivity.category} onValueChange={(value) => setNewActivity({...newActivity, category: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر التصنيف" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="مغامرات">مغامرات</SelectItem>
                                  <SelectItem value="إقامة">إقامة</SelectItem>
                                  <SelectItem value="مطاعم">مطاعم</SelectItem>
                                  <SelectItem value="ترفيه">ترفيه</SelectItem>
                                  <SelectItem value="ثقافة">ثقافة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleAddActivity} className="w-full">
                              إضافة النشاط
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity) => (
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
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Trash2 size={16} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        سيتم حذف النشاط نهائياً ولا يمكن التراجع عن هذا الإجراء.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteActivity(activity.id)}>
                                        حذف
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
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
                        {bookings.map((booking) => (
                          <div key={booking.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">حجز رقم #{booking.id}</p>
                                <p className="text-sm text-gray-500">النشاط: {booking.activityName}</p>
                                <p className="text-sm text-gray-500">المستخدم: {booking.userName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">تاريخ الحجز: {booking.date}</p>
                                <div className="mt-2 flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'مؤكد')}
                                    disabled={booking.status === 'مؤكد'}
                                  >
                                    تأكيد
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleUpdateBookingStatus(booking.id, 'ملغي')}
                                    disabled={booking.status === 'ملغي'}
                                  >
                                    إلغاء
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="outline">
                                        <Trash2 size={16} />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          سيتم حذف الحجز نهائياً ولا يمكن التراجع عن هذا الإجراء.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)}>
                                          حذف
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
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
