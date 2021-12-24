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

let items;
let itemNames;
let itemNamesCopied = [];
setTimeout(function() {
    items = $('.card');
    itemNames = $('.card h3');
    Array.from(itemNames).forEach(name => itemNamesCopied.push(name.innerText));
}, 100);

const searchBar = $('#search');
searchBar.on('input', function() {
    const keyWord = searchBar.val();
    console.log(keyWord)
    
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

