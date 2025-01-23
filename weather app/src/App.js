import React, { useState } from "react";
import './App.css';

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fakeWeatherData = {
    location: "New York",
    temperature: "22°C",
    description: "Sunny",
    humidity: "56%",
    windSpeed: "15 km/h",
  };

  const handleSearch = () => {
    // Simulating API call
    if (location.trim() !== "") {
      setWeatherData(fakeWeatherData);
    } else {
      alert("Please enter a location");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location}</h2>
          <p><strong>Temperature:</strong> {weatherData.temperature}</p>
          <p><strong>Description:</strong> {weatherData.description}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}</p>
          <p><strong>Wind Speed:</strong> {weatherData.windSpeed}</p>
        </div>
      )}
    </div>
  );
}

export default App;
