
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigateToDashboard = () => {
    if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else if (user?.role === 'owner') {
      navigate('/owner-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">Xplore pal</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">الرئيسية</Link>
          <Link to="/activities" className="text-gray-700 hover:text-primary transition-colors">الأنشطة</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">عن الموقع</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">اتصل بنا</Link>
          
          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="font-bold">{user?.name}</span>
                <span className="text-gray-500 text-xs block">
                  {user?.role === 'admin' ? 'مدير النظام' : 
                   user?.role === 'owner' ? 'صاحب نشاط' : 
                   user?.role === 'user' ? 'مستخدم' : ''}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={navigateToDashboard}
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  لوحة التحكم
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  تسجيل خروج
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2"
              >
                <LogIn size={16} />
                تسجيل دخول
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/register')}
                className="flex items-center gap-2"
              >
                <User size={16} />
                إنشاء حساب
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="text-gray-700"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-4 py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              الرئيسية
            </Link>
            <Link 
              to="/activities" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              الأنشطة
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              عن الموقع
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              اتصل بنا
            </Link>
            
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <div className="text-sm">
                  <span className="font-bold">{user?.name}</span>
                  <span className="text-gray-500 text-xs block">
                    {user?.role === 'admin' ? 'مدير النظام' : 
                     user?.role === 'owner' ? 'صاحب نشاط' : 
                     user?.role === 'user' ? 'مستخدم' : ''}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    navigateToDashboard();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  لوحة التحكم
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  تسجيل خروج
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    navigate('/login');
                    toggleMenu();
                  }}
                  className="flex items-center gap-2"
                >
                  <LogIn size={16} />
                  تسجيل دخول
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => {
                    navigate('/register');
                    toggleMenu();
                  }}
                  className="flex items-center gap-2"
                >
                  <User size={16} />
                  إنشاء حساب
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
