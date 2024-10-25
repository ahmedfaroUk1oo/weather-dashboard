// src/api/weatherService.js
import axiosInstance from './axiosInstance';


export const fetchWeather = async (input) => {
  const response = await axiosInstance.get(`/forecast.json`, {
    params: {
      key: '1d5462f48ebe44d08de145306233012',
      q: input || 'cairo',
      days: 5,
    },
  });
  return response.data;

};
