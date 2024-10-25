import React from 'react';
import { WiUmbrella, WiStrongWind, WiDirectionRight, WiHumidity, WiThermometer } from 'react-icons/wi';
import Loader from './loader/Loader';
// import axiosInstance from '../api/axiosInstance';
// import { useQuery } from '@tanstack/react-query';

// const fetchWeather = async (location) => {
//     const { data } = await axiosInstance.get(`/forecast.json`, {
//       params: {
//         key: '1d5462f48ebe44d08de145306233012',
//         q: location,
//         days: 5,
//       },
//     });
//     return data;
//   };
  


const WeatherCard = ({ day, date, location, temp, icon, condition, details, roundedClass }) => (
  <div className={`md:w-1/3 p-0 ${roundedClass} bg-gray-800`}>
    <div className={`p-2 ${location ? 'flex justify-between items-center' : 'text-center'} text-white bg-gray-700 ${roundedClass ? 'rounded-t-2xl' : ''}`}>
      <p className="m-0">{day}</p>
      {date && <p className="m-0">{date}</p>}
    </div>
    <div className="temp-sec text-center px-2 py-3">
      {location && <p className="text-white">{location}</p>}
      <h3 className="text-white font-bold text-xl">
        {temp} <sup>o</sup>C
        {icon && <img src={icon} className="w-1/5 inline mx-auto" alt="weather icon" />}
      </h3>
      {condition && <p className="py-3 px-2 text-yellow-400">{condition}</p>}
      {details && (
        <div className="other-details p-2 flex justify-between flex-wrap items-center">
          {details.map((detail, index) => (
            <p key={index} className="m-0 text-white flex items-center">
              {detail.icon}
              <span className="ml-2">{detail.text}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default function WeatherDetails({ data, error, isLoading }) {
  if (isLoading) return <Loader />;
  if (error) return <img src='/assets/errorFetch.png' alt='Error fetching weather data' className='h-auto w-1/2 m-auto' />;
  if (!data) return null;

  const { current, forecast, location } = data;

  const currentWeather = {
    day: 'Current',
    location: `${location.name}, ${location.country}`,
    temp: current.temp_c,
    icon: current.condition.icon,
    condition: current.condition.text,
    details: [
      { icon: <WiUmbrella size={20} />, text: `${current.precip_mm}mm` },
      { icon: <WiStrongWind size={20} />, text: `${current.wind_kph}km/h` },
      { icon: <WiDirectionRight size={20} />, text: current.wind_dir },
      { icon: <WiHumidity size={20} />, text: `${current.humidity}%` },
      { icon: <WiThermometer size={20} />, text: `Feels like ${current.feelslike_c}°C` },
    ],
    roundedClass: 'rounded-2xl',
  };

  const forecastData = forecast.forecastday.map((day, index) => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
    date: day.date,
    temp: day.day.avgtemp_c,
    icon: day.day.condition.icon,
    condition: day.day.condition.text,
    details: [
      { icon: <WiUmbrella size={20} />, text: `${day.day.totalprecip_mm}mm` },
      { icon: <WiStrongWind size={20} />, text: `${day.day.maxwind_kph}km/h` },
    ],
    roundedClass: index === forecast.forecastday.length - 1 ? 'rounded-2xl' : '',
  }));

  const weatherData = [currentWeather, ...forecastData];

  return (
    <section
      id="weather"
      className="py-5 bg-center bg-cover min-h-screen flex flex-col justify-center"
      style={{ backgroundImage: "url('/assets/benjamin-voros-phIFdC6lA4E-unsplash.jpg')" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {weatherData.map((weather, index) => (
            <WeatherCard key={index} {...weather} />
          ))}
        </div>
      </div>
    </section>
  );
}
