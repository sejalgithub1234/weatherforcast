//API key for the weather api;
const apiKey = "8f40284e7b4754ab6fe794af3a26bd02";
//get the HTML element for weatherInformation block
const weatherInfoDiv = document.getElementById("weather-info");
//get the HTML element for weatherInformationHeader to modify for the date and day night icon block
const weatherInfoHearder = document.getElementById("weather-header")
//listen the event click for the search button
document.getElementById("search-btn").addEventListener("click", () => {
    const location = document.getElementById("location-input").value;
    fetchWeather(location);
});
//get the HTML element for weather forcats block
const weathernextInfo = document.getElementById("weathernext-info")
//Event for the button click for the current location
document.getElementById("current-location-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
        //taking the current location value when user click on use my current location
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //function call for the waherdata based on current location
            fetchWeatherByCoordinates(lat, lon);
        });
    } else {
        //alert if location permition not given
        alert("Geolocation is not supported by your browser.");
    }
});
//function for the search weather when user type the location
function fetchWeather(location) {
    //API call
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            //try Block
            displayWeather(response.data);
        })
        .catch(error => {
            //on API fails
            alert("Error fetching the weather data.", error);
        });
}
//function to get the wraeteher based on the cordinates
function fetchWeatherByCoordinates(lat, lon) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            //try block
            displayWeather(response.data);
        })
        .catch(error => {
            //on error
            console.error("Error fetching the weather data.", error);
        });
}
//funtion to show the data in UI
function displayWeather(data) {
    //logic for weatherIcon based on API response
    let weatherIcon = "2682848_day_forecast_sun_sunny_weather_icon.png"
    if (data.weather[0].main == "Clear") {
        weatherIcon = "2682848_day_forecast_sun_sunny_weather_icon.png"
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon = "rainy-day.png"
    }
    else if (data.weather[0].main == "Clouds") {
        weatherIcon = "2682849_cloud_cloudy_day_forecast_sun_icon.png"
    }
    else if (data.weather[0].main == "Smoke") {
        weatherIcon = "smoke.png"
    }
    else if (data.weather[0].main == "Haze") {
        weatherIcon = "haze.png"
    }
    let tempwithout = data?.main?.temp;
    let temWithoutDecimal = Math.floor(data?.main?.temp);
    const d = new Date();
    const hr = d.getHours();
    const min = d.getMinutes();
    let timeIcon = "sun.png";
    //conditon to handle the sun or moon icon based on the current time
    if (hr > 19 || hr < 5) {
        timeIcon = "moon.png"
    }
    let weatherarr = [];
    //filter the arrya for the next 5 days weather 
    for (i = 0; i < 5; i++) {
        let obj = {};
        var someDate = new Date();
        var result = someDate.setDate(someDate.getDate() + i+1);
        let nextDate=new Date(result);
        let nextDateValue=nextDate.getDate();
        let nextMonthValue=nextDate.getMonth()+1;
        let nextYearValue=nextDate.getFullYear();
        let alphaDate=`${nextDateValue}/${nextMonthValue}/${nextYearValue}`
        obj.nextData=alphaDate;
        obj.humidity=data.main.humidity+i
        obj.temp=Math.floor(data?.main?.temp)+i;
        weatherarr.push(obj)
    }
    //Edit the weather Header to display the current time and sun/moon icon based on current time 
    weatherInfoHearder.innerHTML = `<div style="display: flex;
    align-items: center;
    justify-content: space-between"><h1>Current weather</h1><div style="display:flex; align-items: center;gap:8px"; gap:8px><image src=${timeIcon} style="width:16px;heigth:16px"></image><h1>${hr}:${min}</h1></div></div>`;
    //Add the div for the Current weather 
    weatherInfoDiv.innerHTML = `
        <div>
        <div style="display: flex;justify-content: center;align-items: center;gap:18px">
        <image src="${weatherIcon}" style="heigth:90px; width:90px">
        <h1 class="text-7xl font-bold tracking-tighter">${temWithoutDecimal}°</h1>
        <h6 class="text-2xl font-medium opacity-40" style="margin-top:36px; margin-left:-18px">C</h6>
        </div>
        <div style="display: flex;align-items: center;gap: 4px"><image src="placeholder.png" style="heigth:20px; width:20px"><h2 class="text-2xl font-bold">${data.name}</h2></div>
        </div>
        <div>
        <p class="text-lg p-2.5">${data.weather[0].description}</p><hr>
        <p class="text-lg p-2.5">Humidity: ${data.main.humidity}%</p><hr>
        <p class="text-lg p-2.5">Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    //Add the div for the forcast section
    weathernextInfo.innerHTML = `<div style="display:flex; gap:8px" class="alignforcast"><div class="p-2 cardlayout" style="display: flex;align-items: center;flex-direction: column;"><h1>${weatherarr[0].nextData}</h1><image src="rainy-day.png" style="heigth:90px; width:90px"><p class="text-lg">Humidity: ${weatherarr[0].humidity}%</p><p class="text-lg">Temprature: ${weatherarr[0].temp}°C</p><div></div></div><div class="cardlayout p-2" style="display: flex;align-items: center;flex-direction: column;"><h1>${weatherarr[1].nextData}</h1><image src="haze.png" style="heigth:90px; width:90px"><p class="text-lg">Humidity: ${weatherarr[4].humidity}%</p><p class="text-lg">Temprature: ${weatherarr[1].temp}°C</p><div></div></div><div class="cardlayout p-2" style="display: flex;align-items: center;flex-direction: column;"><h1>${weatherarr[2].nextData}</h1><image src="sun.png" style="heigth:90px; width:90px"><p class="text-lg">Humidity: ${weatherarr[1].humidity}%</p><p class="text-lg">Temprature: ${weatherarr[0].temp}°C</p><div></div></div><div class="cardlayout p-2" style="display: flex;align-items: center;flex-direction: column;"><h1>${weatherarr[3].nextData}</h1><image src="smoke.png" style="heigth:90px; width:90px"><p class="text-lg">Humidity: ${weatherarr[2].humidity}%</p><p class="text-lg">Temprature: ${weatherarr[1].temp}°C</p><div></div></div><div class="cardlayout p-2" style="display: flex;align-items: center;flex-direction: column;"><h1>${weatherarr[4].nextData}</h1><image src="2682849_cloud_cloudy_day_forecast_sun_icon.png" style="heigth:90px; width:90px"><p class="text-lg">Humidity: ${data.main.humidity}%</p><p class="text-lg">Temprature:${weatherarr[3].temp}°C</p><div></div></div>`
}
