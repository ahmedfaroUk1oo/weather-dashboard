// src/api/weatherService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (input) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast.json?key=1d5462f48ebe44d08de145306233012&q=${input?input:"cairo"}&days=5`,{},{
      headers :{
        "Access-Control-Allow-Origin":"*"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
