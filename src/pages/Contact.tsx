
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "تم إرسال الرسالة",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">اتصل بنا</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8 h-full">
                <h2 className="text-2xl font-semibold mb-6">معلومات الاتصال</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">العنوان</h3>
                    <p className="text-gray-600">شارع الناصرة، مبنى التكنولوجيا، الطابق الثالث</p>
                    <p className="text-gray-600">جنين، فلسطين</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">رقم الهاتف</h3>
                    <a href="tel:+970591234567" className="text-primary hover:underline block">+970 59 123 4567</a>
                    <a href="tel:+970561234567" className="text-primary hover:underline block">+970 56 123 4567</a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">البريد الإلكتروني</h3>
                    <a href="mailto:info@jenin-activities.ps" className="text-primary hover:underline block">info@jenin-activities.ps</a>
                    <a href="mailto:support@jenin-activities.ps" className="text-primary hover:underline block">support@jenin-activities.ps</a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">ساعات العمل</h3>
                    <p className="text-gray-600">الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً</p>
                    <p className="text-gray-600">الجمعة - السبت: مغلق</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6">أرسل لنا رسالة</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">الاسم</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">رقم الهاتف</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">الموضوع</label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="أدخل موضوع الرسالة"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <label htmlFor="message" className="text-sm font-medium">الرسالة</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="أدخل رسالتك هنا"
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="mt-10 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4 pr-4">موقعنا</h2>
            <div className="h-80 w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13783.03820895618!2d35.28799603019395!3d32.45593484851036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c7706c8a2ae27%3A0x692741b798a32eb7!2sJenin!5e0!3m2!1sen!2s!4v1713553338234!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعنا على الخريطة"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
