import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


const TitleBox = styled.div`
    text-align: center;
    padding-top: 200px;
`;

const Title = styled.h1`
    font-size: 60px;
`;

function Coin() {

    interface CoinArr {
        id: string,
        name: string,
        symbol: string,
        rank: 1,
        is_new: boolean,
        is_active: boolean,
        type: string
    }

    const [coinArr, setCoinArr] = useState<CoinArr[]>([]);

    useEffect(() => {
        axios.get('https://api.coinpaprika.com/v1/coins')
            .then(res => {
                const tmpArr: CoinArr[] = [];
                for(let i=0; i<100; i++) {
                    tmpArr.push(res.data[i]);
                }
                setCoinArr(tmpArr);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>  
            <TitleBox>
                <Title>Coin</Title>
                <br></br>
                <button>click me</button>
            </TitleBox>
            {
                coinArr.map((a, i) => {
                    return (
                        <div key={i}>
                            { a.name }
                        </div>
                    )
                })
            }
        </>
    )
};

export default Coin;