// Seleciona o contêiner onde os parágrafos serão inseridos
let locationConteiner = document.getElementById('locationContainer');

// Função para criar um parágrafo e adicionar ao contêiner
function addLocationParagraph(text) {
    let p = document.createElement('p');
    p.textContent = text;

    if (text.startsWith("Latitude")) {
        p.innerHTML = `<span class="label">Latitude:</span> ${text.split(': ')[1]}`;
    } else if (text.startsWith("Longitude")) {
        p.innerHTML = `<span class="label">Longitude:</span> ${text.split(': ')[1]}`;
    }

    locationConteiner.appendChild(p);
}

// var map é undefined para que nao ocorra errode inicialização
var map;
console.log(map);

// Função pra pegar as coordenadas do usuário
function success(pos){
    // Limpa o conteúdo anterior
    locationContainer.innerHTML = '';

    // Cria parágrafos com as coordenadas
    addLocationParagraph(`Latitude: ${pos.coords.latitude.toFixed(6)}`);
    addLocationParagraph(`Longitude: ${pos.coords.longitude.toFixed(6)}`);
    // Condição logica para a visualização do map API - Leftlef 
    if (map === undefined) {
        map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('mapID').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    // Api Leftlef é gratuita, mas eles pedem que coloque a certificação deles.
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ponto localizador map
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Eu estou aqui!')
        .openPopup();
}

// Erro caso o usuário negar o acesso a sua localização
function error(err){
    console.log(err);
}

// função que além de pegar a localização, atualiza caso o usuário se deslocar. (watchPosition).
var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true, // Esse metodo faz com que a localização fique mais precisa, porém, consome mais bateria.
    timeout: 10000 // Esse metodo por padrao é inifity. Nesse exemplo depois de 5 segundos ele para de buscar a localização exata do usuário.
});

// função que pega a localização do usuário. (getCurrentPosition).
// navigator.geolocation.getCurrentPosition(success, error);

// Faz com que pare de monitorar a localição atual
//navigator.geolocation.clearWatch(watchID);

