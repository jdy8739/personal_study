import styled from "styled-components"
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinChart } from "../api";
import { IChart, ChartForm } from "./Chart";


function Price({ coinId }: { coinId: string }) {

    const { isLoading, data } = useQuery<IChart[]>('coinPrice', () => { return fetchCoinChart(coinId) });

    return (
        <>
            {
                isLoading ? <p>loading... pls wait.</p>
                : 
                <ChartForm>
                    <ReactApexChart
                        type='candlestick'
                        series={[ { name: 'price', data: 
                        data?.map(price => { return { x: price.time_close, y: 
                            [ price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3) ]
                        }}) } ]}

                        options={{ 
                            chart: {
                                toolbar: {
                                    show: false
                                },
                                background: 'transparant'
                            },
                            theme: {
                                mode: "dark"
                            },
                            yaxis: { 
                                labels: {
                                    formatter: function(val, index) {
                                        return val.toFixed(3);
                                    }
                                }
                            },
                            xaxis: { 
                                axisBorder: { show: false },
                                labels: { show: false },
                                type: 'datetime',
                                categories: data?.map(price => price.time_close),
                            }
                        }}
                    >
                    </ReactApexChart>
                </ChartForm>
            }
        </>
    )
}

export default Price;