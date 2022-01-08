import '../App.css';

function Post(props) {

    function addThumbs() {
        const newThumbs = [...props.content];
        newThumbs[props.idx].thumbs ++;

        props.altContent(newThumbs);
    };

    return (
        <>
            <div>
                <p>{ props.content[props.idx].title }</p>
                <p>2022 01 08</p>
                <p>
                    { props.content[props.idx].thumbs }
                    &emsp;
                    <span onClick={ addThumbs }>👍</span>
                </p>
            </div>
        </>
    )
}

export default Post;