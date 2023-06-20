import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/search/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/search/forecast/forecast";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setCurrentForecast] = useState(null);

  const handleSearchOnChange = (SearchData) => {
    const [lat, lon] = SearchData.value.split(" ");
    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: SearchData.label, ...weatherResponse });
        setCurrentForecast({ city: SearchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleSearchOnChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
