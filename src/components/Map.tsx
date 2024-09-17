import { MapContainer, TileLayer,useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';
import { useState ,useEffect} from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  


interface MapProps {
  locations: Location[];
  currLocation :Location
}


const MapView: React.FC<{ currLocation: Location }> = ({ currLocation }) => {
    const map = useMap();
  
    useEffect(() => {
        if (currLocation) {
           
            map.flyTo([currLocation.lat, currLocation.lon], 10, {
              duration: 1.5, 
              easeLinearity: 0.25, 
            });
          }
          map.zoomControl.setPosition('bottomright'); 
    }, [currLocation, map]);

  
    return null;
  };

const Map: React.FC<MapProps> = ({ locations ,currLocation}) => {
  const defaultPosition: [number, number] = [52.52, 13.405]; // Default center position (Berlin)

  console.log(locations);

  return (
    <div className="map-container">
      <MapContainer center={defaultPosition}  zoom={10} style={{ height: '100%', width: '100%',margin:"0px"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker  key={location.id} position={[location.lat, location.lon]}>
            <Popup  >
            {location.imageUrls && location.imageUrls.length > 0 && (
                <div className=" relative ">
                  <Carousel>
                    <CarouselContent >
                      {location.imageUrls.map((url, index) => (
                        <CarouselItem key={index} className="w-full  max-h-[150px]">
                          <img
                            src={url}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-4 transform-none"  />
                    <CarouselNext className="absolute top-1/2 right-4 transform-none" />
                  </Carousel>
                </div>
              )}
              <h3 className='text-lg '>{location.name}</h3>
              <p >{location.description}</p>
              <a href={location.moreInfoUrl} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </Popup>
          </Marker>
        ))}

        <MapView currLocation={currLocation} />
      </MapContainer>
    </div>
  );
};

export default Map;
