import { useLocation } from "react-router-dom";


function Search() {
    const location = useLocation();
    console.log(location);
    const keyword = new URLSearchParams(location.search).get('keyword');
    return (
        <>
            <h1>{ keyword }</h1>
        </>
    )
}

export default Search;