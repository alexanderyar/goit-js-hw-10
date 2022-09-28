var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';





// fetchCountries(name)

// https://restcountries.com/v2/{service}?fields={field},{field},{field} 
// https://restcountries.com/v2/all?fields=name,capital,currencies 




export function fetchCountries(name) {
    
    
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`)
        .then((data) => { return data.json() })
        .then((data) => {

            console.log(data)
            
            return data
            
        })
    .catch(error => console.log(error))
}





// united 