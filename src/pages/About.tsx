
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">عن الموقع</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">مرحباً بكم في موقع جنين للترفيه</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              يُعد موقع جنين للترفيه المنصة الأولى المتخصصة في عرض وتجميع كافة الأنشطة الترفيهية في مدينة جنين الجميلة. 
              يهدف الموقع إلى مساعدة المواطنين والزوار على اكتشاف الأماكن الترفيهية المميزة في المدينة، من فنادق وشاليهات 
              وحدائق ونوادي وغيرها من المرافق الترفيهية.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">رؤيتنا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              نسعى إلى أن نكون الوجهة الرئيسية لكل من يبحث عن نشاط ترفيهي في مدينة جنين، من خلال توفير معلومات شاملة 
              ودقيقة عن جميع المرافق الترفيهية المتاحة، وتقديمها بطريقة سهلة وجذابة للمستخدمين.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">مهمتنا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              تسهيل عملية اكتشاف واختيار الأنشطة الترفيهية في جنين من خلال:
            </p>
            <ul className="list-disc pr-6 text-gray-700 leading-relaxed space-y-2 mb-6">
              <li>توفير منصة موحدة تجمع كافة الأنشطة الترفيهية في مدينة جنين</li>
              <li>عرض معلومات تفصيلية عن كل نشاط مع صور عالية الجودة وصور بتقنية 360 درجة</li>
              <li>تقديم تجربة مستخدم سهلة وممتعة تساعد على اتخاذ قرار مناسب</li>
              <li>دعم أصحاب الأنشطة الترفيهية من خلال توفير منصة للترويج لأنشطتهم</li>
              <li>المساهمة في تنشيط السياحة الداخلية وتعزيز الاقتصاد المحلي في جنين</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">فريق العمل</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              يضم فريق عمل موقع جنين للترفيه مجموعة من الشباب الطموح المهتم بتطوير مدينة جنين وإبراز مرافقها الترفيهية. 
              يعمل الفريق بجهد لتوفير أفضل تجربة للمستخدمين وتقديم خدمة متميزة لأصحاب الأنشطة الترفيهية.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">انضم إلينا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              إذا كنت تملك نشاطاً ترفيهياً في مدينة جنين، فإننا ندعوك للانضمام إلى منصتنا وعرض نشاطك للزوار. 
              كما نرحب بالتعاون مع كافة الجهات المهتمة بتطوير السياحة الداخلية في مدينة جنين.
            </p>
            
            <div className="text-center">
              <Link to="/contact" className="inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

import { Link } from "react-router-dom";
