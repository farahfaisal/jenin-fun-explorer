
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 mb-8">
            <h3 className="text-2xl font-bold mb-4">جنين للترفيه</h3>
            <p className="text-gray-300 mb-4">
              دليلك الشامل للأنشطة الترفيهية في مدينة جنين
            </p>
          </div>
          
          <div className="w-full md:w-1/3 mb-8">
            <h4 className="text-xl font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-gray-300 hover:text-white transition-colors">
                  الأنشطة
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  عن الموقع
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 mb-8">
            <h4 className="text-xl font-semibold mb-4">تواصل معنا</h4>
            <address className="not-italic text-gray-300">
              <p className="mb-2">جنين، فلسطين</p>
              <p className="mb-2">هاتف: 1234 567 970+</p>
              <p className="mb-2">البريد الإلكتروني: info@jenin-activities.ps</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} جنين للترفيه. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
