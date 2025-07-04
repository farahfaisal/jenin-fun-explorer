
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Slide {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  order_index: number;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching slides:', error);
        return;
      }

      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  // Function to convert YouTube URL to embed URL with autoplay
  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;
    }
    return null;
  };

  // Function to check if URL is YouTube
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  if (isLoading) {
    return (
      <section className="relative h-96 bg-gray-200 animate-pulse">
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96"></div>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative bg-gradient-to-r from-primary to-primary/80 py-32">
        <div className="container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            مرحباً بكم في موقعنا
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            دليلك الشامل للأنشطة الترفيهية في فلسطين
          </p>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[600px] overflow-hidden">
      {currentSlideData.video_url ? (
        isYouTubeUrl(currentSlideData.video_url) ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getYouTubeEmbedUrl(currentSlideData.video_url) || ''}
              title="YouTube video background"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: '100%',
                height: '56.25vw', // 16:9 aspect ratio
                minHeight: '100%',
                minWidth: '177.77vh', // 16:9 aspect ratio
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentSlideData.video_url} type="video/mp4" />
            <source src={currentSlideData.video_url} type="video/webm" />
          </video>
        )
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentSlideData.image_url})`,
          }}
        />
      )}
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {currentSlideData.title}
          </h1>
          <p className="text-xl mb-8 max-w-2xl animate-slide-up">
            {currentSlideData.description}
          </p>
          
          {currentSlideData.button_text && (
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 text-lg"
              onClick={() => {
                if (currentSlideData.button_link) {
                  window.location.href = currentSlideData.button_link;
                }
              }}
            >
              {currentSlideData.button_text}
            </Button>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSlider;
