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
    clearHTML()
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
    
    const singleCountry = `<li> <img class="icon" height="50" width="50" src="${country.flags.svg}"/> <p>${country.name.official}</p></li>
    `
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
    const singleCountryDetailedMarkUp = `<article> <img class=icon src="${singleCountryData.flags.svg}" height="50" width="50"/> 
    <p class="country">${singleCountryData.name.official}</p> <p> <span class="category">Capital:</span> ${singleCountryData.capital[0]}</p> <p><span class="category">Population:</span> ${singleCountryData.population}</p>
<p><span class="category">Languages:</span> ${language}</p>  </article >`
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



