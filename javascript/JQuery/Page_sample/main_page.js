$.ajax({
    url: 'resources1 (1)/store.json',
    type: 'GET'
}).done(function(res) {
    const contentBox = $('.content-box:nth-child(3)');
    res.products.forEach(item => makeList(item, contentBox));
})

function makeList(item, contentBox) {
    const itemCard = 
        `<div class="card">
            <img src="resources1 (1)/${item.photo}">
            <h3>${item.product_name}</h3>
            <p>${item.brand_name}</p>
            <div class="price">
                <p>${item.price}</p>
            </div>
        </div>&emsp; &emsp;`
    contentBox.append(itemCard);
}