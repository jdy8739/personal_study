import react from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Detail(props) {
    let { id } = useParams();
    let history = useHistory();

    const idx = props.shoes.findIndex(item => item.id == parseInt(id));

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <img src={ `${ props.shoes[idx].imgSrc }` } width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5"></h4>
                <p>{ props.shoes[idx].title }</p>
                <p>{ props.shoes[idx].price }</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
            </div>
        </div> 
    );
}

export { Detail };