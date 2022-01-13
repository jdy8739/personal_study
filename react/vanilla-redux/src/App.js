import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home.js';
import Detail from './routes/Detail.js';
import { Provider } from "react-redux";
import store from "./store.js";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/detail/:id" element={ <Detail/> }/>
                    <Route path="/" element={ <Home/> }/>
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}

export default App;