let cargarDatos = () => {
  //alert("Alerta cargando datos");

  let response = fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");

      let escritores = xml.getElementsByTagName("escritor");

      for (let escritor of escritores) {
        let id = escritor.getElementsByTagName("id")[0].textContent;
        let nombre = escritor.getElementsByTagName("nombre")[0].textContent;

        let opt = `<option value = "${id}">${nombre}</option>`;

        document.querySelector("div.input-group > select").innerHTML += opt;
      }
    })
    .catch(console.log(error));
};

let cambiarFrase = (select) => {
  let url = "https://dataserverdaw.herokuapp.com/escritores/frases";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {

      let frases = data["frases"];

      let escritor_id = select.value;

      let escritor_nombre = select.selectedOptions[0].textContent;

      let div_frases = document.getElementById("frases");

      div_frases.innerHTML = "";

      for (let frase of frases) {

        if (frase["id_autor"] == escritor_id) {
          let plantilla = `<div class="col-lg-3">
                    <div class="test-inner ">
                        <div class="test-author-thumb d-flex">
                            <div class="test-author-info">
                                <h4>${escritor_nombre}</h4>                                            
                            </div>
                        </div>
                        <span>${frase["texto"]}</span>
                        <i class="fa fa-quote-right"></i>
                    </div>
                </div>`;

          div_frases.innerHTML += plantilla;
        }
      }
    })
    .catch(console.error);
};

document.addEventListener("DOMContentLoaded", (event) => {
  cargarDatos(this);
});

document
  .querySelector("div.input-group > select")
  .addEventListener("change", (event) => cambiarFrase(event.currentTarget));
