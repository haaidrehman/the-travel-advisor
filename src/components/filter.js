let filter = (rating, Component, item, i) => {


    if (rating == 'all') {
        return <Component item={item} key={i} index={i} lat={item.latitude} lng={item.longitude} />
    }
    else if (rating == '3.0') {
        if (item.rating >= '3.0' && item.rating < '4.0') {
            return <Component item={item} key={i} index={i} lat={item.latitude} lng={item.longitude} />
        }
    }
    else if (rating == '4.0') {
        if (item.rating >= '4.0' && item.rating < '4.5') {
            return <Component item={item} key={i} index={i} lat={item.latitude} lng={item.longitude} />
        }
    }
    else if (rating == '4.5') {
        if (item.rating >= '4.5') {
            return <Component item={item} key={i} index={i} lat={item.latitude} lng={item.longitude} />
        }
    }


}


export default filter;