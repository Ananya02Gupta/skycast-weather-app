const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/weather/:city
router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    // Current Weather API
    const currentWeatherResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // 5-Day Forecast API
    const forecastResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.status(200).json({
      current: currentWeatherResponse.data,
      forecast: forecastResponse.data.list,
    });
  } catch (error) {
    console.error(
      "Weather API Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Weather data not found",
    });
  }
});
 module.exports = router;