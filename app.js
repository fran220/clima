const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', validarCampos)
});

function validarCampos(e){
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === "" || pais === ""){
        mostrarError("ingrese los datos requeridos");
        return;
    }

    obtenerClima(ciudad, pais);
}

function obtenerClima(ciudad, pais){
    const appId = `986401affecfa7d1a90fd89039293dbe`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado =>{
            limpiarHTML()
            if(resultado.cod === "404"){
                mostrarError("ciudad no encontrada");
            }else{
                mostrarResultados(resultado)
            }
        })
        .catch(err => console.log(err))
}

function mostrarResultados(obj){
    const {name, main: {temp,temp_max,temp_min}, weather} = obj;
    const temperatura = KelvinACelcius(temp);
    const tempMax = KelvinACelcius(temp_max);
    const tempMin = KelvinACelcius(temp_min);

    const card = document.createElement('div');
    const textCiudad = document.createElement('h2');
    const textTemp = document.createElement('p');
    const textTempMax = document.createElement('p');
    const textTempMin = document.createElement('p');

    card.classList.add('card');
    textCiudad.classList.add('ciudad');
    textCiudad.classList.add('text');
    textTemp.classList.add('text');
    textTemp.classList.add('temp');
    textTempMax.classList.add('text');
    textTempMin.classList.add('text');

    textCiudad.textContent = name;
    textTemp.textContent =`Temperatura: ${temperatura}°C`;
    textTempMax.textContent = `Temperatura maxima: ${tempMax}°C`;
    textTempMin.textContent = `Temperatura minima: ${tempMin}°C`;

    card.appendChild(textCiudad)
    card.appendChild(textTemp);
    card.appendChild(textTempMax);
    card.appendChild(textTempMin);

    resultado.appendChild(card);
}

function KelvinACelcius(tempK){
    const tempC = tempK - 273.15; 
    return parseInt(tempC);
}

function mostrarError(msj){
    console.log(msj);
    const divAlert = document.createElement('div');
    const mensaje = document.createElement('p');

    divAlert.classList.add('dangerMsj');
    mensaje.textContent = msj;


    divAlert.appendChild(mensaje);
    resultado.appendChild(divAlert);

    setTimeout(() => {
        resultado.removeChild(divAlert);
    }, 3000);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){
    resultado.innerHTML = `
        <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
        </div> 
    `;
}