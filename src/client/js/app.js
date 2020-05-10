// Variable declarations
let formSection = document.getElementById('formSection');
let footer = document.getElementById('footer');
let object = {};

// Functions
function addContent (object, date) {
    let section = document.createElement('section');
    section.innerHTML= `<div class="tripBox">
    <div class="imageBox">
        <img alt="paris" id="paris" src="${object.image.webformatURL}">
    </div>
    <div class="tripInfoBox">
        <p><span>My trip to:</span> ${object.city}, ${object.country}</p>
        <p><span>Departing:</span> ${date}</p>
        <p><span>Typical weather for then is:</span></p>
        <p>High ${object.info.app_max_temp}&deg;C, Low ${object.info.app_min_temp}&deg;C.</p>
        <p>${object.info.weather.description}</p>
    </div>
    </div>`;
    formSection.insertAdjacentElement('afterend', section);
    footer.classList.remove('footerFixed');
    footer.classList.add('footerFlex');
}

// Fetch function to get cordinatons from Genonames API
async function getCords (city) {
    const res = await fetch(`${process.env.geoname_URL}${city}&maxRows=10${process.env.geonames_KEY}`);
    const data = await res.json();
    object.city = data.geonames[0].name;
    object.country = data.geonames[0].countryName;
    object.lat = data.geonames[0].lat;
    object.lng = data.geonames[0].lng;
    return object;
}

// Fetch function to get weatherinfo from Weatherbit API
async function getWeather (response, date) {
    const res = await fetch (`${process.env.weatherbit_URL}&lat=${response.lat}&lon=${response.lng}&key=${process.env.weatherbit_KEY}`);
    const data = await res.json();
    let todaysDate = new Date();
    return compareDates(date, todaysDate, data, response);
}

// Fetch function to get image from Pixabay API
async function getImage(response) {
    const res = await fetch(`${process.env.pixbay_URL}key=${process.env.pixbay_KEY}&q=${response.city}&image_type=photo`);
    const data = await res.json();
    if (data.total === 0) {
        const res = await fetch(`${process.env.pixbay_URL}key=${process.env.pixbay_KEY}&q=${response.country}&image_type=photo`);
        const data = await res.json();
        response.image = data.hits[0];
        return response;
    }
    else {
        response.image = data.hits[0];
        return response;
    }
}

// Compare current date to tripdate to return the right forecast
function compareDates (date, todaysDate, data, response){
    let tripDate = new Date(date);
    todaysDate.setDate(todaysDate.getDate() + 16);
    if (tripDate.getTime() > todaysDate.getTime()) {
        response.info = data.data[15]
        return response;
    }
    else {
        for (let array of data.data){
            let arrayDate = new Date(array.datetime);
            if (arrayDate.getTime() === tripDate.getTime()) {
                response.info = array;
                return response;
            }
        }
    }
}

export {addContent}
export {getCords}
export {getWeather}
export {getImage}
export {compareDates}