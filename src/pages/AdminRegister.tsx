
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdminRegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminRegister = () => {
  const { register: registerUser, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AdminRegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: AdminRegisterFormData) => {
    setError("");
    setIsLoading(true);
    try {
      // Register as admin
      await registerUser(data.name, data.email, data.password, "admin");
      navigate("/admin-dashboard");
    } catch (error: any) {
      setError("فشل التسجيل. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>إنشاء حساب مدير النظام</CardTitle>
            <CardDescription>
              قم بإنشاء حساب مدير للوصول إلى لوحة تحكم النظام
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>خطأ</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input 
                  id="name" 
                  {...register("name", { 
                    required: "الاسم الكامل مطلوب"
                  })}
                  disabled={loading}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register("email", { 
                    required: "البريد الإلكتروني مطلوب", 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "بريد إلكتروني غير صالح"
                    }
                  })}
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...register("password", { 
                    required: "كلمة المرور مطلوبة",
                    minLength: {
                      value: 6,
                      message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف"
                    }
                  })}
                  disabled={loading}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  {...register("confirmPassword", { 
                    required: "تأكيد كلمة المرور مطلوب",
                    validate: value => value === password || "كلمات المرور غير متطابقة"
                  })}
                  disabled={loading}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>

              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>ملاحظة:</strong> سيتم إنشاء هذا الحساب كحساب مدير نظام مع صلاحيات كاملة لإدارة الموقع.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب مدير"}
              </Button>
              <div className="text-center text-sm">
                لديك حساب بالفعل؟{" "}
                <Link to="/login" className="text-primary hover:underline">
                  تسجيل الدخول
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminRegister;
