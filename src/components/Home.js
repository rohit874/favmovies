import { useEffect, useState } from 'react';
import Movies from './Movies';
import '../styles/home.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Home(props) {
    const api_key ="cc8777e46527ca957aa4092a0e77f696";
    const baseURL = 'https://api.themoviedb.org/3';
    const API_URL = `${baseURL}/discover/movie?sort_by=popularity.desc&api_key=${api_key}&language=en-US`;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';
    const[movies, setMovies] = useState([]);
    //fetching movie data
    useEffect(() => {
        const getMovies = () =>{
            axios.get(API_URL).then((response) => {
              setMovies(response.data.results)
            });
          }
          getMovies();
    }, [API_URL])
    
    return (
        <div className="movies_container">
            <h2>Movies Recommended For You</h2>
            <div className="movies">
                {
                    movies.map((data)=>{
                        return(
                        <NavLink key={data.id} to={`/movie/${data.id}`}>
                            <Movies
                             id={data.id}
                             title={data.title}
                             overview={data.overview}
                             poster={IMG_URL+data.poster_path}
                             date={data.release_date}
                             language={data.original_language}
                             rating={data.vote_average}
                             watchListHandler={props.watchListHandler}
                             watchList={props.watchList}
                            />
                        </NavLink>
                        )
                    })
                }
             </div>
        </div>
    )
}

export default Home
