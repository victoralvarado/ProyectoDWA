const launches = "https://api.spacexdata.com/v5/launches";
fetch(launches)
  .then((reslaunches) => reslaunches.json())
  .then((resplaunches) => mostrarLaunches(resplaunches));

function mostrarLaunches(datos) {
  var pp = 10;
  const la = document.querySelector("#accordionLaunches");

  for (const key in datos.reverse()) {
    if (Object.hasOwnProperty.call(datos, key)) {
      const element = datos[key];
      la.innerHTML += `<div class="card">
  <div class="card-header text-center"
      style="background:radial-gradient(ellipse at bottom, #1b2735 0%, #191f24 100%);"
      id="heading${element.date_unix}${element.flight_number}">
      <h2 class="mb-0">
          <button class="btn" style="color: white;" type="button" data-toggle="collapse"
              data-target="#collapse${element.date_unix}${
        element.flight_number
      }" aria-expanded="false"
              aria-controls="collapse${element.date_unix}${
        element.flight_number
      }">
              ${element.name}
          </button>
      </h2>
  </div>

  <div id="collapse${element.date_unix}${
        element.flight_number
      }" class="collapse" aria-labelledby="heading${element.date_unix}${
        element.flight_number
      }"
      data-parent="#accordionLaunches">
      <div class="card-body text-center">
          <h1>${element.name}</h1>
          <h4>Launch number ${element.flight_number}</h4>
${
  element.links.patch.small != null
    ? `<img src="${element.links.patch.small}" width="200px" alt="${element.name}">`
    : ``
}
          <p><b>Local launch time: </b>${element.date_local}</p>
          ${
            element.success != null
              ? element.success == true
                ? `<p style="color:green;"><b>Successfull launch</b></p>`
                : `<p style="color:red;"><b>Failed launch</b></p>`
              : ``
          }
          ${
            element.details != null
              ? `<h5>Details</h5>
          <p>${element.details}</p>`
              : ``
          }
      </div>
  </div>
</div>`;
    }
  }
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}
//const ubicacion = `https://ipgeolocation.abstractapi.com/v1/?api_key=38aaa03ac29847f5a549c23ee3032866`;
fetch(ubicacion)
  .then((ubi) => ubi.json())
  .then((resubi) => mostrarUbicacion(resubi));
function mostrarUbicacion({ country, city, latitude, longitude, ip_address }) {
  console.log(ip_address);
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
