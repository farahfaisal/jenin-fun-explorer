
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section 
      className="relative bg-cover bg-center py-32" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=1080)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* إضافة شريط ألوان علم فلسطين */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="bg-black h-1/3 w-full"></div>
          <div className="bg-white h-1/3 w-full"></div>
          <div className="bg-accent h-1/3 w-full"></div>
          <div className="absolute left-0 h-full w-1/4 bg-primary"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
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
  );
};

export default HeroSection;
