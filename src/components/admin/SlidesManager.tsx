import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Video, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Slide {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

const SlidesManager = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    video_url: '',
    button_text: '',
    button_link: '',
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching slides:', error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل الشرائح",
          variant: "destructive",
        });
        return;
      }

      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSlide) {
        const { error } = await supabase
          .from('slides')
          .update(formData)
          .eq('id', editingSlide.id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث الشريحة بنجاح",
        });
      } else {
        const maxOrder = Math.max(...slides.map(s => s.order_index), 0);
        const { error } = await supabase
          .from('slides')
          .insert([{ ...formData, order_index: maxOrder + 1 }]);

        if (error) throw error;

        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء الشريحة بنجاح",
        });
      }

      fetchSlides();
      setIsDialogOpen(false);
      setEditingSlide(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        video_url: '',
        button_text: '',
        button_link: '',
        is_active: true,
      });
    } catch (error) {
      console.error('Error saving slide:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الشريحة",
        variant: "destructive",
      });
    }
  };

  const deleteSlide = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الشريحة؟')) return;

    try {
      const { error } = await supabase
        .from('slides')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف الشريحة بنجاح",
      });
      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الشريحة",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('slides')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      fetchSlides();
    } catch (error) {
      console.error('Error toggling slide status:', error);
    }
  };

  const moveSlide = async (id: string, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(s => s.id === id);
    if (slideIndex === -1) return;

    const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const slide = slides[slideIndex];
    const targetSlide = slides[targetIndex];

    try {
      const { error } = await supabase
        .from('slides')
        .update({ order_index: targetSlide.order_index })
        .eq('id', slide.id);

      if (error) throw error;

      const { error: error2 } = await supabase
        .from('slides')
        .update({ order_index: slide.order_index })
        .eq('id', targetSlide.id);

      if (error2) throw error2;

      fetchSlides();
    } catch (error) {
      console.error('Error moving slide:', error);
    }
  };

  const openEditDialog = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description,
      image_url: slide.image_url,
      video_url: slide.video_url || '',
      button_text: slide.button_text || '',
      button_link: slide.button_link || '',
      is_active: slide.is_active,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>إدارة شرائح الصفحة الرئيسية</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingSlide(null);
              setFormData({
                title: '',
                description: '',
                image_url: '',
                video_url: '',
                button_text: '',
                button_link: '',
                is_active: true,
              });
            }}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة شريحة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? 'تعديل الشريحة' : 'إضافة شريحة جديدة'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">العنوان</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <Tabs defaultValue="image" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    صورة خلفية
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    فيديو خلفية
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="image">
                  <div>
                    <Label htmlFor="image_url">رابط الصورة</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div>
                    <Label htmlFor="video_url">رابط الفيديو</Label>
                    <Input
                      id="video_url"
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="https://example.com/video.mp4"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      يدعم تنسيقات MP4 و WebM. الفيديو سيتم تشغيله تلقائياً وبدون صوت.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div>
                <Label htmlFor="button_text">نص الزر (اختياري)</Label>
                <Input
                  id="button_text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="button_link">رابط الزر (اختياري)</Label>
                <Input
                  id="button_link"
                  type="url"
                  value={formData.button_link}
                  onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">نشط</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  {editingSlide ? 'تحديث' : 'إضافة'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  {slide.video_url ? (
                    <video
                      src={slide.video_url}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <img
                      src={slide.image_url}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {slide.video_url && (
                    <div className="absolute top-1 right-1 bg-black/50 rounded p-1">
                      <Video className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{slide.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{slide.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={slide.is_active ? 'default' : 'secondary'}>
                      {slide.is_active ? 'نشط' : 'غير نشط'}
                    </Badge>
                    <span className="text-xs text-gray-500">الترتيب: {index + 1}</span>
                    {slide.video_url && (
                      <Badge variant="outline" className="text-xs">
                        فيديو
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveSlide(slide.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveSlide(slide.id, 'down')}
                  disabled={index === slides.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleActive(slide.id, slide.is_active)}
                >
                  {slide.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(slide)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteSlide(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              لا توجد شرائح بعد. أضف شريحة جديدة للبدء.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SlidesManager;
