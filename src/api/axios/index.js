import axios from 'axios';

export let getPlaceData = async ({ ne, sw }, type) => {
    try {

        let response = await axios.request({
            method: 'GET',
            url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_latitude: ne.lat,
                tr_longitude: ne.lng,
                restaurant_tagcategory_standalone: '10591',
                restaurant_tagcategory: '10591',
                limit: '30',
                currency: 'USD',
                open_now: 'false',
                lunit: 'km',
                lang: 'en_US'
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY
            }
        });

        return response;
    }
    catch (error) {
        console.log(error);
    }

}



export let currencyExchangeRate = async () => {
    try {
        let response = await axios.request({
            method: 'GET',
            url: 'https://currency-exchange.p.rapidapi.com/exchange',
            params: { to: 'INR', from: 'USD', q: '1.0' },
            headers: {
                'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_TRAVEL_ADVISOR_API_KEY
            }
        });

        return response;

    }

    catch (error) {
        console.log('Currency exchange api error', error);
    }
}