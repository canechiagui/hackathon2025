import React from 'react';
import { Popup,useMap } from 'react-leaflet';
import {Location} from "../types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 

interface CityCardProps {
  location: Location; 
}

const CityCard: React.FC<CityCardProps> = ({ location }) => {


  return (
    <Popup>
      {location.imageUrls && location.imageUrls.length > 0 && (
        <div className="relative">
          <Carousel>
            <CarouselContent>
              {location.imageUrls.map((url, index) => (
                <CarouselItem key={index} className="w-full max-h-[150px]">
                  <img
                    src={url}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 transform-none" />
            <CarouselNext className="absolute top-1/2 right-4 transform-none" />
          </Carousel>
        </div>
      )}
      <h3 className='text-lg'>{location.name}</h3>
      <p>{location.description}</p>
      <a href={location.moreInfoUrl} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </Popup>
  );
};

export default CityCard;
