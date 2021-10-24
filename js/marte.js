//const ubicacion = `https://ipgeolocation.abstractapi.com/v1/?api_key=38aaa03ac29847f5a549c23ee3032866`;
fetch(ubicacion)
  .then((ubi) => ubi.json())
  .then((resubi) => mostrarUbicacion(resubi));
function mostrarUbicacion({ country, city, latitude, longitude, ip_address }) {
  const data = document.querySelector(".footerubicacion");
  data.innerHTML += `<p>Pais: ${country}, Ciudad: ${city}, latitud: ${latitude}, Longitud: ${longitude}, IP: ${ip_address}</p>`;
  const sol = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
  fetch(sol)
    .then((ressol) => ressol.json())
    .then((ressoldata) => mostrarSol(ressoldata));

  function mostrarSol({ results }) {
    var utcDatesunrise = results.sunrise;
    var utcDateSunset = results.sunset;
    var hora1 = new Date(utcDatesunrise);
    var hora2 = new Date(utcDateSunset);
    const sol = document.querySelector(".sol");
    sol.innerHTML += `<i class="fa fa-arrow-up" aria-hidden="true"></i> ${hora1.getHours()}:${hora1.getMinutes()} <img class="mb-3" src="public/images/sunrise.png" width="45px" alt="sol"> <i class="fa fa-arrow-down" aria-hidden="true"></i> ${hora2.getHours()}:${hora2.getMinutes()}`;
  }
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}
