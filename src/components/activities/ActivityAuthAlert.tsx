
import { Lock, LogIn } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

interface ActivityAuthAlertProps {
  onLoginClick: () => void;
}

export const ActivityAuthAlert = ({ onLoginClick }: ActivityAuthAlertProps) => {
  return (
    <Alert className="mt-8 border-primary/20">
      <Lock className="h-4 w-4" />
      <AlertTitle>محتوى مقيد</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>يجب تسجيل الدخول لعرض المعلومات التفصيلية لهذا النشاط.</p>
        <Button onClick={onLoginClick} className="w-full sm:w-auto">
          <LogIn className="ml-2" size={16} />
          تسجيل الدخول لعرض التفاصيل
        </Button>
      </AlertDescription>
    </Alert>
  );
};
