
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
  );
};

export default HeroSection;
