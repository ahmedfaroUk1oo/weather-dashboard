import React, { forwardRef, useEffect, useState } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';

const WeatherSidebar = forwardRef((props, ref) => {
  const [weatherList, setWeatherList] = useState([]);

  useEffect(() => {
    // Initial load from localStorage
    const storedList = JSON.parse(localStorage.getItem('weatherList')) || [];
    setWeatherList(storedList);

    // Set up event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'weatherList') {
        const updatedList = JSON.parse(e.newValue) || [];
        setWeatherList(updatedList);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Delete city from local storage and update state
  const handleDelete = (city) => {
    const updatedList = weatherList.filter(item => item !== city);
    localStorage.setItem('weatherList', JSON.stringify(updatedList));
    setWeatherList(updatedList);
  };

  return (
    <aside className="sidebar fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-4 shadow-lg z-50" ref={ref}>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Recent Searches</h2>
      <button 
        className="text-red-500 hover:text-red-700"
        onClick={() => props.setIsSideOpen(false)}
      >
        <FaTimes size={20} />
      </button>
    </div>
    <ul className="space-y-3">
      {weatherList.length > 0 ? (
        weatherList.map((city, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
            <span>{city}</span>
            <div>
              <button
                onClick={() => props.handleHistoryClick(city)}
                className="text-blue-500 hover:text-blue-700 mr-2"
                aria-label={`Search ${city}`}
              >
                <FaSearch size={18} />
              </button>
              <button
                onClick={() => handleDelete(city)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Delete ${city}`}
              >
                <FaTimes size={18} />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-400">No recent searches.</p>
      )}
    </ul>
  </aside>
  );
});

export default WeatherSidebar;
