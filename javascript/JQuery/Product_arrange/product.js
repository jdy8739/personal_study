let productData = [
    {   
        name: 'COCO Eau de Parfum', 
        desc: 'Irresistibly sexy, irrepressibly spirited. A sparkling ambery fragrance that recalls a daring young Coco Chanel. An absolutely modern composition with a strong yet surprisingly fresh character.', 
        price: 54000, 
        src: 'https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg' 
    },
    {   
        name: 'CHANCEL de Toilette', 
        desc: 'A fresh, sparkling floral expression of CHANCE—a surge of energy that sweeps you into a whirlwind of happiness and fantasy.',
        price: 49000, 
        src: 'https://www.sephora.com/productimages/sku/s1117928-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'CHANEL Eau de Parfum', 
        desc: 'nspired by the free and passionate woman who became Coco Chanel, GABRIELLE CHANEL ESSENCE is a more voluptuous, intensely feminine interpretation of the luminous floral fragrance.',
        price: 47900, 
        src: 'https://www.sephora.com/productimages/sku/s2319630-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'CHANCE EAU TENDRE', 
        desc: 'The delicate and unexpected fruity-floral fragrance for women creates a soft whirlwind of happiness, fantasy, and radiance.',
        price: 55000, 
        src: 'https://www.sephora.com/productimages/sku/s1237379-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'Viktor&RolfFlowerbomb', 
        desc: 'This floral perfume for women explodes with an intoxicating whirl of cattleya, jasmine, and rose. Adding a sensual twist on the scent reminiscent of a room filled with rose petals.',
        price: 74000, 
        src: 'https://www.sephora.com/productimages/sku/s1377159-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'CHANEL Eau de Toilette', 
        desc: 'A woody, aromatic fragrance for the man who defies convention; a provocative blend of citrus and woods that liberates the senses. Fresh, clean, and profoundly sensual.',
        price: 62000, 
        src: 'https://www.sephora.com/productimages/sku/s1284710-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'White Moss & Snowdrop Cologne', 
        desc: 'Striking a fragrant contrast, snowdrop petals peek through powdery snow to greet forest-fresh moss…iridescent under winter sunlight.',
        price: 52000, 
        src: 'https://www.sephora.com/productimages/sku/s2475226-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'Wisteria Blue Eau de Parfum', 
        desc: 'This ethereal, floral eau de parfum is created by combining watery notes with the essence of French wisteria, the richness of Bulgarian rose, and imperial jasmine.',
        price: 88000, 
        src: 'https://www.sephora.com/productimages/sku/s2039865-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'TOCCA Stella', 
        desc: 'Stella is a fresh floral fragrance that embraces your flirtatious spirit. It is inspired by a spontaneous romance and is a bright and breezy blend of lavish Italian citrus, sweet freesia, and spicy lily.',
        price: 72000, 
        src: 'https://www.sephora.com/productimages/sku/s963280-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'Wisteria Eau de Rollerball', 
        desc: 'This ethereal, floral eau de parfum is created by combining watery notes with the essence of French wisteria, the richness of Bulgarian rose, and imperial jasmine.',
        price: 66000, 
        src: 'https://www.sephora.com/productimages/sku/s2039873-main-zoom.jpg?imwidth=612' 
    }
]

const productSection = document.querySelector('.container>div #productSection');
//const cards = document.querySelectorAll('.card'); 이거쓰면 nodelist가 반환됨
const cards = document.getElementsByClassName('card');
const price = document.getElementsByClassName('price');

let showDollor = false;
let wonPrice = [];
productData.forEach(item => wonPrice.push(item.price));

//let tmpProductList = [...productData];
const tmp = JSON.stringify(productData);
let tmpProductList = JSON.parse(tmp); //이렇게도 깊은 복사 가능, 하지만 리소스 많이 잡아먹음.

const exchangeRate = 0.00125;

function sortList(list) {
    productSection.innerHTML = '';
    const currency = showDollor == true ? '$' : 'w' 
    list.forEach(product => makeList(product, currency));
};

