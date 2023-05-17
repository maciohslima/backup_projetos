let chave = '118afcc6b5a1bfb5dbd11c24ef7f7d9f';

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name + ", " + dados.sys.country;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "ºC";
    document.querySelector(".descricao").innerHTML = dados.weather[0].description;
    // document.querySelector(".icone").src = "https://openweathermap.org/img/wn" + dados.weather[0].icon + ".png";

    document.querySelector(".umidade").innerHTML = `<i class="fa-solid fa-water"></i> ${dados.main.humidity}%`;
    document.querySelector(".vento").innerHTML = `<i class="fa-solid fa-wind"></i> ${parseInt(dados.wind.speed)} Km/h`;
    const icone = document.querySelector(".icone"); 

    switch (dados.weather[0].main) {
        case 'Clear':
            icone.scr = './assets/img/clear.png';
            break;

        case 'Rain':
            icone.src = './assets/img/rain.png';
            break;
        
        case 'Clouds':
            icone.src = './assets/img/cloud.png';
            break;
        
        case 'Snow':
            icone.src = './assets/img/snow.png';
            break;
        
        case 'Haze':
            icone.src = './assets/img/mist.png';
            break;

        default:
            icone.src = '';
    }
}

async function buscarCidade(cidade) {
    // let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    // cidade +
    // "&appid=" +
    // chave + 
    // "&lang=pt_br" +
    // "&units=metric"
    // )
    // .then(resposta => resposta.json());

    let dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`)
    .then(resposta => resposta.json());

    colocarNaTela(dados);
}

function btnClick() {
    let cidade = document.querySelector(".input-cidade").value;

    buscarCidade(cidade);
}