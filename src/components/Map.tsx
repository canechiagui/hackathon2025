import { MapContainer, TileLayer,useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../types';
import {  useEffect , useState} from 'react';
import CityCard from "./CityCard"
import { useDispatch, useSelector } from 'react-redux';
import { finishMoveToLocation } from '@/store/slices/mapSlice';


interface MapProps {
  locations: Location[];
  currLocation :Location
}


const MapView: React.FC<{ currLocation: Location }> = ({ currLocation }) => {
    const map = useMap();
    const dispatch = useDispatch();
    const mapMovements = useSelector((state: any) => state.map.isMoved);
   
   
  
    useEffect(() => {
        if (currLocation) {
         
            map.flyTo([currLocation.lat, currLocation.lon], 10, {
              duration: 1.5, 
              easeLinearity: 0.25, 
            });
          }
          map.zoomControl.setPosition('bottomright'); 
          dispatch(finishMoveToLocation());
    }, [currLocation, map,mapMovements]);

  
    return null;
  };

const Map: React.FC<MapProps> = ({ locations ,currLocation}) => {
  const defaultPosition: [number, number] = [52.52, 13.405]; // Default center position (Berlin)


  return (
    <div className="map-container">
      <MapContainer center={defaultPosition}  zoom={10} style={{ height: '100%', width: '100%',margin:"0px"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker  key={location.id} position={[location.lat, location.lon]}>
           <CityCard location = {location}/>
          </Marker>
        ))}

        <MapView currLocation={currLocation} />
      </MapContainer>
    </div>
  );
};

export default Map;
