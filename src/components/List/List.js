import { useEffect } from 'react';
import PlaceDetails from '../Place-details/PlaceDetails';
import M from 'materialize-css/dist/js/materialize.min.js';
import filter from './../filter';

let List = ({ places, boundries, selectState, setSelectState }) => {

    let rating = selectState;



    let listItems = [];

    if (places.data != null) {
        listItems = places.data.map((item, i) => {

            return filter(selectState.rating, PlaceDetails, item, i);

        });
    }


    useEffect(() => {
        M.AutoInit();
    }, []);


    return (
        <>
            <div className="col m4 s12">
                <div className="toolbox">
                    <p className="flow-text">Restaurants, Hotels & Attractions around you</p>
                    {/*  */}
                    <div className="input-field col s6">
                        <select className="select-box"

                            value={selectState.type}

                            onChange={(e) => {
                                setSelectState((prevState) => {
                                    return {
                                        ...prevState,
                                        type: e.target.value
                                    }
                                });
                            }}
                        >
                            <option value="restaurants">Restaurants</option>
                            <option value="hotels">Hotels</option>
                            <option value="attractions">Attractions</option>
                        </select>
                        <label>Type</label>
                    </div>
                    <div className="input-field col s6">
                        <select className="select-box"

                            value={selectState.rating}

                            onChange={(e) => {
                                setSelectState((prevState) => {
                                    return {
                                        ...prevState,
                                        rating: e.target.value
                                    }
                                });
                            }}
                        >
                            <option value="all">All</option>
                            <option value="3.0">Above 3.0</option>
                            <option value="4.0">Above 4.0</option>
                            <option value="4.5">Above 4.5</option>
                        </select>
                        <label>Rating</label>
                    </div>
                </div>

                <div className="list-container">
                    {listItems}
                </div>


            </div>
        </>
    );

}

export default List;