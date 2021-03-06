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
                        <p>??????</p>                  
                    </div>
                    <input type="number" class="quantity" value=1 min=1>
                </div>
                <button class="delBtn" data-id="${itemId}">X</button>
            </div>`

            setTimeout(function() {
                cartList.append(inputItem);
                calTotalPrice(price);

                $('.quantity').off('input', changeQuantity); //?????? ????????? ???????????? ??????????????????.

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

        if(index < 0) { //includes??? ????????????
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
    total.text(`??? ?????? ${totalPrice}???`);
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

const receipt = $('.receipt-bg');

$('#buy-btn').click(function() {
    if(totalPrice != 0) makeReceipt();
})

$('.receipt-bg').on('click', function(event) {
    if(this == event.target) receipt.fadeOut();
})

$('#cancel-btn').click(function() {
    receipt.fadeOut();
})


function makeReceipt() {
    receipt.fadeIn();
    const canvas = document.getElementsByTagName('canvas')[0];
    const final = canvas.getContext('2d');
    final.font = '8px ?????? ??????';

    const tag = '?????????'
    const now = new Date();
    const date = `${ now.getFullYear() + ' ' + now.getMonth() + ' ' + now.getDate() 
    + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() }`;
    const expense = `??? ??????: ${totalPrice}`

    final.fillText(tag, 20, 10);
    final.fillText(date, 60, 10);
    makeItemsList(final);

    final.fillText(expense, 20, 140);
}

function makeItemsList(final) {
    const cartItems = $('.cart-item');

    let list = '';

    for(let i=0; i<cartItems.length; i++) {
        const itemName = cartItems.eq(i).find('.item>h3').text();
        const madeBy = cartItems.eq(i).find('p').eq(0).text();
        const itemPrice = cartItems.eq(i).find('p').eq(1).text();
        const itemQuantity = cartItems.eq(i).find('input').val();

        final.fillText(itemName + ' ' + madeBy, 20, 30 * (i+1));
        final.fillText(`??????:${itemPrice} ??????:${itemQuantity}`, 20, 30 * (i+1.5));
    }
}