
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ActivityBookingCalendarProps {
  activityId: number;
  activityName: string;
}

export function ActivityBookingCalendar({ 
  activityId, 
  activityName 
}: ActivityBookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  // Get today's date for minimum selectable date
  const today = new Date();
  
  // Define maximum selectable date (3 months from today)
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);

  const handleBookingSubmit = () => {
    if (!selectedDate) {
      toast({
        title: "لم يتم اختيار تاريخ",
        description: "الرجاء اختيار تاريخ للحجز",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the booking to the server
    toast({
      title: "تم تقديم طلب الحجز بنجاح",
      description: `تم حجز ${activityName} بتاريخ ${format(selectedDate, "yyyy/MM/dd")}`,
    });

    // Reset the selected date
    setSelectedDate(undefined);
  };

  return (
    <div className="mt-6 bg-white rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-3">حجز موعد زيارة</h3>
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">اختر تاريخ الزيارة</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-right",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarCheck className="ml-2" />
                {selectedDate ? format(selectedDate, "yyyy/MM/dd") : "اختر تاريخ الزيارة"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  date < today || date > maxDate
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          className="w-full"
          onClick={handleBookingSubmit}
          disabled={!selectedDate}
        >
          تأكيد الحجز
        </Button>
      </div>
    </div>
  );
}
