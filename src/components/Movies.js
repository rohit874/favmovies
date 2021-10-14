import { useEffect, useState } from "react"

function Movies({id, title, overview, date, rating, poster, language, watchList, watchListHandler}) {
    const [inWatchList, setInWatchList] = useState(false);
    //checking items if already added in watchlist
    useEffect(()=>{
        function checkWatchList(id){
            let idx = watchList.findIndex(p => p.id === id);
            idx>=0?setInWatchList(true):setInWatchList(false);
        }
        checkWatchList(id);
    },[watchList,id]);
    
    return (
        <div className="movies_item">
            <img src={poster} alt="" />
            <h5>{title}</h5>
            <div className="info">
                <h5>{title}</h5>
                <span>{rating}&#9733;, {language}, {date}</span>
                <p>{overview}</p>
                <button onClick={(e)=>{e.preventDefault();watchListHandler({id,poster,title,overview,date,watched:false})}}>{inWatchList?"Added":"ADD TO WATCHLIST"}</button>
            </div>
        </div>
    )
}

export default Movies
