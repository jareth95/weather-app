window.addEventListener('load', () => {
    
    const body = document.querySelector('body')
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const icon = document.querySelector('.icon')
    const temperatureSection = document.querySelector('.degree-section')
    const temperatureSpan = document.querySelector('.temperature span')
    const searchElement = document.querySelector('[data-city-search]')
    const animationSection = document.querySelector('.temperature')
    const searchBox = new google.maps.places.SearchBox(searchElement)
    const day1Forecast = document.querySelector('.day1')
    const day2Forecast = document.querySelector('.day2')
    const day3Forecast = document.querySelector('.day3')
    const day4Forecast = document.querySelector('.day4')
    const day1Temperature = document.querySelector('.temperature-degree1')
    const day2Temperature = document.querySelector('.temperature-degree2')
    const day3Temperature = document.querySelector('.temperature-degree3')
    const day4Temperature = document.querySelector('.temperature-degree4')
    const day1Description = document.querySelector('.temperature-description1')
    const day2Description = document.querySelector('.temperature-description2')
    const day3Description = document.querySelector('.temperature-description3')
    const day4Description = document.querySelector('.temperature-description4')
    const day1Icon = document.querySelector('.icon1')
    const day2Icon = document.querySelector('.icon2')
    const day3Icon = document.querySelector('.icon3')
    const day4Icon = document.querySelector('.icon4')
    const day1Container = document.querySelector('.forecast1')
    const day2Container = document.querySelector('.forecast2')
    const day3Container = document.querySelector('.forecast3')
    const day4Container = document.querySelector('.forecast4')
    
    let currentApi 
    let forecastApi
    let long
    let lat

    // Current location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            forecastApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`

            fetch(forecastApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                settingForecastDOMElements(data)
            })

            currentApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=en&appid=09d7593febfa1a230b21516c97cb70d8`

            fetch(currentApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                settingCurrentDOMElements(data)
            })
        })
    }
    // setting DOM Elements
    function settingCurrentDOMElements(data) {

        const temp = data.main.temp
        const summary = data.weather[0].description
        const timezone = data.name
        const iconID = data.weather[0].icon

        temperatureDegree.textContent = Math.round(temp)
        temperatureDescription.textContent = summary
        locationTimezone.textContent = timezone
        icon.src = `/images/${iconID}.png`

        if (temp <= 18) {
            body.classList.add('cold-background')
            body.classList.remove('hot-background')
        } else {
            body.classList.add('hot-background')
            body.classList.remove('cold-background')
        }
    }
    function settingForecastDOMElements(data) {
        
        switch (new Date().getDay()) {
            case 0:
              day1Forecast.textContent = "Monday";
              day2Forecast.textContent = "Tuesday";
              day3Forecast.textContent = "Wednesday";
              day4Forecast.textContent = "Thursday";
              break;
            case 1:
              day1Forecast.textContent = "Tuesday";
              day2Forecast.textContent = "Wednesday";
              day3Forecast.textContent = "Thursday";
              day4Forecast.textContent = "Friday";
              break;
            case 2:
              day1Forecast.textContent = "Wednesday";
              day2Forecast.textContent = "Thursday";
              day3Forecast.textContent = "Friday";
              day4Forecast.textContent = "Saturday";
              break;
            case 3:
              day1Forecast.textContent = "Thursday";
              day2Forecast.textContent = "Friday";
              day3Forecast.textContent = "Saturday";
              day4Forecast.textContent = "Sunday";
              break;
            case 4: 
              day1Forecast.textContent = "Friday";
              day2Forecast.textContent = "Saturday";
              day3Forecast.textContent = "Sunday";
              day4Forecast.textContent = "Monday";
              break;
            case 5: 
              day1Forecast.textContent = "Saturday";
              day2Forecast.textContent = "Sunday";
              day3Forecast.textContent = "Monday";
              day4Forecast.textContent = "Tuesday";
              break;
            case 6:
              day1Forecast.textContent = "Sunday";
              day2Forecast.textContent = "Monday";
              day3Forecast.textContent = "Tuesday";
              day4Forecast.textContent = "Wednesday";
          }

          day1Temperature.innerHTML = Math.round(data.daily[1].temp.day)
          day2Temperature.innerHTML = Math.round(data.daily[2].temp.day)
          day3Temperature.innerHTML = Math.round(data.daily[3].temp.day)
          day4Temperature.innerHTML = Math.round(data.daily[4].temp.day)

          day1Description.innerHTML = data.daily[1].weather[0].description
          day2Description.innerHTML = data.daily[2].weather[0].description
          day3Description.innerHTML = data.daily[3].weather[0].description
          day4Description.innerHTML = data.daily[4].weather[0].description

          day1Icon.src = `/images/${data.daily[1].weather[0].icon}.png`
          day2Icon.src = `/images/${data.daily[2].weather[0].icon}.png`
          day3Icon.src = `/images/${data.daily[3].weather[0].icon}.png`
          day4Icon.src = `/images/${data.daily[4].weather[0].icon}.png`
    }
    // Switch between celcius & farenheit
    temperatureSection.addEventListener('click', () => {
        let celcius
        let farenheit

        if (temperatureSpan.textContent === '°C' ) {
            
            temperatureSpan.textContent = '°F'
            celcius = temperatureDegree.textContent
            farenheit = (celcius * 9/5) + 32
            temperatureDegree.textContent = Math.round(farenheit)

        } else {
            
            temperatureSpan.textContent = '°C'
            farenheit = temperatureDegree.textContent
            celcius = (farenheit - 32) * 5/9
            temperatureDegree.textContent = Math.round(celcius)
        }
    })
    // Change DOM elements based on search
    searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        if (place == null) return
        lat = place.geometry.location.lat()
        long = place.geometry.location.lng()

        forecastApi = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`

        fetch(forecastApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                settingForecastDOMElements(data)
            })
        
        currentApi = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=en&appid=09d7593febfa1a230b21516c97cb70d8`

            fetch(currentApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                settingCurrentDOMElements(data)
            })
    })
    // Mouseover animation 
    animationSection.addEventListener('mouseover', addAnimation)
    day1Container.addEventListener('mouseover', addAnimationForecast)
    day2Container.addEventListener('mouseover', addAnimationForecast)
    day3Container.addEventListener('mouseover', addAnimationForecast)
    day4Container.addEventListener('mouseover', addAnimationForecast)

    animationSection.addEventListener('mouseleave', removeAnimation)
    day1Container.addEventListener('mouseleave', removeAnimation)
    day2Container.addEventListener('mouseleave', removeAnimation)
    day3Container.addEventListener('mouseleave', removeAnimation)
    day4Container.addEventListener('mouseleave', removeAnimation)

    function addAnimation(e) {

        if(e.target.innerHTML.includes('rain')) body.classList.add('rain-background')
        if(e.target.innerHTML.includes('cloud')) {
            body.classList.add('cloud-background')
            body.style.setProperty('color', 'black', 'important')
        } 
        if(e.target.innerHTML.includes('snow')) body.classList.add('snow-background')
    }
    function addAnimationForecast(e) {

        if(e.target.parentElement.innerHTML.includes('rain')) body.classList.add('rain-background')
        if(e.target.parentElement.innerHTML.includes('cloud')) {
            body.classList.add('cloud-background')
            body.style.setProperty('color', 'black', 'important')
        } 
        if(e.target.parentElement.innerHTML.includes('snow')) body.classList.add('snow-background')
    }
    function removeAnimation(e) {
        
        if(body.classList.contains('rain-background')) body.classList.remove('rain-background')
        if(body.classList.contains('cloud-background')) {
            body.classList.remove('cloud-background')
            body.style.setProperty('color', '')
        } 
        if(body.classList.contains('snow-background')) body.classList.remove('snow-background')
    }
})