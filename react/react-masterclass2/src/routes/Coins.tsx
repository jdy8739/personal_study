import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { SymbolImg } from "../components/CoinList";
import Chart from "./Chart";
import Price from "./Price";

import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    width: 100%;
    text-align: center;
    padding-top: 180px;
`;

const Title = styled.h1`
    font-size: 40px;
`;

const SubTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Coins() {
    interface CoinProps {
        coinId: string
    }

    interface ICoinInfo {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        is_new: boolean;
        is_active: boolean;
        type: string;
        description: string;
        message: string;
        open_source: boolean;
        started_at: string;
        development_status: string;
        hardware_wallet: boolean;
        proof_type: string;
        org_structure: string;
        hash_algorithm: string;
        first_data_at: string;
        last_data_at: string;
    }
    
    interface ICoinPrice {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        beta_value: number;
        first_data_at: string;
        last_updated: string;
        quotes: {
            USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            };
        };
    }

    const { coinId } = useParams<CoinProps>();
    const { state } = useLocation<{ name: string }>();

    const priceMatch = useRouteMatch("/detail/:coinId/price");
    const chartMatch = useRouteMatch("/detail/:coinId/chart");

    const { isLoading: isInfoLoading, data: coinInfo } = useQuery<ICoinInfo>(['coinInfo', coinId], () => { return fetchCoinInfo(coinId) });
    const { isLoading: isPriceLoading, data: coinPrice } = useQuery<ICoinPrice>(['coinPrice', coinId], () => { return fetchCoinTicker(coinId) }, { refetchInterval: 5000 });

    const isLoading: boolean = !isInfoLoading || !isPriceLoading;

    return (
        <>  
            <Helmet>
                <title>{ state?.name ?? coinInfo?.name }</title>
            </Helmet>
            <Container>
                <Title>{ state?.name ?? coinInfo?.name }</Title>
                <br></br>
                <SubTitle>
                    <p>Coins { coinId }</p>
                    <SymbolImg src={ `https://cryptoicon-api.vercel.app/api/icon/${ coinInfo?.symbol.toLowerCase() }` }/>
                </SubTitle>
                <br></br>

                {
                    isLoading ?
                    <Overview>
                        <OverviewBox>
                            <p>{ 'rank: ' + coinInfo?.rank ?? 'loading...' }</p>
                            <p>{ 'symbol: ' + coinInfo?.symbol ?? 'loading...' }</p>
                            <p>{ `price: ${coinPrice?.quotes.USD.price.toFixed(3) }$` ?? 'fetching' }</p>
                        </OverviewBox>
                        <DescBox>
                        <p>{ coinInfo?.description ?? 'loading...' }</p>
                        </DescBox>
                        <OverviewBox>
                            <p>{ 'total suppply: ' + coinPrice?.total_supply ?? 'loading...' }</p>
                            <p>{ 'max supply: ' + coinPrice?.max_supply ?? 'loading...' }</p>
                        </OverviewBox>
                    </Overview>
                    : <div>loading pls wait..</div>
                }
                <br></br>
                <TabContainer>
                    <TabBtn isActive={ chartMatch !== null }>
                        <Link to={`/detail/${coinId}/chart`}><p>Chart</p></Link>
                    </TabBtn>
                    <TabBtn isActive={ priceMatch !== null }>
                        <Link to={`/detail/${coinId}/price`}><p>Price</p></Link>
                    </TabBtn>
                    <TabBtn>
                        <Link to='/'><p>Back</p></Link>
                    </TabBtn>
                </TabContainer>
                <Switch>
                    <Route path={`/detail/:coinId/chart`}>
                        <Chart coinId={coinId}/>
                    </Route>
                    <Route path={`/detail/:coinId/price`}>
                        <Price coinId={coinId}/>
                    </Route>
                </Switch>
            </Container>
        </>
    )
};

export default Coins;


const Overview = styled.div`
    width: 400px;
    margin: auto;
    margin-top: 25px;
`;

const OverviewBox = styled.div`
    background-color: #282c34;
    width: 100%;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
    p {
        margin: 0px 10px;
    }
    font-weight: bold;
`;

const DescBox = styled.div`
    width: 100%;
    height: 120%;
    min-height: 180px;
    display: flex;
    align-items: center;
`;

const TabContainer = styled.div`
    display: flex;
    width: 400px;
    margin: auto;
    justify-content: space-between;
`;

const TabBtn = styled.div<{ isActive?: boolean }>`
    background-color: #282c34;
    width: 30%;
    height: 30px;
    border-radius: 8px;
    p {
        margin-top: 5px;
        transition: all 0.5s;
        color: ${ props => props.isActive ? props.theme.btnColor : props.theme.textColor };
    }
`;




