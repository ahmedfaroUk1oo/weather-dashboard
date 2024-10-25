import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdHistory } from 'react-icons/md';
import WeatherDetails from './WeatherDetails';
import { fetchWeather } from '../api/weatherService'; // Import the fetchWeather function
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [weatherList, setWeatherList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  // Updated useQuery hook for v5
  const { data, error, isLoading } = useQuery({
    queryKey: ['weather', selectedCity],
    queryFn: () => fetchWeather(selectedCity),
    enabled: !!selectedCity,
    staleTime: 60000,
    retry: false,
  });

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('weatherList')) || [];
    setWeatherList(storedList);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const updatedList = [searchValue, ...weatherList.slice(0, 4)];
      setWeatherList(updatedList);
      localStorage.setItem('weatherList', JSON.stringify(updatedList));
      setSelectedCity(searchValue); // Set selected city for fetching weather
      setSearchValue('');
    }
  };

  const handleHistoryClick = (city) => {
    setSelectedCity(city); // Set the city from history to fetch weather
  };

  return (
    <>
      <section className='bg-[#212529]'>
        <div className="py-6 container m-auto grid grid-cols-[80%_20%] gap-10 items-center">
          <div className="inputSearch">
            <form onSubmit={handleSubmit}>
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <CiSearch />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                  placeholder="Search City, Countries..."
                  required
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
              </div>
            </form>
          </div>
          <div className="history">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center gap-4 ">Recent Searched <MdHistory /></button>
            {/* Add your history list here */}
            <ul>
              {weatherList.map((city, index) => (
                <li key={index} className="flex justify-between items-center text-white py-2">
                  <span onClick={() => handleHistoryClick(city)} className="cursor-pointer hover:underline">{city}</span>
                  <button onClick={() => {
                    const updatedList = weatherList.filter((item) => item !== city);
                    setWeatherList(updatedList);
                    localStorage.setItem('weatherList', JSON.stringify(updatedList));
                  }} className="text-red-500">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <WeatherDetails data={data} error={error} isLoading={isLoading} />
    </>
  );
}
