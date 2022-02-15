const MY_KEY = '9c36f611665ed3d1958c18199f8785ea';
const BASE_URL = 'https://api.themoviedb.org/3';

export function getMovies() {
    return fetch(`${ BASE_URL }/movie/now_playing?api_key=${ MY_KEY }`)
        .then(res => res.json());
};

export function getPoster(path: string, size: string = 'original') {
    return `https://image.tmdb.org/t/p/${ size }${ path }`;
};