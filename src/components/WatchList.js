import { NavLink } from 'react-router-dom';
import '../styles/watchlist.css';

function WatchList({watchListHandler,watchList}) {
    return (
        <div className="watchlist_container">
            <h3>WatchList</h3>
            <div className="watchlist">
                {
                    watchList.map((data)=>{
                        return(
                    <NavLink key={data.id} to={`/movie/${data.id}`} className="watchlist_items">
                    <img src={data.poster} alt="" />
                    <div className="watchlist_info">
                        <h3>{data.title}</h3>
                        <span>{data.date}</span>
                        <p>{data.overview}</p>
                    </div>
                    <div className="btn_div">
                        <button onClick={(e)=>{e.preventDefault();watchListHandler({...data})}}>Remove</button>
                    </div>
                </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WatchList
