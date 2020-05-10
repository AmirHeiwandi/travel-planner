import {compareDates} from './app.js'

let currentDate = `2020-05-10`;
let todaysDate = new Date(currentDate);
let tripDate = `2020-05-15`;
let response = {};
let data = {
    city_name: "Paris",
    country_code: "FR",
    data: [
        {datetime: "2020-05-10", temp: 10 },
        {datetime: "2020-05-11", temp: 11 },
        {datetime: "2020-05-12", temp: 12 },
        {datetime: "2020-05-13", temp: 13 },
        {datetime: "2020-05-14", temp: 14 },
        {datetime: "2020-05-15", temp: 15 },
        {datetime: "2020-05-16", temp: 16 },
        {datetime: "2020-05-17", temp: 17 },
        {datetime: "2020-05-18", temp: 18 },
        {datetime: "2020-05-19", temp: 19 },
        {datetime: "2020-05-20", temp: 20 },
        {datetime: "2020-05-21", temp: 21 },
        {datetime: "2020-05-22", temp: 22 },
        {datetime: "2020-05-23", temp: 23 },
        {datetime: "2020-05-24", temp: 24 },
        {datetime: "2020-05-25", temp: 25 },
    ],
    lat: 48.85,
    lon: 2.35,
    state_code: "11",
    timezone: "Europe/Paris"
}

test('Testing the compareDates function', () => {
    expect(compareDates(tripDate, todaysDate, data, response)).toEqual({
        info: {
            datetime: "2020-05-15", 
            temp: 15 }
        });
})