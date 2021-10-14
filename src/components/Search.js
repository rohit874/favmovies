import no_image from '../images/no_image.jpg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Search() {
    const api_key ="cc8777e46527ca957aa4092a0e77f696";
    const baseURL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const [input, setInput] = useState("");
    const [searchResult, setSearchResult] =useState([]);
    const [searchOn, setSearchOn ] = useState(false);

    const searchMovies = () =>{
        if(input===""){
            return;
        }
        axios.get(`${baseURL}/search/movie?api_key=${api_key}&query=${input}`).then((response) => {
            setSearchResult(response.data.results)
        });
      }

      const searchOnHandler = () =>{
        setSearchOn(true);
    }

    const searchOffHandler = () =>{
       setTimeout(()=>{
            setSearchOn(false);
            },400)
    }

    return (
            <div className="search_div">
            <input onBlur={searchOffHandler} onFocus={searchOnHandler} onChange={(e)=>{setInput(e.target.value);searchMovies()}} value={input} type="text" placeholder="Search by title" />
            <div style={{display:searchOn?"block":"none"}} className="search_result">
                {
                    searchResult.length?
                    searchResult.map((data)=>{
                    return(
                    <NavLink key={data.id} to={`/movie/${data.id}`} className="search_items">
                    <img src={data.poster_path?IMG_URL+data.poster_path:no_image} alt="" />
                    <div><h4>{data.title}</h4>
                    <p>{data.release_date}</p>
                    <p>&#9733;{data.vote_average}</p>
                    </div>
                </NavLink>
                    )
                    }) 
                    :<p className="no_result">No result found</p>
                }
            </div>
            </div>
    )
}

export default Search;
