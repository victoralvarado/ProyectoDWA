const obtenerIP = "https://api.ipgeolocation.io/getip";
fetch(obtenerIP)
  .then((res) => res.json())
  .then((resip) => mostrarIP(resip));

function mostrarIP({ ip }) {
  console.log(ip);
  const ubicacion = `http://ip-api.com/json/${ip}`;
  fetch(ubicacion)
    .then((ubi) => ubi.json())
    .then((resubi) => mostrarUbicacion(resubi));
  function mostrarUbicacion({ country, city, lat, lon, query }) {
    const data = document.querySelector(".footerubicacion");
    data.innerHTML += `<p>Pais: ${country}, Ciudad: ${city}, latitud: ${lat}, Longitud: ${lon}, IP: ${query}</p>`;
    const sol = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
    fetch(sol)
      .then((ressol) => ressol.json())
      .then((ressoldata) => mostrarSol(ressoldata));

    function mostrarSol({ results }) {
      var utcDatesunrise = results.sunrise;
      var utcDateSunset = results.sunset;
      var hora1 = new Date(utcDatesunrise);
      var hora2 = new Date(utcDateSunset);
      const sol = document.querySelector(".sol");
      sol.innerHTML += `<i class="fa fa-arrow-up" aria-hidden="true"></i> ${hora1.getHours()}:${hora1.getMinutes()} <img class="mb-3" src="public/image/sunrise.png" width="45px" alt="sol"> <i class="fa fa-arrow-down" aria-hidden="true"></i> ${hora2.getHours()}:${hora2.getMinutes()}`;
    }
  }
  //API traductor
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}
