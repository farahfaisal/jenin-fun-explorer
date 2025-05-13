
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور.");
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoAccount = (role: string) => {
    if (role === 'admin') {
      setEmail("admin@example.com");
      setPassword("password123");
    } else if (role === 'owner') {
      setEmail("owner@example.com"); 
      setPassword("password123");
    } else {
      setEmail("user@example.com");
      setPassword("password123"); 
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>تسجيل الدخول</CardTitle>
            <CardDescription>أدخل بيانات حسابك للوصول إلى الموقع</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>خطأ</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="mt-6">
                <Alert className="bg-blue-50">
                  <Info className="h-4 w-4" />
                  <AlertTitle>حسابات تجريبية</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-3 mt-2">
                      <div>
                        <p className="text-sm font-semibold">حساب مدير النظام:</p>
                        <p className="text-xs">البريد: admin@example.com</p>
                        <p className="text-xs">كلمة المرور: password123</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1 h-7 text-xs" 
                          onClick={() => setDemoAccount('admin')}
                        >
                          استخدام هذا الحساب
                        </Button>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold">حساب صاحب النشاط:</p>
                        <p className="text-xs">البريد: owner@example.com</p>
                        <p className="text-xs">كلمة المرور: password123</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1 h-7 text-xs" 
                          onClick={() => setDemoAccount('owner')}
                        >
                          استخدام هذا الحساب
                        </Button>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold">حساب مستخدم عادي:</p>
                        <p className="text-xs">البريد: user@example.com</p>
                        <p className="text-xs">كلمة المرور: password123</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-1 h-7 text-xs" 
                          onClick={() => setDemoAccount('user')}
                        >
                          استخدام هذا الحساب
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
              <div className="text-center text-sm">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="text-primary hover:underline">
                  إنشاء حساب جديد
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
