
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">جنين للترفيه</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">الرئيسية</Link>
          <Link to="/activities" className="text-gray-700 hover:text-primary transition-colors">الأنشطة</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">عن الموقع</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">اتصل بنا</Link>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
