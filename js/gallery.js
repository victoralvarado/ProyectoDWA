// NASA APIs
window.addEventListener("load", obtenerDatos);
const nasaApiKey = "wksdu5O40vOdQMOBN2dldBOLwQM0MtunRFgBkNmZ";
function obtenerDatos() {
  const rutaEpic = `https://api.nasa.gov/EPIC/api/natural?api_key=${nasaApiKey}`;
  fetch(rutaEpic)
    .then((responseEpic) => responseEpic.json())
    .then((resultadoEpic) => mostrarDatosEpic(resultadoEpic));
}

function mostrarDatosEpic(datos) {
  for (const key in datos) {
    if (Object.hasOwnProperty.call(datos, key)) {
      const element = datos[key];
      const cards = document.querySelector("#cards");
      let id = element.identifier;
      const year = id.substr(0, 4);
      const mes = id.substr(4, 2);
      const dia = id.substr(6, 2);
      cards.innerHTML += `<div class="col-lg-3">
    <div class="card">
        <img class="card-img-top" src="https://api.nasa.gov/EPIC/archive/natural/${year}/${mes}/${dia}/png/${element.image}.png?api_key=${nasaApiKey}" alt="">
        <p class="card-text text-center"><b>Coordenadas del centro</b></b> <br/>latitud:${element.centroid_coordinates.lat}<br/>longitud:${element.centroid_coordinates.lon}</p>
    </div>
</div>`;
    }
  }
}

//API GEO LOCALIZACION
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
