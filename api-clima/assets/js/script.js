const wrapper = document.querySelector('.wrapper'),
    inputPart = document.querySelector('.input-part'),
    infoTxt = inputPart.querySelector('.info-txt'),
    inputField = inputPart.querySelector('.input'),
    locationBtn = inputPart.querySelector('.button'),
    weatherPart = wrapper.querySelector('.weather-part'),
    wIcon = weatherPart.querySelector('img'),
    arrowBack = wrapper.querySelector('header i');

    let api;
    // let chave = "118afcc6b5a1bfb5dbd11c24ef7f7d9f";

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

        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=118afcc6b5a1bfb5dbd11c24ef7f7d9f&lang=pt_br&units=metric`;
        fetchData();

    }

    function onSuccess(position){
        const{latitude, longitude} = position.coords;
        api = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=$118afcc6b5a1bfb5dbd11c24ef7f7d9f`;
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
        } else {
            const city = info.name;
            const country = info.sys.country;
            const { description, id } = info.weather[0];
            const { temp, feels_like, humidity } = info.main;

            if (id == 800) {
                wIcon.src = "icons/clear.svg";
            } else if (id >= 200 && id <= 232) {
                wIcon.src = "icons/storm.svg";
            } else if (id >= 600 && id <= 781) {
                wIcon.src = "icons/snow.svg";
            } else if (id >= 701 && id <= 781) {
                wIcon.src = "icons/haze.svg";
            } else if (id >= 801 && id <= 804) {
                wIcon.src = "icons/cloud.svg";
            } else if ((id >= 500 && id <= 531) || (id >= 301 && id <= 321)){
                wIcon.src = "icons/rain.svg";
            }

            weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
            weatherPart.querySelector(". weather").innerText = description;
            weatherPart.querySelector(".location span") = `${city} , ${country}`;
            weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
            weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
            infoTxt.classList.remove("pending", "error");
            infoTxt.innerText = "";
            inputField.value = "";
            wrapper.classList.add("active");
        }
    }

    arrowBack.addEventListener('click', () =>{
        wrapper.classList.remove("active");
    })
// const APIKey = "0";