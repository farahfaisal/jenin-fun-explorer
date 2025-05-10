
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, selectedRole);
      navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>إنشاء حساب جديد</CardTitle>
            <CardDescription>
              قم بإنشاء حساب للوصول إلى كافة ميزات الموقع
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input 
                  id="name" 
                  {...register("name", { 
                    required: "الاسم الكامل مطلوب"
                  })}
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
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">نوع الحساب</Label>
                <Select 
                  value={selectedRole} 
                  onValueChange={(value: UserRole) => setSelectedRole(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">مستخدم عادي</SelectItem>
                    <SelectItem value="owner">صاحب نشاط ترفيهي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
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

export default Register;
