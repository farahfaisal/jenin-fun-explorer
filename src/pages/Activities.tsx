import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Search, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data
const activities = [
  {
    id: 1,
    name: 'فندق فلسطين الدولي',
    category: 'hotels',
    location: 'وسط المدينة، فلسطين',
    description: 'فندق فاخر في وسط فلسطين، يقدم خدمات متميزة وإطلالات رائعة',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
    rating: 4.8,
    price: '100$'
  },
  {
    id: 2,
    name: 'شاليه الربيع',
    category: 'chalets',
    location: 'شمال فلسطين',
    description: 'شاليه هادئ محاط بالطبيعة الخلابة، مثالي للعائلات والاسترخاء',
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1080',
    rating: 4.6,
    price: '70$'
  },
  {
    id: 3,
    name: 'حديقة السلام',
    category: 'parks',
    location: 'شرق فلسطين',
    description: 'حديقة عامة واسعة مع مساحات خضراء وملاعب للأطفال ومناطق للشواء',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
    rating: 4.5,
    price: '5$'
  },
  {
    id: 4,
    name: 'نادي الرياضي',
    category: 'clubs',
    location: 'غرب فلسطين',
    description: 'نادي رياضي متكامل يضم صالة ألعاب رياضية وحمام سباحة وملاعب متعددة',
    image: 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&q=80&w=1080',
    rating: 4.7,
    price: '10$'
  },
  {
    id: 5,
    name: 'فندق الواحة',
    category: 'hotels',
    location: 'جنوب فلسطين',
    description: 'فندق عصري بخدمات متميزة ومطعم يقدم أشهى المأكولات المحلية والعالمية',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1080',
    rating: 4.4,
    price: '85$'
  },
  {
    id: 6,
    name: 'شاليه النخيل',
    category: 'chalets',
    location: 'أطراف فلسطين',
    description: 'شاليه فاخر مع مسبح خاص وإطلالات خلابة على المناظر الطبيعية المحيطة',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1080',
    rating: 4.9,
    price: '120$'
  },
];

const categories = [
  { id: 'hotels', name: 'الفنادق' },
  { id: 'chalets', name: 'الشاليهات' },
  { id: 'parks', name: 'الحدائق' },
  { id: 'clubs', name: 'النوادي' },
];

const Activities = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let results = activities;
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(activity => 
        activity.name.includes(searchQuery) || 
        activity.description.includes(searchQuery) ||
        activity.location.includes(searchQuery)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter(activity => selectedCategories.includes(activity.category));
    }
    
    setFilteredActivities(results);
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/50 py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">الأنشطة الترفيهية في فلسطين</h1>
          <p className="text-lg text-gray-600 mb-6">اكتشف مجموعة متنوعة من الأنشطة الترفيهية في فلسطين</p>
          
          {/* Search bar */}
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md p-2 max-w-2xl">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="ابحث عن اسم النشاط، المكان، أو الوصف..."
              className="w-full py-2 px-1 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="rounded-md bg-primary hover:bg-primary/90">
              بحث
            </Button>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter size={18} className="ml-2" />
              {isMobileFilterOpen ? 'إخفاء الفلترة' : 'إظهار الفلترة'}
            </Button>
          </div>
          
          {/* Filters */}
          <div 
            className={`md:w-1/4 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">الفئات</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="mr-3 text-gray-700 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSelectedCategories([])}
              >
                إعادة ضبط الفلترة
              </Button>
            </div>
          </div>
          
          {/* Results */}
          <div className="md:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">عرض {filteredActivities.length} نتيجة</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  الأعلى تقييمًا
                </Button>
                <Button variant="outline" size="sm">
                  الأحدث
                </Button>
              </div>
            </div>
            
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredActivities.map((activity) => (
                  <Link to={`/activity/${activity.id}`} key={activity.id} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative">
                        <img 
                          src={activity.image} 
                          alt={activity.name} 
                          className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 right-0 bg-primary text-white py-1 px-3 rounded-tl-lg">
                          {activity.rating}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {activity.name}
                        </h3>
                        <p className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="ml-1" />
                          {activity.location}
                        </p>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-accent font-semibold">
                            {activity.price} / اليوم
                          </span>
                          <span className="text-primary font-semibold text-sm">عرض التفاصيل</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-xl text-gray-600">لم يتم العثور على أنشطة مطابقة للبحث</p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategories([]);
                  }}
                >
                  إعادة ضبط البحث
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
