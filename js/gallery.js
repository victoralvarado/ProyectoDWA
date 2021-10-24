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
      cards.innerHTML += `<div class="col-lg-3 mx-auto">
    <div class="card">
        <img class="card-img-top" src="https://api.nasa.gov/EPIC/archive/natural/${year}/${mes}/${dia}/png/${element.image}.png?api_key=${nasaApiKey}" alt="">
        <p class="card-text text-center"><b>Coordenadas del centro</b></b> <br/>latitud:${element.centroid_coordinates.lat}<br/>longitud:${element.centroid_coordinates.lon}</p>
    </div>
</div>`;
    }
  }
}

//API GEO LOCALIZACION
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
  //API traductor
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}
