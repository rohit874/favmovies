import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router';
import '../styles/movie_details.css';
import axios from 'axios';

function Details({watchList,watchListHandler}) {
  const api_key ="cc8777e46527ca957aa4092a0e77f696";
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const [movieData, setmovieData] = useState();
  let { id } = useParams();

  const [inWatchList, setInWatchList] = useState(false);

    useEffect(()=>{
        function checkWatchList(id){
            let idx = watchList.findIndex(p => p.id === Number(id));
            idx>=0?setInWatchList(true):setInWatchList(false);
        }
        checkWatchList(id);
    },[watchList,id]);

  useEffect(()=>{
    const getDetails = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`).then((response) => {
          setmovieData(response.data);
        });
      }
      getDetails();
  },[id]);

    return (
        <div className="details_container">
            {
            movieData?
            <Fragment key={movieData.id}>
            <img src={IMG_URL+movieData.poster_path} alt=""/>
            <div className="info_div">
                <h2>{movieData.title}</h2>
                <span>{movieData.release_date}, {movieData.runtime}m</span>
                <div><span>{movieData.vote_average}&#9733; Rating</span>
                <button onClick={(e)=>{e.preventDefault();watchListHandler({id:movieData.id,poster:IMG_URL+movieData.poster_path,title:movieData.title,overview:movieData.overview,date:movieData.date,watched:false})}}>{inWatchList?"Added":"ADD TO WATCHLIST"}</button></div>
                <h3>Overview</h3>
                <p>{movieData.overview}</p>
                <div className="more_info">
                <div><h3>Genres</h3>
                {movieData.genres.map((data,key)=>{
                    return(
                        <p key={key}>{data.name}</p>
                    )
                })}
                </div>
                <div>
                <h3>Production companies</h3>
                {movieData.production_companies.map((data,key)=>{
                    return(
                        <p key={key}>{data.name}</p>
                    )
                })}</div>
                <div>
                <h3>Production countries</h3>
                {movieData.production_countries.map((data,key)=>{
                    return(
                        <p key={key}>{data.name}</p>
                    )
                })}</div>
                <div>
                <h3>Language</h3>
                {movieData.spoken_languages.map((data, key)=>{
                    return(
                        <p key={key}>{data.name}</p>
                    )
                })}
                </div>
                <div>
                <h3>Status</h3>
                <p>{movieData.status}</p>
                </div>
                </div>
            </div>
            </Fragment>:""}
        </div>
    )
}

export default Details
