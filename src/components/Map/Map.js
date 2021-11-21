import GoogleMapReact from 'google-map-react';
import PlaceMarker from '../PlaceMarker';
import filter from './../filter';

let Map = ({ setDimensions, coordinates, places, selectState }) => {

    let defaultZoom = 14;
    return (
        <>
            <div className="col m8 s12">
                <div className="map-container">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}

                        defaultCenter={coordinates}
                        center={coordinates}
                        defaultZoom={defaultZoom}
                        onChange={(e) => {
                            //  console.log(e);
                            setDimensions((prevState) => {
                                return {
                                    coordinates: {
                                        lat: e.center.lat,
                                        lng: e.center.lng
                                    },
                                    boundries: {
                                        ...e.bounds
                                    }
                                }
                            });
                        }}


                    >
                        {

                            places.data != null && places.data.map((element, i) => {
                                let tag;
                                (typeof element.latitude != 'undefined' && typeof element.longitude != 'undefined') ?

                                    tag = filter(selectState.rating, PlaceMarker, element, i) : tag = null;

                                return tag;
                            })
                        }

                    </GoogleMapReact>
                </div>
            </div>
        </>
    );
}

export default Map;