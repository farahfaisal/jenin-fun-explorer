
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  image: string;
  count: number;
}

const CategoryCard = ({ id, name, icon, image, count }: CategoryCardProps) => {
  return (
    <Link to={`/activities?category=${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
        <div 
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="p-6 text-center">
          <div className="inline-block text-primary">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-gray-600">{count} نشاط</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
