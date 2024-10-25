import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weatherService';
import WeatherDetails from './WeatherDetails';
import { FaHistory } from 'react-icons/fa';
import WeatherSidebar from '../layout/sidebar/WeatherSideBar';
import Loader from './loader/Loader';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [weatherList, setWeatherList] = useState([]);
  const sidebarRef = useRef(null);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: () => fetchWeather(selectedCity),
    enabled: !!selectedCity,
    retry: 2,
    retryDelay: 1000,
    
  });

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('weatherList')) || [];
    setWeatherList(storedList);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSelectedCity(searchValue.trim());
      updateWeatherList(searchValue.trim());
      setSearchValue('');
    }
  };

  const updateWeatherList = (city) => {
    // Check if the city already exists in the weatherList
    if (!weatherList.includes(city)) {
      // If it doesn't exist, update the list
      const updatedList = [city, ...weatherList.filter(item => item !== city)].slice(0, 5);
      setWeatherList(updatedList);
      localStorage.setItem('weatherList', JSON.stringify(updatedList));
    }
  };

  const handleDelete = (city) => {
    const updatedList = weatherList.filter(item => item !== city);
    setWeatherList(updatedList);
    localStorage.setItem('weatherList', JSON.stringify(updatedList));
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <section className='bg-[#212529]'>
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border rounded mr-2 flex-grow"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
        <button 
          type="button" 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 w-[100px] bg-gray-500 flex justify-center items-center gap-4 text-white rounded ml-2"
        >
          <FaHistory />Recent
        </button>
      </form>

      {isLoading && <Loader />}
      {error && (
       <img src='/assets/errorFetch.png' alt='error fetching data' className='w-[50%] object-contain  m-auto  h-screen' />
      )}

      <WeatherSidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        weatherList={weatherList}
        onSearch={(city) => {
          setSelectedCity(city);
          setIsSidebarOpen(false);
        }}
        onDelete={handleDelete}
        />
    </div>
    </section>
    {!data && <p className=' text-center w-full'>Search For Weather</p>}
        {data && <WeatherDetails data={data} />}
        </>
  );
}
