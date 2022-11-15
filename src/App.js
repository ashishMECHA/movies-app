import {useEffect} from 'react';
import { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './search.svg';


const API_URL = 'http://www.omdbapi.com?apikey=5357a288';
/*const movie ={
        "Title": "Superman & Lois",
        "Year": "2021–",
        "imdbID": "tt11192306",
        "Type": "series",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOGYyMmViMjgtZjViZi00NjkzLThjZGItMzZhYmZmOWZlMzdhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" 
}*/



const App = () => {

const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState([]);


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`); /*This is going to call our api*/
        const data = await response.json(); /* once we get the response we have to get the data from it*/
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('superman');
    }, []);
    
    return(
        <div className="app">
            <h1>MoviesMania</h1>

            <div className="search">
                <input placeholder='Search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" />
                <img src= {searchIcon} alt="search" onClick = {() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0 ?(
                <div className='container'>
                    <MovieCard movie={movies[0]} /> 
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}   
                </div>
                ) : (
                    <div className='empty'>
                      <h2>No Movies Found</h2>
                    </div>
                )   
            }    
        </div>
  );
}

export default App;
