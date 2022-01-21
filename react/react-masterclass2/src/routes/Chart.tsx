import { useQuery } from "react-query";
import styled from "styled-components"
import { fetchCoinChart } from "../api";
import ReactApexChart from "react-apexcharts";

const ChartForm = styled.div`
    height: 450px;
    width: 450px;
    margin: 60px auto;
`;

function Chart({ coinId }: { coinId: string }) {

    interface IChart {
        close: number
        high: number
        low: number
        market_cap: number
        open: number
        time_close: string
        time_open: string
        volume: number
    }

    const { isLoading, data } = useQuery<IChart[]>('coinChart', () => { return fetchCoinChart(coinId) });

    return (
        <>
            {
                !isLoading ?
                <ChartForm>
                    <ReactApexChart 
                        type="line" 
                        series={[ { name: 'price', data: data?.map(price => price.close) } ]}
                        options={{ 
                            stroke: { 
                                curve: 'smooth'
                            }, 
                            xaxis: { 
                                axisBorder: { show: false },
                                labels: { show: false },
                                type: 'datetime',
                                categories: data?.map(price => price.time_close),
                            },
                            yaxis: { 
                                axisBorder: { show: false },
                                labels: { show: false }
                            },
                            grid: {
                                show: false
                            },
                            chart: {
                                toolbar: {
                                    show: false
                                },
                                background: 'transparant'
                            },
                            theme: {
                                mode: 'dark'
                            },
                            fill: {
                                type: 'gradient',
                                gradient: { gradientToColors: ['blue'] }
                            },
                            colors: ['red'],
                            tooltip: {
                                y: {
                                    formatter: value => value.toFixed(3)
                                }
                            }
                        }}
                    />
                </ChartForm>
                : <p>loading... pls wait.</p>
            }
        </>
    )
}

export default Chart;