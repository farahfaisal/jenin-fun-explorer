
import FeaturedItemCard from './FeaturedItemCard';

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

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-white relative">
      {/* إضافة شريط جانبي بألوان علم فلسطين */}
      <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col">
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-white border-y border-gray-200"></div>
        <div className="flex-1 bg-accent"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">الأنشطة المميزة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <FeaturedItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
