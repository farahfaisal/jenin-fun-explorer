
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Hotel, Park, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

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
    icon: <Park size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
    count: 5
  },
  {
    id: 'clubs',
    name: 'النوادي',
    icon: <Park size={24} className="mb-2" />,
    image: 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?auto=format&fit=crop&q=80&w=1080',
    count: 7
  },
];

// Featured activities
const featured = [
  {
    id: 1,
    name: 'فندق جنين الدولي',
    category: 'hotels',
    location: 'وسط المدينة، جنين',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1080',
    rating: 4.8
  },
  {
    id: 2,
    name: 'شاليه الربيع',
    category: 'chalets',
    location: 'شمال جنين',
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&q=80&w=1080',
    rating: 4.6
  },
  {
    id: 3,
    name: 'حديقة السلام',
    category: 'parks',
    location: 'شرق جنين',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1080',
    rating: 4.5
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-32" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=1080)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            استكشف الأنشطة الترفيهية في جنين
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto animate-slide-up">
            دليلك الشامل للفنادق، الشاليهات، الحدائق والأنشطة الترفيهية في مدينة جنين
          </p>
          
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg animate-slide-up">
            <div className="flex items-center p-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="ابحث عن أنشطة، فنادق، أماكن..."
                className="w-full py-2 px-1 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="rounded-md bg-primary hover:bg-primary/90">
                بحث
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">استكشف حسب الفئة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                to={`/activities?category=${category.id}`} 
                key={category.id} 
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                  <div 
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                  <div className="p-6 text-center">
                    <div className="inline-block text-primary">{category.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.count} نشاط</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/activities">
              <Button variant="outline" className="font-semibold">
                عرض جميع الأنشطة
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">الأنشطة المميزة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((item) => (
              <Link 
                to={`/activity/${item.id}`} 
                key={item.id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-56 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary text-white py-1 px-3 rounded-tl-lg">
                      {item.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="ml-1" />
                      {item.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-accent font-medium">
                        {item.category === 'hotels' && 'فندق'}
                        {item.category === 'chalets' && 'شاليه'}
                        {item.category === 'parks' && 'حديقة'}
                        {item.category === 'clubs' && 'نادي'}
                      </span>
                      <span className="text-primary font-semibold text-sm">عرض التفاصيل</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">هل تملك نشاطاً ترفيهياً في جنين؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلينا وعرض نشاطك على موقعنا ليراه الآلاف من الزوار يومياً
          </p>
          <Button variant="secondary" size="lg" className="text-primary font-semibold">
            سجل نشاطك الآن
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
