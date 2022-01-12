import '../App.css';

function Movie(props) {
    return (
        <>
            <div className="movie-box">
                <div className='movie-content'>
                <img src={ `${ props.movieImg }` }></img>
                <div>
                    <h3>{ props.title } { props.year }</h3>
                    <p>{ props.summary }</p>
                </div>
                </div>
                <ul>
                {
                    props.genres.map((genre, i) => {
                    return (
                        <li key={i}>{ genre }</li>
                    )
                    })
                }
                </ul>
                <div className='movie-bg-img' style={{ backgroundImage: `url(${props.bg})` }}></div>
            </div>
        </>
    )
}

export default Movie;