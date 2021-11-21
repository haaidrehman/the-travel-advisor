import defaultPhoto from '../../assets/images/default-photo-1.jpg';
import fullstar from '../../assets/icons/full-star.png';
import halfstar from '../../assets/icons/half-star.png';
import phone from '../../assets/icons/phone.png';
import location from '../../assets/icons/location.png';


let PlaceDetails = ({ item, index }) => {

    let imgURL = '';
    let ratings = '';
    let tel = '';
    let tempArray = [];
    tempArray[0] = '';
    tempArray[1] = '';

    if (typeof item.price != 'undefined') {

        item.price.split('').forEach((e, i) => {

            if (item.price.indexOf('-') != -1) {

                if (i < item.price.indexOf('-') && !isNaN(parseInt(e))) {

                    tempArray[0] += e;
                }
                else if (i > item.price.indexOf('-') && !isNaN(parseInt(e))) {
                    tempArray[1] += e;
                }
            }
            else {
                if (!isNaN(parseInt(e))) {
                    tempArray[0] += e;
                }
            }

        });
    }

    typeof item.photo != 'undefined' ? imgURL = item.photo.images.original.url : imgURL = defaultPhoto;

    typeof item.phone != 'undefined' ? tel = 'tel:' + item.phone : tel = 'N/A';

    if (typeof item.rating != 'undefined') {
        ratings = [];
        for (let i = 0; i < parseInt(item.rating.substr(0, 1)); i++) {
            ratings.push(<div><img src={fullstar} alt="full-star-rating" width="13" height="13" /></div>);
        }


        if (parseInt(item.rating.substr(2, 2)) >= 2) {

            ratings.push(<div><img src={halfstar} alt="half-star-rating" width="13" height="13" /></div>);
        }

        ratings.push(<div className="o-u-r">Out of <b>{item.num_reviews}</b> reviews</div>);


    }

    let convertUSDtoINR = (tempArray) => {



        let rate;
        if (localStorage.getItem('dollar-rate')) {
            rate = Math.round(JSON.parse(localStorage.getItem('dollar-rate')));
        }

        if (tempArray[1] == '') {
            return parseInt(tempArray[0]) * rate + ' (INR)';
        }

        return 'Rs. ' + parseInt(tempArray[0]) * rate + " - " + 'Rs. ' + parseInt(tempArray[1]) * rate;
    }

    return (
        <div className="row" id={index}>
            <div className="col s12 m12">
                <div className="card teal list-card">
                    <div className="card-image">
                        <img src={imgURL} alt="card image" />

                    </div>
                    <div className="card-content">
                        <span className="card-title">{item.name}</span>
                        <div className="box first-box">
                            {ratings}
                        </div>
                        <p>{item.description}</p><br />
                        <div className="box">
                            <p>Price</p>
                            {item.price ? <p>{convertUSDtoINR(tempArray)}</p> : <p>N/A</p>}
                        </div>
                        <div className="box rank">
                            <p>Ranking</p>
                            {item.ranking ? <p>{item.ranking}</p> : <p>N/A</p>}

                        </div>

                        {typeof item.awards != 'undefined' && item.awards.map((award) => {
                            return <div className="box">
                                <img src={award.images.small} alt="award icon" />
                                <p>{award.display_name}</p>
                            </div>;
                        })}

                        <div className="box-grid">
                            {typeof item.cuisine != 'undefined' && item.cuisine.map(({ name }) => {
                                return <div className="custom-badge"><p>{name}</p></div>;
                            })}
                        </div>
                        <div className="box">
                            <div className="address-img-wrapper"><img src={location} alt="address" width="25" height="25" /></div>

                            <p className="address-text">{item.address ? item.address : item.location_string}</p>
                        </div>
                        <div className="box">
                            <img src={phone} alt="address" width="25" height="25" />
                            <p>{item.phone ? <a className="phone-link" href={tel} alt="phone">{item.phone}</a> : tel}</p>
                        </div>

                    </div>
                    <div className="card-action">
                        {
                            item.web_url && <a href={item.web_url} alt="public review web url" target="_blank">See public reviews</a>
                        }
                        {
                            item.website && <a href={item.website} alt="website url" target="_blank">Website</a>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PlaceDetails;