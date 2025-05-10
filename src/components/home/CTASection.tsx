
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">هل تملك نشاطاً ترفيهياً في جنين؟</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          انضم إلينا وعرض نشاطك على موقعنا ليراه الآلاف من الزوار يومياً
        </p>
        <Button variant="secondary" size="lg" className="text-primary font-semibold">
          سجل نشاطك الآن
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
