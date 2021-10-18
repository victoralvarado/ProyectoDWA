window.addEventListener("load", obtenerDatos);
function obtenerDatos() {
  const nasaApiKey = "wksdu5O40vOdQMOBN2dldBOLwQM0MtunRFgBkNmZ";
  const rutaApod = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;
  fetch(rutaApod)
    .then((response) => response.json())
    .then((resultado) => mostrarDatos(resultado));
}

function mostrarDatos({ date, explanation, media_type, title, url }) {
  const titulo = document.querySelector("#titulo");
  titulo.innerHTML = title;
  const fecha = document.querySelector("#fecha");
  fecha.innerHTML = date;
  const descripcion = document.querySelector("#descripcion");
  descripcion.innerHTML = explanation;
  const multimedia = document.querySelector("#multimedia");
  if (media_type == "video") {
    multimedia.innerHTML = `<iframe class="embed-responsive-item" src="${url}"></iframe>`;
  } else {
    multimedia.innerHTML = `<img src="${url}" class="img-fluid" alt="${url}">`;
  }
  Weglot.initialize({
    api_key: "wg_f7d7a876e5782125838261e75585fc673",
  });
}
