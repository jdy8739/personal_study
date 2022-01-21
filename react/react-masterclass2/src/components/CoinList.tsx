import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.div`
    background-color: ${ props => props.theme.textColor };
    width: 450px;
    height: 80px;
    border-radius: 12px;
    margin: 25px auto;
    display: flex;
    align-items: center;
    span {
        color: rgb(204, 204, 204);
        font-weight: bold;
        transition: all 1s;
    }
    &:hover {
        span {
            color: ${ props => props.theme.btnColor };
        }
    }
`;

const SymbolImg = styled.img`
    padding-left: 18px;
    width: 40px;
    height: 40px;
`;

function CoinList({ coinName, coinId, symbol }: { coinName: string, coinId: string, symbol: string }) {
    return (
        <>  
            <div>
                <Link to={{ pathname: `/detail/${ coinId }`, state: { name: coinName } }}>
                    <List>
                        <SymbolImg src={ `https://cryptoicon-api.vercel.app/api/icon/${ symbol.toLowerCase() }` }/>
                        &emsp;
                        <span>{ coinName }</span>
                    </List>
                </Link>
            </div>
        </>
    )
}

export default CoinList;
export { SymbolImg };