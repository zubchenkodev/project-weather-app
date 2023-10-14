const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=6a63a086bdc54f0033dfd728a6c72ca4';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=6a63a086bdc54f0033dfd728a6c72ca4';
const weatherApp = document.querySelector('.weather-app');
const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

const convertTime = (unix) => {
    const date = new Date(unix*1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`
}

const getWeekDay = () => {
    const date = new Date();
    const weekDay = date.getDay();
    return weekDay;
}

const getDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${months[month]} ${day}, ${year}`
}

const formateTemperature = (temp) => {
    const rounded = Math.round(temp * 10) / 10;
    const fixed = rounded.toFixed(1);
    return `${fixed}°C`
}

const createTitle = (weather, city) => {
    let title;
    switch(weather){
        case 'Rain':
        title = `Don’t forget your umbrella. It’s wet in ${city} today.`
        break;
        case 'Clear':
        title = `Get your sunnies on. ${city} is looking rather great today.`
        break;
        case 'Clouds':
        title = `Light a fire and get cosy. ${city} is looking grey today.`
        break;
        default:
        title = `There is no bad weather, there are bad clothes. Enjoy your day in beautiful ${city}.`
        break;
    }
    return title;
}


const setStyle = (weather) => {
    let appStyle = {};
    switch(weather){
        case 'Rain':
        appStyle = {'backgroundColor' : '#BDE8FA', 'color' : '#164A68', 'icon' : 'umbrella'}
        break;
        case 'Clear':
        appStyle = {'backgroundColor' : '#F7E9B9', 'color' : '#2A5510', 'icon' : 'sunglasses'}
        break;
        case 'Clouds':
        appStyle = {'backgroundColor' : '#F4F7F8', 'color' : '#F47775', 'icon' : 'cloud'}
        break;
        default:
        appStyle = {'backgroundColor' : '#F7E9B9', 'color' : '#2A5510', 'icon' : 'cloud'}
        break;
    }
    return appStyle;
}



const renderApp = (data, data2) => {
    weatherApp.style.backgroundColor = setStyle(data.weather[0].main).backgroundColor;
    weatherApp.style.color = setStyle(data.weather[0].main).color;
    let weekDay = getWeekDay();
    const appContent = `
    <div class="weather-app__container">
    <div class="weather-app__info">
        <b>${getDate()} ${(week[weekDay - 1]).toUpperCase()}</b>
        <p>${data.weather[0].main}| ${formateTemperature(data.main.temp)}</p>
        <p>sunrise ${convertTime(data.sys.sunrise)}</p>
        <p>sunset ${convertTime(data.sys.sunset)}</p>
    </div>
    <div class="weather-app__icon">
        <img src="./design/design2/icons/${setStyle(data.weather[0].main).icon}.svg" alt="Sunglasses">
    </div>
    <div class="weather-app__title">
        <h1>${createTitle(data.weather[0].main, data.name)}</h1>
    </div>
    <div class="weather-app__forecast">
        ${data2.list.slice(1, 7).map((item, index)=>{
            return(`
            <div class="weather-app__forecast-line">
                <span>${week[weekDay + index >= 7 ? weekDay + index - 7 : weekDay + index]}</span>
                <span>${formateTemperature(item.main.temp)}</span>
            </div>
            `)
        }).join("")}
    </div>
    </div>
    `
    weatherApp.innerHTML = appContent

}

const getTheWeather = async()=>{
    const response = await fetch(weatherUrl);
    const data = await response.json();
    const response2 = await fetch(forecastUrl);
    const data2 = await response2.json();
    renderApp(data, data2);
}


getTheWeather();




