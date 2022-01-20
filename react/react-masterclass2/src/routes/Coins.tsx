import { useParams } from "react-router-dom";


function Coins() {
    interface CoinProps {
        coinId: string
    }

    const { coinId } = useParams<CoinProps>();

    return (
        <>
            <h1>Coins { coinId }</h1>
        </>
    )
};

export default Coins;