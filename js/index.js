// NASA APIs
window.addEventListener("load", obtenerDatos);
var latit;
var longit;
const nasaApiKey = "wksdu5O40vOdQMOBN2dldBOLwQM0MtunRFgBkNmZ";
function obtenerDatos() {
  const rutaApod = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;
  fetch(rutaApod)
    .then((response) => response.json())
    .then((resultado) => mostrarDatos(resultado));
}
function mostrarDatos({ date, explanation, media_type, title, url }) {
  const titulo = document.querySelector("#titulo");
  titulo.innerHTML = title;
  /* const fecha = document.querySelector("#fecha");
  fecha.innerHTML = date; */
  const descripcion = document.querySelector("#descripcion");
  descripcion.innerHTML = explanation;
  const multimedia = document.querySelector("#multimedia");
  if (media_type == "video") {
    multimedia.innerHTML = `<iframe class="embed-responsive-item" src="${url}"></iframe>`;
  } else {
    multimedia.innerHTML = `<img src="${url}" class="img-fluid" alt="${url}">`;
  }
  //API traductor
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}

//const ubicacion = `https://ipgeolocation.abstractapi.com/v1/?api_key=38aaa03ac29847f5a549c23ee3032866`;
fetch(ubicacion)
  .then((ubi) => ubi.json())
  .then((resubi) => mostrarUbicacion(resubi));
function mostrarUbicacion({ country, city, latitude, longitude, ip_address }) {
  var mymap = L.map("mapid").setView([latitude, longitude], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmljdG9yYWx2YXJhZG8iLCJhIjoiY2t1enhuYmExN2g0bDJ3cTZzdXMwYXByNSJ9.O4SVvYeRAIchAbk_XqGFkQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoidmljdG9yYWx2YXJhZG8iLCJhIjoiY2t1enhuYmExN2g0bDJ3cTZzdXMwYXByNSJ9.O4SVvYeRAIchAbk_XqGFkQ",
    }
  ).addTo(mymap);
  var circle = L.circle([latitude, longitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(mymap);

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
}

(function () {
  var d = new Date().getDate();
  var m = document.querySelectorAll("#contain_moon div");
  var a = new XMLHttpRequest();
  var url =
    "https://www.icalendar37.net/lunar/api/?lang=es&month=" +
    (new Date().getMonth() + 1) +
    "&year=" +
    new Date().getFullYear() +
    "&size=100&lightColor=rgb(245,245,245)&shadeColor=rgb(26, 37, 48)&t&LDZ=" +
    new Date(new Date().getFullYear(), new Date().getMonth(), 1) / 1000 +
    "";
  m[1].style.height = "100px";
  a.onreadystatechange = function () {
    if (a.readyState == 4 && a.status == 200) {
      var b = JSON.parse(a.responseText);
      m[1].innerHTML = b.phase[d].svg;
      if (typeof moon_widget_loaded == "function") moon_widget_loaded(b);
      m[2].innerHTML = b.phase[d].npWidget;
      m[3].innerHTML = "Próxima luna llena<br>" + b.nextFullMoon;
    }
  };
  a.open("GET", url, true);
  a.send();
})();
