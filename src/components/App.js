import { useEffect, useState } from 'react';
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getPlaceData } from '../api/axios';
import { currencyExchangeRate } from '../api/axios';
import Preloader from './Preloader';


let App = () => {

    let [dimensions, setDimensions] = useState(
        {
            coordinates: {
                lat: 28.613939,
                lng: 77.209023
            },
            boundries: {
                ne: null,
                sw: null
            }
        }
    );


    let [places, setPlaces] = useState({ data: null });

    let [selectState, setSelectState] = useState({ type: 'restaurants', rating: 'all' });



    useEffect(() => {

        let showLocationError = (error) => {
            if (error.PERMISSION_DENIED) {
                console.log('Locatipon access not allowed');
            }
        }
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {

            setDimensions((prevState) => {
                return {
                    ...prevState,
                    coordinates: {
                        lat: latitude,
                        lng: longitude
                    }

                };
            });
        },

            showLocationError

        );

        currencyExchangeRate().then((res) => {
            localStorage.setItem('dollar-rate', JSON.stringify(res.data));
        });;

        M.AutoInit();

    }, []);


    useEffect(() => {

        setPlaces({ data: null });
        if (dimensions.boundries.ne != null && dimensions.boundries.sw != null) {

            getPlaceData(dimensions.boundries, selectState.type).then((data) => {

                setPlaces(data.data);
                //localStorage.setItem('data', JSON.stringify(data));
            })
        }


        //     //console.log(JSON.parse(localStorage.getItem('data')));

        // setTimeout(() => {
        //     setPlaces(JSON.parse(localStorage.getItem('data')).data);

        // }, 500);


    }, [dimensions.coordinates, dimensions.boundries, selectState]);


    return (
        <>
            <Header setDimensions={setDimensions} />
            <div className="main">
                <div className="row">
                    {places.data != null ? <List places={places} boundries={dimensions.boundries} selectState={selectState} setSelectState={setSelectState} /> : <Preloader />}

                    <Map setDimensions={setDimensions} coordinates={dimensions.coordinates} places={places} selectState={selectState} />

                </div>
            </div>

        </>
    );
}

export default App;