
import { Hotel, Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategoryCard from './CategoryCard';

// Define category types
const categories = [
  {
    id: 'hotels',
    name: 'الفنادق',
    icon: <Hotel size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
    count: 8
  },
  {
    id: 'chalets',
    name: 'الشاليهات',
    icon: <Home size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1080',
    count: 12
  },
  {
    id: 'parks',
    name: 'الحدائق',
    icon: <MapPin size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
    count: 5
  },
  {
    id: 'clubs',
    name: 'النوادي',
    icon: <MapPin size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&q=80&w=1080',
    count: 7
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-secondary/50 relative">
      {/* شريط بألوان علم فلسطين */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="w-1/4 bg-primary"></div>
        <div className="w-1/4 bg-black"></div>
        <div className="w-1/4 bg-white"></div>
        <div className="w-1/4 bg-accent"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">استكشف حسب الفئة</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/activities">
            <Button variant="outline" className="font-semibold border-primary text-primary hover:bg-primary hover:text-white">
              عرض جميع الأنشطة
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
