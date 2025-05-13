import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ActivityBookingCalendar } from '@/components/activities/ActivityBookingCalendar';
import { useRef } from 'react';

interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

interface ActivityDetailTabsProps {
  description: string;
  amenities: string[];
  reviews: Review[];
  contactPhone: string;
  contactEmail: string;
  website: string;
  isOwner: boolean;
  isAdmin: boolean;
  activityId: number;
  activityName: string;
  ownerName?: string;
  bookingsTabRef?: React.RefObject<HTMLButtonElement>;
}

export const ActivityDetailTabs = ({
  description,
  amenities,
  reviews,
  contactPhone,
  contactEmail,
  website,
  isOwner,
  isAdmin,
  activityId,
  activityName,
  ownerName,
  bookingsTabRef,
}: ActivityDetailTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mt-8">
      <TabsList>
        <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
        <TabsTrigger value="amenities">المرافق</TabsTrigger>
        <TabsTrigger value="reviews">التقييمات</TabsTrigger>
        <TabsTrigger value="bookings" ref={bookingsTabRef}>الحجز</TabsTrigger>
        <TabsTrigger value="contact">معلومات الاتصال</TabsTrigger>
        {(isOwner || isAdmin) && <TabsTrigger value="admin">إدارة النشاط</TabsTrigger>}
      </TabsList>
      
      <TabsContent value="overview" className="mt-4 space-y-2">
        <p>{description}</p>
      </TabsContent>
      
      <TabsContent value="amenities" className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold mb-2">المرافق المتوفرة:</h3>
        <ul className="list-disc list-inside">
          {amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold mb-2">التقييمات:</h3>
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-md p-4 mb-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{review.user}</span>
              <span className="text-gray-600">{review.date}</span>
            </div>
            <div className="flex items-center mt-1">
              <span>التقييم: {review.rating}</span>
            </div>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </TabsContent>
      
      <TabsContent value="contact" className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold mb-2">معلومات الاتصال:</h3>
        <p>
          <strong>هاتف:</strong> {contactPhone}
        </p>
        <p>
          <strong>البريد الإلكتروني:</strong> {contactEmail}
        </p>
        <p>
          <strong>الموقع الإلكتروني:</strong>{' '}
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {website}
          </a>
        </p>
      </TabsContent>
      
      {/* Admin/Owner Panel */}
      {(isOwner || isAdmin) && (
        <TabsContent value="admin" className="mt-4 space-y-2">
          <h3 className="text-xl font-semibold mb-2">إدارة النشاط:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              تعديل معلومات النشاط
            </Button>
            <Button variant="outline" className="gap-2">
              إدارة الحجوزات
            </Button>
            <Button variant="outline" className="gap-2">
              إضافة صور جديدة
            </Button>
            <Button variant="outline" className="gap-2">
              عرض الإحصائيات
            </Button>
          </div>
        </TabsContent>
      )}
      
      <TabsContent value="bookings" className="mt-4">
        <ActivityBookingCalendar 
          activityId={activityId} 
          activityName={activityName} 
          ownerName={ownerName}
        />
      </TabsContent>
    </Tabs>
  );
};
