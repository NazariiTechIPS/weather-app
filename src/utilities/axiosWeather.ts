import axios from 'axios';

const axiosWeather = axios.create({
    baseURL: 'https://api.openweathermap.org',
});

axiosWeather.interceptors.request.use((config) => {
    config.params = {...config.params,appid:import.meta.env.VITE_API_KEY};

    return config;
});

export default axiosWeather;