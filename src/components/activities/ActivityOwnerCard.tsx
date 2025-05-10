
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface OwnerProfile {
  id: number;
  name: string;
  image?: string;
  bio?: string;
  activitiesCount?: number;
}

interface ActivityOwnerCardProps {
  owner: string;
  ownerProfile?: OwnerProfile;
}

export const ActivityOwnerCard = ({ owner, ownerProfile }: ActivityOwnerCardProps) => {
  return (
    <Card className="mt-8 border-primary/20">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={ownerProfile?.image} alt={owner} />
          <AvatarFallback>{owner?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{owner}</CardTitle>
          <CardDescription className="mt-1 text-sm">
            مالك النشاط • {ownerProfile?.activitiesCount} نشاط ترفيهي
          </CardDescription>
        </div>
        <div className="mr-auto">
          <Link to={`/owner/${ownerProfile?.id}`}>
            <Button variant="secondary" size="sm" className="gap-2">
              <Users size={16} />
              عرض الملف الشخصي
            </Button>
          </Link>
        </div>
      </CardHeader>
      {ownerProfile?.bio && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{ownerProfile?.bio}</p>
        </CardContent>
      )}
    </Card>
  );
};
