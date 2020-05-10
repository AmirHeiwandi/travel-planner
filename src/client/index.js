// Import statements
import './styles/main.scss'
import {addContent} from './js/app'
import {getCords} from './js/app'
import {getWeather} from './js/app'
import {getImage} from './js/app'

// Variable declarations
let form = document.getElementById('form');
let destinationBox = document.getElementById('destination');
let tripBox = document.getElementById('date');

// Eventlistener for submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getCords(destinationBox.value).then(function (response) {
        getWeather(response, tripBox.value).then(function (response) {
            getImage(response).then(function (response){
                addContent(response, tripBox.value);
            });
        });
    });
});