
import { useAuth } from '@/contexts/AuthContext';

interface ActivityOwnerProps {
  ownerId: string;
}

const ActivityOwner = ({ ownerId }: ActivityOwnerProps) => {
  const { profile } = useAuth();
  
  // Simple placeholder - in a real app, you'd fetch owner data by ID
  return (
    <div className="text-sm text-gray-600">
      <span>صاحب النشاط: {ownerId}</span>
    </div>
  );
};

export default ActivityOwner;