function makeList(product, currency) {
    const itemSection = document.createElement('div');
    itemSection.className = 'card';
    itemSection.innerHTML = 
        `<div class="pic">
            <img src="${product.src}">
        </div>
        <h4>Product</h4>
        <p class="id">${product.name}</p>
        <p class="desc">${product.desc}</p>
        <p class="price">${product.price + currency}</p>
        <button>more</button>`;

    productSection.append(itemSection);
}

sortList(productData);

document.getElementById('highest').addEventListener('click', function() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'))

    const highest = productData.reduce(function(a, b) {
        return a.price > b.price ? a : b
    }) //마지막 파라미터로 시작값 넣어줄 수 있음.
    const targetIndex = productData.findIndex(item => item.name === highest.name);
    cards[targetIndex].classList.toggle('outlined')
})

document.getElementById('lowest').addEventListener('click', function() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'))

    const lowest = productData.reduce(function(a, b) {
        return a.price < b.price ? a : b
    })
    const targetIndex = productData.findIndex(item => item.name === lowest.name);
    cards[targetIndex].classList.toggle('outlined')
})

document.getElementById('lowToHigh').addEventListener('click', function() {
    wonPrice.sort(function(a, b) {
        return a - b;
    });

    productData.sort(function(a, b) {
        return a.price - b.price;
    });
    sortList(productData);
});

document.getElementById('highToLow').addEventListener('click', function() {
    wonPrice.sort(function(a, b) {
        return b - a;
    });

    productData.sort(function(a, b) {
        return b.price - a.price;
    });
    sortList(productData);
});

document.getElementById('changeCurrency').addEventListener('click', changeCurrency);

function changeCurrency() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'));
    if(!showDollor) {
        wonPrice = [];
        productData.forEach(item => wonPrice.push(item.price));
        
        const dollorPriceData = productData.map(item => item.price * exchangeRate);

        for(let i=0; i<productData.length; i++) productData[i].price = dollorPriceData[i];
        for(let i=0; i<price.length; i++) price[i].innerText = dollorPriceData[i] + '$';
        showDollor = true;
        this.innerText = 'Show Won Price';
    } else {
        for(let i=0; i<productData.length; i++) productData[i].price = wonPrice[i];
        for(let i=0; i<price.length; i++) price[i].innerText = wonPrice[i] + 'w';
        showDollor = false;
        this.innerText = 'Show Dollor Price';
    }
};

// document.getElementById('dollor_price').addEventListener('click', function() {
//     const dollorPriceData = productData.map(function(item) {
//         return item.price * 0.00125
//     })
//     ~~~~~~~~
// }) 위 함수와 같음

document.querySelector('#filterBtn').addEventListener('click', function() {
    if(showDollor) {
        //alert('Please change currency as Won!');
        changeCurrency();
        //return false;
    }
    Array.from(cards).forEach(item => item.classList.remove('outlined'));
    Array.from(cards).forEach(item => item.classList.remove('hide'));

    const filterRange = document.getElementById('limitPrice').value;
    if(filterRange == 0) {
        alert('Please input number!');
        return false;
    }

    //productData = [...tmpProductList]; //이렇게 깊은 복사가 안되네...
    const tmpList = JSON.stringify(tmpProductList);
    productData = JSON.parse(tmpList); //이렇게 바꿈

    productData = productData.filter(item => item.price < filterRange);
    for(let i=cards.length; i>productData.length; i--) cards[i-1].classList.add('hide');

    if(productData.length > 0) sortList(productData);
    else productSection.innerHTML = '<p class="alert">NO PRODUCTS IN RANGE</p>'
});

document.querySelector('#reset').addEventListener('click', function() {
    showDollor = false;
    document.getElementById('changeCurrency').innerText = 'Show Dollor Price';

    //productData = tmpProductList; 여기서 다시 같은 얕은복사로 주소를 공유하면서 겹쳐짐
    // const tmpData = JSON.stringify(tmpProductList);
    // productData = JSON.parse(tmpData); 다시 이렇게 써주든가, 밑과 같이 해결.
    productData = [...tmpProductList];
    sortList(productData);
});
