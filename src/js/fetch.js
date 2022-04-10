import Notiflix from 'notiflix';


export default class FetchCoutriesList {
    constructor() {
        this.name = '';
    }

    fetchCountries() {
        
        if (this.name === '') {
            return;
        }

        const url = `https://restcountries.com/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else { Notiflix.Notify.failure('Oops, there is no country with that name'); }
            }) 
            .then(data => {
                console.log(data.length);
                if (data.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                };
                if (data.length === 1) {
                    console.log(refs.info);

 
                }
            })
            .catch(err => { })
    }

    get query() {
        return this.name;
    }

    set query(newName) {
        this.name = newName;
    }
}

Notiflix.Notify.init( {
    width: '280px',
    position: 'center-top',
})
