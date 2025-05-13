
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ActivityBookingCalendarProps {
  activityId: number;
  activityName: string;
  ownerName?: string;
}

export function ActivityBookingCalendar({ 
  activityId, 
  activityName,
  ownerName = ""
}: ActivityBookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const { toast } = useToast();

  // Get today's date for minimum selectable date
  const today = new Date();
  
  // Define maximum selectable date (3 months from today)
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);

  const handleBookingClick = () => {
    if (!selectedDate) {
      toast({
        title: "لم يتم اختيار تاريخ",
        description: "الرجاء اختيار تاريخ للحجز",
        variant: "destructive",
      });
      return;
    }
    setIsDialogOpen(true);
  };

  const handleBookingSubmit = () => {
    if (!visitorName || !visitorPhone) {
      toast({
        title: "معلومات غير مكتملة",
        description: "الرجاء إدخال الاسم ورقم الهاتف على الأقل",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the booking to the server
    // and notify the activity owner and admin
    
    // Create a booking object that would be sent to the backend
    const bookingData = {
      activityId,
      activityName,
      ownerName,
      date: format(selectedDate!, "yyyy-MM-dd"),
      visitorName,
      visitorPhone,
      visitorEmail,
      notes: bookingNotes,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    console.log("Booking created:", bookingData);

    // Show success notification
    toast({
      title: "تم تقديم طلب الحجز بنجاح",
      description: `تم إرسال طلب حجز ${activityName} بتاريخ ${format(selectedDate!, "yyyy/MM/dd")} إلى صاحب النشاط`,
    });

    // Reset the form and close dialog
    setSelectedDate(undefined);
    setVisitorName("");
    setVisitorPhone("");
    setVisitorEmail("");
    setBookingNotes("");
    setIsDialogOpen(false);
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
          onClick={handleBookingClick}
          disabled={!selectedDate}
        >
          تأكيد الحجز
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إكمال معلومات الحجز</DialogTitle>
            <DialogDescription>
              الرجاء إدخال معلوماتك لإتمام حجز {activityName} بتاريخ {selectedDate ? format(selectedDate, "yyyy/MM/dd") : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                placeholder="أدخل رقم هاتفك"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني (اختياري)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                placeholder="أي ملاحظات أو طلبات خاصة (اختياري)"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleBookingSubmit}>
              تأكيد الحجز
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
