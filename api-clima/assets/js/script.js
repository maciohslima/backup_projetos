const wrapper = document.querySelector('.wrapper'),
    inputPart = document.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('.input'),
    locationBtn = inputPart.querySelector('.button'),
    weatherPart = wrapper.querySelector('.weather-part'),
    wIcon = weatherPart.querySelector('img'),
    arrowBack = wrapper.querySelector('header i');

    let api;
    let chave = "118afcc6b5a1bfb5dbd11c24ef7f7d9f";

    inputField.addEventListener("keyup", e =>{
        if(e.key == "Enter" && inputField.value != ""){
            requestApi(inputField.value);
        }
    });

    locationBtn.addEventListener("click", () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            alert("Seu Browser não suporta esse recurso!!!");
        }
    });

    function requestApi(city) {

        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${chave}&lang=pt_br&units=metric`;
        fetchData();

    }

    function onSuccess(position){
        const{latitude, longitude} = position.coords;
        api = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${chave}`;
        fetchData();
    }

    function onError(error){
        infoTxt.innerText = error.message;
        infoTxt.classList.add("error");
    }

    function fetchData(){
        infoTxt.innerText = "Buscando detalhes do tempo...";
        infoTxt.classList.add("pending");
        fetch(api).then(res => res.json()).then(result => weatherDatalis(result)).catch(() =>{
           infoTxt.innerText = "Algo deu Errado...";
           infoTxt.classList.replace("pending ,error");
        });
    }

    function weatherDatalis(info) {
        if(info.cod == "404"){
            infoTxt.classList.replace("pending, error");
            infoTxt.innerText = `${inputField.value} não é uma cidade válida!`;
        }
    }
// const APIKey = "0";