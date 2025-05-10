
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
      {/* شريط بألوان علم فلسطين */}
      <div className="absolute top-0 left-0 right-0 h-2 flex">
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-accent"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">هل تملك نشاطاً ترفيهياً في جنين؟</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          انضم إلينا وعرض نشاطك على موقعنا ليراه الآلاف من الزوار يومياً
        </p>
        <Button variant="secondary" size="lg" className="text-primary font-semibold hover:bg-white hover:text-accent">
          سجل نشاطك الآن
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
