//Variaveis
const apiKey = ""; // Esconder // Não mostramos api em github // prenvenção 

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

//elementos do html 
 const cityElementy = document.querySelector("#city");
 const tempElementy = document.querySelector("#temperature span");
 const descElementy = document.querySelector("#description");
 const weatherIconElementy = document.querySelector("#weather-icon");
 const humidityElementy = document.querySelector("#humidity span");
 const windElementy = document.querySelector("#wind span");
 
const weatherContainer = document.querySelector("#weather-data") // selecionando container
// Funções
const getWeatherData = async(city) => { //Function async pode demora um pouco para responder // porque ela lida com api's
 
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json();


   return data;
}

const showWeatherData = async (city) => { //Essa function aguarda o valor de pesquisa
    const data = await getWeatherData(city); 
     
    //Manibulando elementos
    cityElementy.innerText = data.name;  //Innertext = substituir o nome fixo por dados de busca
    tempElementy.innerText = parseInt(data.main.temp)
    descElementy.innerText = data.weather[0].description;
    weatherIconElementy.setAttribute(
        "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    )
    humidityElementy.innerText = `${data.main.humidity}%`
    windElementy.innerText = `${data.wind.speed}km/hr`

    weatherContainer.classList.remove("hide"); // remove ao inserir valor de pesquisa
}



//Eventos
searchBtn.addEventListener("click", (e) => { //event pesquisa ao click
    e.preventDefault();

    const city = cityInput.value; // Valor de pesquisa, ao click 

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Entrer") { // se usuario apertar entrer, quero que pesquise
        const city = e.target.value;

        showWeatherData(city);
    }
});

