
import { MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityHeaderProps {
  name: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  categoryLabel: string;
  location: string;
}

export const ActivityHeader = ({ name, icon: Icon, categoryLabel, location }: ActivityHeaderProps) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="flex items-center text-gray-600 mt-2">
          {Icon ? <Icon size={20} className="ml-2" /> : <MapPin size={20} className="ml-2" />}
          <span>{categoryLabel}</span>
        </div>
        <div className="flex items-center text-gray-600 mt-1">
          <MapPin size={16} className="ml-1" />
          <span>{location}</span>
        </div>
      </div>
      <Button variant="outline">
        <Calendar size={16} className="ml-2" />
        <span>احجز الآن</span>
      </Button>
    </div>
  );
};
