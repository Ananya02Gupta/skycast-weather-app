import Particles from "react-tsparticles";

function WeatherAnimation({ condition }) {
  if (condition === "Rain") {
    return (
      <Particles
        options={{
          particles: {
            number: { value: 150 },
            move: { speed: 10, direction: "bottom" },
            size: { value: 2 }
          }
        }}
      />
    );
  }

  if (condition === "Snow") {
    return (
      <Particles
        options={{
          particles: {
            number: { value: 100 },
            move: { speed: 2 },
            size: { value: 4 }
          }
        }}
      />
    );
  }

  return null;
}

export default WeatherAnimation;