import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Flag } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section 
      className="relative bg-cover bg-center py-32" 
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1080)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Palestinian flag colors overlay with reduced opacity */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/4 bg-black opacity-40"></div>
        <div className="h-1/4 bg-white opacity-40"></div>
        <div className="h-1/4 bg-[#027C3F] opacity-40"></div>
        <div className="h-1/4 bg-[#E60026] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 animate-fade-in">
          استكشف الأنشطة الترفيهية في فلسطين
        </h1>
        <p className="text-xl text-black mb-8 max-w-2xl mx-auto animate-slide-up">
          دليلك الشامل للفنادق، الشاليهات، الحدائق والأنشطة الترفيهية في فلسطين
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