import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

function MovieList() {
  //  State variables
  const [searchTerm, setSearchTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [movieNotFound, setMovieNotFound] = useState(false)

  useEffect(() => {
    //  Use getItem to get movie name stored in local storage
		let term = localStorage.getItem("searchTerm")
		//alert("Term = " + term)
		
		if(term) {
			fetchMovies(term)
        }
    }, []) //  Added ",[]" between the "}" and the ")"

  const fetchMovies = (movieName) => {
    const listurl = `https://www.omdbapi.com/?s=${movieName}&apikey=2c2e69a0`

    //  Place movie name into local storage
    localStorage.setItem("searchTerm", movieName)

    //  Attempting the movie search
    fetch(listurl)
      .then((response) => response.json())
      .then((result) => {
        if (result.Error) {
          setMovies([])
          setMovieNotFound(true)
        } else {
          setMovies(result.Search)
          setMovieNotFound(false)
        }
      })
  }

  const clearAll = () => {
    setMovies([])
    setSearchTerm("")
    localStorage.removeItem("searchTerm")
    //setMovieNotFound(false)
  }

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const movieItems = movies.map((movie) => {
    return (
      <div key={movie.imdbID}>
        <img src={movie.Poster} alt='Movie Poster' />
        <h2>{movie.title}</h2>
        <NavLink to={`/items?movieID=${movie.imdbID}`}>
          <button>Details</button>
        </NavLink>
      </div>
    )
  })

  return (
    <div>
      <h1>Movie List</h1>
      Search: <input type='text' onChange={handleSearchTermChange} />
      <button onClick={() => fetchMovies(searchTerm)}>Search</button>
      <button onClick={clearAll}>Clear</button>
     {movieItems}
      {movieNotFound ? <h1>Movie Not Found</h1> : null}
    </div>
  )
}

export default MovieList
