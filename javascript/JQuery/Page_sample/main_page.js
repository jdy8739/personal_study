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

const itemBoxSize = 162;

const cartList = $('#cart-list');
const total = $('.total');
let totalPrice = 0;
let cartHeight;

let putItemsNum = 0;
let itemId = 0;

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

            const name = desc.getElementsByTagName('h3')[0].innerText;
            const price = desc.getElementsByTagName('p')[1].innerText;
            
            const items = document.getElementsByClassName('cart-item');
            
            for(let i=0; i<items.length; i++) {
                const item = items[i];
                const itemName = item.getElementsByTagName('h3')[0].innerText;
                
                if(itemName == name) {
                    item.getElementsByTagName('input')[0].value ++;
                    calTotalPrice(price);
                    return;
                }
            }
            
            itemId ++;
            putItemsNum ++;
            cartHeight = $('.cart').outerHeight(); 
            $('.cart').css('height', `${cartHeight + itemBoxSize}px`);

            const manufacturer = desc.getElementsByTagName('p')[0].innerText;
            const imgSrc = desc.getElementsByTagName('img')[0].src;

            const inputItem = 
            `<div class="cart-item" data-id="${itemId}">
                <img src="${imgSrc}">
                <div class="item">
                    <h3>${name}</h3>
                    <p>${manufacturer}</p>
                    <p>${price}</p>
                    <div class="inputBtn">
                        <p>수량</p>                  
                    </div>
                    <input type="number" class="quantity" value=1 min=1>
                </div>
                <button class="delBtn" data-id="${itemId}">X</button>
            </div>`

            setTimeout(function() {
                cartList.append(inputItem);
                calTotalPrice(price);

                $('.quantity').off('input', changeQuantity); //얘로 기존의 이벤트를 제거해줘야함.

                $('.delBtn').click(delCartList);
                $('.quantity').on('input', changeQuantity);
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

function delCartList() {
    const cartItems = document.querySelectorAll('.cart-item');
    const itemToDel = this.dataset.id;

    for(let i=0; i<cartItems.length; i++) {
        if(cartItems[i].dataset.id == itemToDel) {

            const price = $('.item>p:nth-child(3)').eq(i).text(); 
            const quantity = $('.quantity').eq(i).val();
            const substract = parseInt(price) * quantity;

            calTotalPrice(-substract);

            cartItems[i].remove();

            putItemsNum --;
            cartHeight = $('.cart').outerHeight(); 
            $('.cart').css('height', `${cartHeight - itemBoxSize}px`);
            return;
        }
    }
}

function calTotalPrice(priceToCal) {
    totalPrice += parseInt(priceToCal);
    total.text(`총 합계 ${totalPrice}원`);
}

function changeQuantity() {
    //const quantity = this.value;
    const cartItems = $('.cart-item');
    totalPrice = 0;
    let tmpTotal = 0;
    let tmpPrice;

    for(let i=0; i<cartItems.length; i++) {
        const quantity = cartItems.eq(i).find('.quantity').val();
        const price = cartItems.eq(i).find('.item>p:nth-child(3)').text();

        tmpPrice = quantity * parseInt(price);
        tmpTotal += tmpPrice;
    }
    calTotalPrice(tmpTotal);
}