
export interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

export interface OwnerProfile {
  id: number;
  name: string;
  image?: string;
  bio?: string;
  phone?: string;
  email?: string;
  activitiesCount: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number;
  maxParticipants: number;
  location: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  ownerId: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
  amenities: string[];
  requirements: string[];
  cancellationPolicy: string;
  // Legacy properties for backward compatibility
  name?: string;
  category?: string;
  categoryLabel?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  owner?: string;
  ownerProfile?: OwnerProfile;
  rating?: number;
  priceRange?: string;
  openingHours?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  establishedYear?: number;
  reviews?: Review[];
  panorama?: string;
}
