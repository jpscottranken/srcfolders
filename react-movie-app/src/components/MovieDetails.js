import { useState, useEffect } from "react"
import React from 'react'
import {useLocation} from "react-router-dom"

function MovieDetails(props) {
  const [theMovieDetails, setTheMovieDetails] = useState({})
  console.log(`Starting`);
  
  const search = useLocation().search;
  const movieID = new URLSearchParams(search).get("movieID");
  
  const fetchMovieDetailsById = (imdbId) => {
    const detailsurl = `https://www.omdbapi.com/?i=${imdbId}&apikey=2c2e69a0`

    fetch(detailsurl)
      .then((response) => response.json())
      .then((result) => {
        setTheMovieDetails(result)
      })
  }

  useEffect(() => {
    

    console.log('About to render');
    console.log(movieID);
    
    fetchMovieDetailsById(movieID)
    console.log("Using Effect");
  }, [])		//	"ERROR is in this line I think

  

  return (
    <div>
      <img src={theMovieDetails.Poster} alt='MoviePoster' />
      <p>Title: {theMovieDetails.Title}</p>
      <p>Plot: {theMovieDetails.Plot}</p>
      <p>Director: {theMovieDetails.Director}</p>
      <p>Released: {theMovieDetails.Released}</p>
    </div>
    
  )
}

export default MovieDetails
