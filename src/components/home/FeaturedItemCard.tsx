
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedItemCardProps {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
}

const FeaturedItemCard = ({ id, name, category, location, image, rating }: FeaturedItemCardProps) => {
  return (
    <Link to={`/activity/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-56 object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute bottom-0 right-0 bg-primary text-white py-1 px-3 rounded-tl-lg">
            {rating}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="ml-1" />
            {location}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-accent font-medium">
              {category === 'hotels' && 'فندق'}
              {category === 'chalets' && 'شاليه'}
              {category === 'parks' && 'حديقة'}
              {category === 'clubs' && 'نادي'}
            </span>
            <span className="text-primary font-semibold text-sm">عرض التفاصيل</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedItemCard;
