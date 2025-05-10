
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ActivityImageGalleryProps {
  images: string[];
  name: string;
  rating?: number;
}

export const ActivityImageGallery = ({ images, name, rating }: ActivityImageGalleryProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1 pl-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <img src={image} alt={name} className="w-full aspect-video object-cover rounded-md" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {rating !== undefined && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-md py-1 px-2">
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      )}
    </div>
  );
};
