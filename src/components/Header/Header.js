import logo from '../../assets/icons/logo.png';
import { useState, useEffect, useRef } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


let Header = ({ setDimensions }) => {

    const [autocompletePlaces, setAutocompletePlaces] = useState([]);
    let inputSearch = useRef();

    const provider = new OpenStreetMapProvider();

    let handleChange = async () => {

        const results = await provider.search({ query: inputSearch.current.value });
        setAutocompletePlaces(results);

    }

    useEffect(() => {

        let inputBox = document.querySelector('.nav-wrapper .input-field input[type=search]');


        inputBox.addEventListener('focus', () => {
            document.querySelector('.placeholder-white').classList.add('placeholder-to-top');
        });

        inputBox.addEventListener('blur', () => {
            document.querySelector('.placeholder-white').classList.remove('placeholder-to-top');
        });

    }, []);

    useEffect(() => {

        let autocomplete = document.querySelector('.autocomplete');

        if (autocompletePlaces.length) {
            if (!autocomplete.classList.contains('item-flex')) {
                autocomplete.classList.add('item-flex')
            }

            return;
        }

        autocomplete.classList.remove('item-flex');

    }, [autocompletePlaces]);


    let handlePlaceSelected = (lat, long, name) => {

        let autocomplete = document.querySelector('.autocomplete');
        inputSearch.current.value = name;
        setDimensions((prevState) => {
            return {
                // ...prevState,
                coordinates: {
                    lat: Number(lat),
                    lng: Number(long)
                },
                boundries: {
                    ne: null,
                    sw: null
                }
            }
        });

        autocomplete.classList.remove('item-flex');
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="item-left">
                        <a href="#!" className="brand-logo"><img src={logo} alt="logo" /></a>
                    </div>
                    <div className="item-right">

                        <div className="input-field">
                            <input ref={inputSearch} onChange={handleChange} id="search" type="search" required />
                            <label for="first_name" className="placeholder-white">Explore New Places</label>

                            <div className="autocomplete">
                                <ul>

                                    {
                                        autocompletePlaces.length && autocompletePlaces.map((el, i) => {
                                            let lat = el.raw.lat;
                                            let long = el.raw.lon;

                                            return <li class="collection-item" key={i} onClick={() => handlePlaceSelected(lat, long, el.label)}>{el.label}</li>

                                        })
                                    }

                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>


        </>
    );
}

export default Header;