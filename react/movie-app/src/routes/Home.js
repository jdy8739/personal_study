import '../App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import Movie from '../components/Movie';


function Home() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')
      .then(res => {
        console.log(res.data.data.movies);
        setMovies(res.data.data.movies);
      })
  }, []);

  return (
    <div className="App">
      <div>
        <div className='container'>
          {
            movies.map((movie, i) => {
              return (
                <div key={i}>
                  <Movie bg={movie.background_image_original} movieImg={movie.medium_cover_image} title={movie.title} year={movie.year}
                  summary={movie.summary} genres={movie.genres}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Home;