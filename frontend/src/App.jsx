import { useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) return;

    try {
      setError("");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/weather/${city}`
      );

      setWeather(response.data);
    } catch (error) {
      setError("City not found");
      setWeather(null);
    }
  };

  const condition = weather?.current?.weather?.[0]?.main;

  const bgClass =
    condition === "Rain"
      ? "bg-gradient-to-br from-gray-700 via-gray-800 to-black"
      : condition === "Snow"
      ? "bg-gradient-to-br from-cyan-200 via-blue-300 to-slate-400"
      : condition === "Clouds"
      ? "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700"
      : "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700";

  return (
    <div
      className={`min-h-screen ${bgClass} flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000`}
    >
      {/* SUN */}
      {condition === "Clear" && (
        <div className="sun-container">
          <div className="sun-core"></div>
        </div>
      )}

      {/* CLOUDS */}
      {condition === "Clouds" && (
        <>
          <div className="cloud" style={{ top: "5%" }}>☁️</div>
          <div className="cloud2" style={{ top: "20%" }}>☁️</div>
          <div className="cloud3" style={{ top: "35%" }}>☁️</div>
          <div className="cloud" style={{ top: "55%" }}>☁️</div>
          <div className="cloud2" style={{ top: "75%" }}>☁️</div>
        </>
      )}

      {/* SNOW */}
      {condition === "Snow" && (
        <>
          <div className="snow left-10">❄️</div>
          <div className="snow left-1/3">❄️</div>
          <div className="snow right-20">❄️</div>
        </>
      )}

      {/* WEATHER CARD */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 text-white relative z-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          SkyCast Weather
        </h1>

        {/* SEARCH */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
            className="flex-1 p-3 rounded-xl text-black outline-none"
          />

          <button
            onClick={getWeather}
            className="bg-white text-blue-600 p-3 rounded-xl"
          >
            <FaSearch />
          </button>
        </div>

        {error && (
          <p className="text-center text-red-200 mb-4">
            {error}
          </p>
        )}

        {weather && (
          <>
            <div className="text-center">

              {/* ICON */}
              <div className="text-7xl mb-4 flex justify-center">
                {condition === "Clear" && (
                  <FaSun className="text-yellow-300" />
                )}

                {condition === "Clouds" && (
                  <FaCloud className="text-gray-100" />
                )}

                {condition === "Rain" && (
                  <FaCloudRain className="text-blue-200" />
                )}

                {condition === "Snow" && (
                  <FaSnowflake className="text-white" />
                )}
              </div>

              {/* TEMP */}
              <h2 className="text-6xl font-bold">
                {Math.round(weather.current.main.temp)}°C
              </h2>

              <p className="text-3xl mt-2">
                {weather.current.name}
              </p>

              <p className="capitalize text-lg">
                {weather.current.weather[0].description}
              </p>

              {/* DETAILS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Humidity</p>
                  <h3 className="text-2xl font-bold">
                    {weather.current.main.humidity}%
                  </h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Wind</p>
                  <h3 className="text-2xl font-bold">
                    {weather.current.wind.speed} km/h
                  </h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Feels Like</p>
                  <h3 className="text-2xl font-bold">
                    {Math.round(weather.current.main.feels_like)}°C
                  </h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Pressure</p>
                  <h3 className="text-2xl font-bold">
                    {weather.current.main.pressure} hPa
                  </h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Visibility</p>
                  <h3 className="text-2xl font-bold">
                    {weather.current.visibility / 1000} km
                  </h3>
                </div>

                <div className="bg-white/10 p-4 rounded-xl">
                  <p>Condition</p>
                  <h3 className="text-xl font-bold">
                    {weather.current.weather[0].main}
                  </h3>
                </div>

              </div>
            </div>

            {/* FORECAST */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-center mb-4">
                5 Day Forecast
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {weather.forecast
                  .filter((_, index) => index % 8 === 0)
                  .slice(0, 5)
                  .map((day, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-xl p-4 text-center"
                    >
                      <p>
                        {new Date(day.dt_txt).toLocaleDateString(
                          "en-US",
                          { weekday: "short" }
                        )}
                      </p>

                      <h3 className="text-2xl font-bold">
                        {Math.round(day.main.temp)}°C
                      </h3>

                      <p className="capitalize text-sm">
                        {day.weather[0].description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;