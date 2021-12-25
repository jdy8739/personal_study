const MY_API_KEY = '822f83de93b71de2975c40b9e7c84010'

function onGeoOk(position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    console.log(`position: ${lat} + ${lng}`)

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${MY_API_KEY}`
    console.log(url)

    fetch(url).then(response => response.json()).then(data => {
        console.log(data.name, data.weather[0].main);

        const nameBox = document.querySelector('#weather span:first-child');
        const weatherBox = document.querySelector('#weather span:last-child');
        const name = data.name;
        const weather = data.weather[0].main;

        nameBox.innerText = name;
        weatherBox.innerText = weather;
        weatherBox.classList.add('white');
    })
}

function onGeoError() {
    alert("Can't find your location!");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

