import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import CoinList from '../components/CoinList';
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";


const TitleBox = styled.div`
    text-align: center;
    padding-top: 200px;
`;

const Title = styled.h1`
    font-size: 60px;
`;

function Coin() {

    interface ICoin {
        id: string,
        name: string,
        symbol: string,
        rank: 1,
        is_new: boolean,
        is_active: boolean,
        type: string
    }
    
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const setUsDarkAtom = useSetRecoilState(isDarkAtom);

    const toggleTheme = function() {
        setUsDarkAtom(theme => !theme);
    };

    return (
        <>  <Helmet>
                <title>All COINS</title>
            </Helmet>
            <TitleBox>
                <Title>Coin</Title>
                <br></br>
                <button onClick={toggleTheme}>toggle theme</button>
            </TitleBox>
            {
                isLoading ?
                <div>로딩중...</div>
                :
                data?.slice(0, 100).map((coin, i) => {
                    return (
                        <div key={i}>
                            <CoinList coinName={coin.name} coinId={coin.id} symbol={coin.symbol}/>
                        </div>
                    )
                })
            }
        </>
    )
};

export default Coin;
