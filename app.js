window.addEventListener('load', () => {
    
    const body = document.querySelector('body')
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const icon = document.querySelector('.icon')
    const temperatureSection = document.querySelector('.degree-section')
    const temperatureSpan = document.querySelector('.temperature span')
    const searchElement = document.querySelector('[data-city-search]')
    const searchBox = new google.maps.places.SearchBox(searchElement)
    
    let api 
    let long
    let lat

    // Current location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            // Use commented section to add future forecast
            // api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`

            api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                settingDOMElements(data)
            })
        })
    }
    // setting DOM Elements
    function settingDOMElements(data) {

        const temp = data.main.temp
        const summary = data.weather[0].description
        const timezone = data.name
        const iconID = data.weather[0].icon

        // const {temp} = data.current
        // const summary = data.current.weather[0].description
        // const timezone = data.timezone
        // const iconID = data.current.weather[0].icon

        temperatureDegree.textContent = Math.round(temp)
        temperatureDescription.textContent = summary
        locationTimezone.textContent = timezone
        icon.src = `/images/${iconID}.png`

        if (temp <= 15) {
            body.classList.add('cold-background')
            body.classList.remove('hot-background')
        } else {
            body.classList.add('hot-background')
            body.classList.remove('cold-background')
        }
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
        // api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`
        api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=09d7593febfa1a230b21516c97cb70d8`

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                settingDOMElements(data)
            })
    })
})