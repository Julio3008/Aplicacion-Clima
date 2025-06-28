const APP_ID = "4090239d69cdb3874de692fd18539299";

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setWeatherData(data))
    .catch((error) => {
      console.error("Error al obtener datos:", error);
      alert(
        "No se pudo obtener la información del clima. Verifica la consola para más detalles."
      );
    });
};

const setWeatherData = (data) => {
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: Math.floor(data.main.temp),
    date: getDate(),
  };

  Object.keys(weatherData).forEach((key) => {
    setTextContent(key, weatherData[key]);
  });

  cleanUp();
};

const cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");

  loader.style.display = "none";
  container.style.display = "flex";
};

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${date.getFullYear()}`;
};

const setTextContent = (element, text) => {
  document.getElementById(element).textContent = text;
};

const onLoad = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchData, (error) => {
      console.error("Error de geolocalización:", error);
      alert(
        "No se pudo acceder a tu ubicación. Por favor, permite el acceso a la ubicación."
      );
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
};
