
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">عن الموقع</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">مرحباً بكم في موقع فلسطين للترفيه</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              يُعد موقع فلسطين للترفيه المنصة الأولى المتخصصة في عرض وتجميع كافة الأنشطة الترفيهية في فلسطين الجميلة. 
              يهدف الموقع إلى مساعدة المواطنين والزوار على اكتشاف الأماكن الترفيهية المميزة في البلد، من فنادق وشاليهات 
              وحدائق ونوادي وغيرها من المرافق الترفيهية.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">رؤيتنا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              نسعى إلى أن نكون الوجهة الرئيسية لكل من يبحث عن نشاط ترفيهي في فلسطين، من خلال توفير معلومات شاملة 
              ودقيقة عن جميع المرافق الترفيهية المتاحة، وتقديمها بطريقة سهلة وجذابة للمستخدمين.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">مهمتنا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              تسهيل عملية اكتشاف واختيار الأنشطة الترفيهية في فلسطين من خلال:
            </p>
            <ul className="list-disc pr-6 text-gray-700 leading-relaxed space-y-2 mb-6">
              <li>توفير منصة موحدة تجمع كافة الأنشطة الترفيهية في فلسطين</li>
              <li>عرض معلومات تفصيلية عن كل نشاط مع صور عالية الجودة وصور بتقنية 360 درجة</li>
              <li>تقديم تجربة مستخدم سهلة وممتعة تساعد على اتخاذ قرار مناسب</li>
              <li>دعم أصحاب الأنشطة الترفيهية من خلال توفير منصة للترويج لأنشطتهم</li>
              <li>المساهمة في تنشيط السياحة الداخلية وتعزيز الاقتصاد المحلي في فلسطين</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">فريق العمل</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              يضم فريق عمل موقع فلسطين للترفيه مجموعة من الشباب الطموح المهتم بتطوير فلسطين وإبراز مرافقها الترفيهية. 
              يعمل الفريق بجهد لتوفير أفضل تجربة للمستخدمين وتقديم خدمة متميزة لأصحاب الأنشطة الترفيهية.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">انضم إلينا</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              إذا كنت تملك نشاطاً ترفيهياً في فلسطين، فإننا ندعوك للانضمام إلى منصتنا وعرض نشاطك للزوار. 
              كما نرحب بالتعاون مع كافة الجهات المهتمة بتطوير السياحة الداخلية في فلسطين.
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
