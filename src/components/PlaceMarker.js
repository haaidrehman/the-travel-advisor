import defaultPhoto from '../assets/images/default-photo-1.jpg';
import fullstar from '../assets/icons/full-star.png';
import halfstar from '../assets/icons/half-star.png';

let PlaceMarker = ({ item, index }) => {

    let imgURL = '';
    let ratings = <div><p>No ratings available!</p></div>;
    typeof item.photo != 'undefined' ? imgURL = item.photo.images.original.url : imgURL = defaultPhoto;

    if (typeof item.rating != 'undefined') {
        ratings = [];
        for (let i = 0; i < parseInt(item.rating.substr(0, 1)); i++) {
            ratings.push(<img src={fullstar} alt="full-star-rating" width="13" height="13" />);
        }

        if (parseInt(item.rating.substr(2, 2)) >= 2) {
            ratings.push(<img src={halfstar} alt="half-star-rating" width="13" height="13" />);
        }

        ratings.push(<div>Out of <b>{item.num_reviews}</b> reviews</div>);


    }


    let scrollToListItem = (i) => {
        let listItem = document.getElementById(i);

        listItem.scrollIntoView({
            behavior: 'smooth'
        });
    }

    return (
        <>
            < div className="card teal place-marker" onClick={() => scrollToListItem(index)}>
                <div className="card-image">
                    <img src={imgURL} />
                    <span className="card-title small-text on-map"><b>{item.name}</b></span>
                </div>
                <div className="card-content">

                    {
                        ratings



                    }

                </div>
            </div >
        </>
    )
}

export default PlaceMarker;