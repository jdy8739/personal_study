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
        </div>`
    contentBox.append(itemCard);
}

const cartList = $('#cart-list');
const cartHeight = $('.cart').height();

let putItemsNum = 0;

let items;
let itemNames;
let itemNamesCopied = [];
setTimeout(function() {
    items = $('.card');
    itemNames = $('.card h3');
    Array.from(itemNames).forEach(name => itemNamesCopied.push(name.innerText));

    $('.card').draggable({
        revert: true,
        containment: $('body'),
        snap: $('.cart-put')
    });

    $('.cart-put').droppable({
        drop: function(event, item) {
            const desc = item.draggable[0];
            
            putItemsNum ++;
            $('.cart').css('height', `${putItemsNum * 0.5 * cartHeight + cartHeight}px`);

            const name = desc.getElementsByTagName('h3')[0].innerText;
            const manufacturer = desc.getElementsByTagName('p')[0].innerText;
            const price = desc.getElementsByTagName('p')[1].innerText;
            const imgSrc = desc.getElementsByTagName('img')[0].src;

            const inputItem = 
            `<div>
                <img src="${imgSrc}">
                <div>
                    <h3>${name}</h3>
                    <p>${manufacturer}</p>
                    <p>${price}</p>
                    <div class="inputBtn">
                        <p>수량</p>                  
                    </div>
                    <input type="number" class="quantity">
                </div>
            </div>`

            setTimeout(function() {
                cartList.append(inputItem);
            }, 500);
        }
    })

}, 100);

const searchBar = $('#search');
searchBar.on('input', function() {
    const keyWord = searchBar.val();
    
    for(let i=0; i<items.length; i++) {
        const index = itemNames[i].innerText.indexOf(keyWord);

        if(index < 0) { //includes도 가능할듯
            items.eq(i).addClass('hide');
        } else {
            itemNames.eq(i).html(itemNamesCopied[i]);
            items.eq(i).removeClass('hide');
            const replaced = itemNames.eq(i).html().replace(keyWord, `<span class="highLight">${keyWord}</span>`);
            itemNames.eq(i).html(replaced);
        }
    }
});



