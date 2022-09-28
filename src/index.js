import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';

import { fetchCountries } from './fetchCountries';

// fetchCountries()
// console.log(debounce)

const inputEl = document.querySelector('[id="search-box"]')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')
// console.log(inputEl)

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(e) {
    console.log(e.target)
    const searchFieldData = e.target.value.trim()
     if (!searchFieldData) {
            clearHTML()
            return
        }

    fetchCountries(searchFieldData).then((data) => {
        

       
        if (data.status == 404)
        {
            Notiflix.Notify.failure('Oops, there is no country with that name')
        return}

        if (data.length > 10) {
        Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')
        return
    }
        if (data.length == 1) {
            // console.log(data[0])
            createOneCountryDetailed(data[0])
            return
        }
        ShowCountriesinHTML(data)
    })


        
    
    }


function createMarkUp(country) {
    
    const singleCountry = `<li> <img class="icon" width="70" height="70" scr="${country.flags.svg}"/> <p>${country.name.official}</p></li>
    <img scr="https://picsum.photos/id/237/200/300" alt="no..nothing :(" height="300" width ="300">`
            console.log(singleCountry)
            return singleCountry
        }


function ShowCountriesinHTML(data) {
    if (!data)
            {return}
            countryListEl.insertAdjacentHTML('beforeend', data.map(createMarkUp).join(''))
        }
// console.log(countryLIstEl)

function clearHTML() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
        }
 
function createOneCountryDetailed(singleCountryData) { 
    const language = Object.values(singleCountryData.languages);
    console.log(language)
    const singleCountryDetailedMarkUp = `<article> <img scr="${singleCountryData.flags.svg}" height="35" width="35" > 
    <p>${singleCountryData.name.official}</p> <p> Capital: ${singleCountryData.capital[0]}</p> <p>Population: ${singleCountryData.population}</p>
<p>Languages: ${language}</p>  </article >`
    countryInfoEl.insertAdjacentHTML('beforeend', singleCountryDetailedMarkUp) 
}

// united
// ukraine
// USA
// canada

// if (data.length > 10) {
//         Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
//         return
//     }



