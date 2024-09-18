import React, { useState, useEffect,useRef } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import { Location } from './types';
import './styles/App.css';
import { useDispatch } from 'react-redux';
import { close } from './store/slices/sideBarSlice';
import { trigger } from './store/slices/mapSlice';

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currLocation,setCurrLocation] = useState<Location>(locations[0]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // Fetch locations from the static JSON file
  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/locations.json');
      const data = await response.json();
      setLocations(data);
      setFilteredLocations(data);
    };

    fetchLocations();
  }, []);

  const handleSearch = (query:string) => {
    const filtered = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase()),
    );
   
    setFilteredLocations(filtered);
  };

  // Handle location selection to zoom in on the map (this logic would be passed down to the Map component)
  const handleLocationSelect = (lat: number, lon: number,location:Location) => {
    // You can implement the zoom logic in the map component using Leaflet's setView function
    console.log('Zoom to location:', lat, lon);
    setCurrLocation(location);
    dispatch(close());
    setFilteredLocations(locations);


  
    if (searchInputRef.current) {
        searchInputRef.current.value = ""; // Correctly clearing the input field
      }
      dispatch(trigger());
  };

  return (
    <div className="app">
      <Header />
      <Sidebar locations={filteredLocations} searchInputRef={searchInputRef}   onLocationSelect={handleLocationSelect} handleSearch={handleSearch}  />
      <Map locations={filteredLocations} currLocation={currLocation} />
    </div>
  );
};

export default App;
