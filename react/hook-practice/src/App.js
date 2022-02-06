import { useEffect, useRef, useState } from "react";
import useAxios from "./useAxios";

function App() {

  const { loading, status, data, fetchAgain } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json"
  });

  return (
    <div className="App">
      <h1>{ status }</h1>
      <h2>{ loading ? 'loading...' : 'done' }</h2>
      <button onClick={ fetchAgain }>fetch again</button>
    </div>
  );
}

export default App;
