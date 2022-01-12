import { useState, useEffect } from "react";
import axios from "axios";


const Coin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [affordable, setAffordable] = useState(0);

    const myMoney = 20;

    useEffect(() => {
        axios.get('https://api.coinpaprika.com/v1/tickers')
            .then(res => {
                setIsLoading(a => !a);
                setCoins(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function handleOnClick(e) {
        const value = e.target.value;
        const startIdx = value.indexOf('$') + 1;
        const endIdx = value.indexOf('USD');

        const price = parseFloat(value.substring(startIdx, endIdx));
        const myAffordable = myMoney / price.toFixed(3);
        setAffordable(Math.floor(myAffordable));
    };

    return (
        <>  
            <div>
                You have 20$.
                And the number of chosen coins you can get is
                 { affordable } stock.
            </div>
            {
                isLoading
                ? <div>The data is on loading. Please wait.</div>
                : 
                <select onChange={ handleOnClick }>
                    {
                        coins.map((coin, i) => {
                            return (
                                <option key={i}>
                                    { coin.name }
                                    &emsp;
                                    { coin.symbol }
                                    &emsp;
                                    ${ coin.quotes.USD.price } USD
                                </option>
                            )
                        })
                    }
                </select>
            }
        </>
    )
};

export default Coin;