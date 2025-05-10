
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>
              قم بتسجيل الدخول للوصول إلى المزيد من المعلومات والميزات
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
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
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
              </Button>
              <div className="text-center text-sm">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="text-primary hover:underline">
                  إنشاء حساب
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
