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
import { Settings, Users, Calendar, Home, Plus, Trash2 } from 'lucide-react';
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

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState([
    { id: 1, name: 'مدير النظام', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'شركة الفنادق الدولية', email: 'owner@example.com', role: 'owner' },
    { id: 3, name: 'مستخدم عادي', email: 'user@example.com', role: 'user' }
  ]);

  const [activities, setActivities] = useState([
    { id: 1, name: 'رحلة سفاري في الصحراء', category: 'مغامرات', ownerId: 2 },
    { id: 2, name: 'فندق الواحة', category: 'إقامة', ownerId: 2 },
    { id: 3, name: 'مطعم البحر الأبيض', category: 'مطاعم', ownerId: 2 },
    { id: 4, name: 'حديقة الألعاب المائية', category: 'ترفيه', ownerId: 2 },
    { id: 5, name: 'متحف التراث الفلسطيني', category: 'ثقافة', ownerId: 2 }
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, activityName: 'رحلة سفاري في الصحراء', userName: 'مستخدم عادي', date: new Date().toLocaleDateString('ar-SA'), status: 'مؤكد' },
    { id: 2, activityName: 'فندق الواحة', userName: 'مستخدم عادي', date: new Date().toLocaleDateString('ar-SA'), status: 'قيد المراجعة' },
    { id: 3, activityName: 'مطعم البحر الأبيض', userName: 'مستخدم عادي', date: new Date().toLocaleDateString('ar-SA'), status: 'مؤكد' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [newActivity, setNewActivity] = useState({ name: '', category: '', ownerId: 2 });
  const [newBooking, setNewBooking] = useState({ activityName: '', userName: '', date: '', status: 'قيد المراجعة' });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'user' });
    setIsAddUserOpen(false);
    toast({
      title: "تم بنجاح",
      description: "تم إضافة المستخدم بنجاح",
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "تم بنجاح",
      description: "تم حذف المستخدم بنجاح",
    });
  };

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
      ...newActivity
    };
    setActivities([...activities, activity]);
    setNewActivity({ name: '', category: '', ownerId: 2 });
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

  const handleAddBooking = () => {
    if (!newBooking.activityName || !newBooking.userName || !newBooking.date) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const booking = {
      id: bookings.length + 1,
      ...newBooking
    };
    setBookings([...bookings, booking]);
    setNewBooking({ activityName: '', userName: '', date: '', status: 'قيد المراجعة' });
    setIsAddBookingOpen(false);
    toast({
      title: "تم بنجاح",
      description: "تم إضافة الحجز بنجاح",
    });
  };

  const handleDeleteBooking = (bookingId: number) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
    toast({
      title: "تم بنجاح",
      description: "تم حذف الحجز بنجاح",
    });
  };

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
                  <TabsTrigger value="activities">الأنشطة</TabsTrigger>
                  <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>إجمالي المستخدمين</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">{users.length}</p>
                      </CardContent>
                    </Card>
                    
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
                            <p className="text-sm text-gray-500">تاريخ الحجز: {booking.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>إدارة المستخدمين</CardTitle>
                      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus size={16} className="mr-2" />
                            إضافة مستخدم
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name">الاسم</Label>
                              <Input
                                id="name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                placeholder="أدخل اسم المستخدم"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">البريد الإلكتروني</Label>
                              <Input
                                id="email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                placeholder="أدخل البريد الإلكتروني"
                              />
                            </div>
                            <div>
                              <Label htmlFor="role">نوع المستخدم</Label>
                              <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر نوع المستخدم" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">مستخدم عادي</SelectItem>
                                  <SelectItem value="owner">صاحب نشاط</SelectItem>
                                  <SelectItem value="admin">مدير النظام</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleAddUser} className="w-full">
                              إضافة المستخدم
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {users.map((user) => (
                          <div key={user.id} className="p-3 border rounded-lg flex justify-between items-center">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                                {user.role === 'admin' ? 'مدير النظام' : 
                                 user.role === 'owner' ? 'صاحب نشاط' : 'مستخدم'}
                              </span>
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
                                      سيتم حذف المستخدم نهائياً ولا يمكن التراجع عن هذا الإجراء.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                                      حذف
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
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
                            إضافة نشاط
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
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">تعديل</Button>
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
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>إدارة الحجوزات</CardTitle>
                      <Dialog open={isAddBookingOpen} onOpenChange={setIsAddBookingOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus size={16} className="mr-2" />
                            إضافة حجز جديد
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>إضافة حجز جديد</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="activityName">اسم النشاط</Label>
                              <Select value={newBooking.activityName} onValueChange={(value) => setNewBooking({...newBooking, activityName: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر النشاط" />
                                </SelectTrigger>
                                <SelectContent>
                                  {activities.map((activity) => (
                                    <SelectItem key={activity.id} value={activity.name}>
                                      {activity.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="userName">اسم المستخدم</Label>
                              <Select value={newBooking.userName} onValueChange={(value) => setNewBooking({...newBooking, userName: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر المستخدم" />
                                </SelectTrigger>
                                <SelectContent>
                                  {users.filter(user => user.role === 'user').map((user) => (
                                    <SelectItem key={user.id} value={user.name}>
                                      {user.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="date">تاريخ الحجز</Label>
                              <Input
                                id="date"
                                type="date"
                                value={newBooking.date}
                                onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="status">حالة الحجز</Label>
                              <Select value={newBooking.status} onValueChange={(value) => setNewBooking({...newBooking, status: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر حالة الحجز" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                                  <SelectItem value="مؤكد">مؤكد</SelectItem>
                                  <SelectItem value="ملغي">ملغي</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button onClick={handleAddBooking} className="w-full">
                              إضافة الحجز
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                              <div className="flex items-center gap-2">
                                <div>
                                  <p className="text-sm text-gray-500">تاريخ الحجز: {booking.date}</p>
                                  <div className="mt-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      booking.status === 'مؤكد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {booking.status}
                                    </span>
                                  </div>
                                </div>
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
