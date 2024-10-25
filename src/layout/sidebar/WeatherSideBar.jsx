import React, { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const WeatherSidebar = forwardRef(({ isOpen, onClose, weatherList, onSearch, onDelete }, ref) => {
  return (
    <aside 
      ref={ref}
      className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-white">
        <FaTimes size={24} />
      </button>
      <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
      <ul>
        {weatherList.map((city, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <button onClick={() => onSearch(city)} className="text-blue-300 hover:text-blue-100">
              {city}
            </button>
            <button onClick={() => onDelete(city)} className="text-red-300 hover:text-red-100">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});

export default WeatherSidebar;