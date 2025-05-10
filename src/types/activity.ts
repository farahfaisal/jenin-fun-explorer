
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
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  owner: string;
  ownerProfile?: OwnerProfile;
  location: string;
  description: string;
  rating: number;
  amenities: string[];
  priceRange: string;
  openingHours: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
  establishedYear: number;
  reviews: Review[];
  images: string[];
  panorama?: string;
}
