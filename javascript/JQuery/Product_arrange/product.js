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
        name: 'CHANEL Eau de Toilette', 
        desc: 'A woody, aromatic fragrance for the man who defies convention; a provocative blend of citrus and woods that liberates the senses. Fresh, clean, and profoundly sensual.',
        price: 62000, 
        src: 'https://www.sephora.com/productimages/sku/s1284710-main-zoom.jpg?imwidth=612' 
    }
]

const cards = document.getElementsByClassName('card')
const names = document.getElementsByClassName('id')
const desc = document.getElementsByClassName('desc')
const price = document.getElementsByClassName('price')
const img = document.getElementsByTagName('img')

let showDollor = false;
let wonPrice = [];
productData.forEach(item => wonPrice.push(item.price));

const tmpProductList = productData;

function sortList(list) {
    const currency = showDollor == true ? '$' : 'w' 
    for(let i=0; i<list.length; i++) {
        names[i].innerText = list[i].name;
        desc[i].innerText = list[i].desc;
        price[i].innerText = list[i].price + currency;
        img[i].src = list[i].src;
    };
};

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

document.getElementById('changeCurrency').addEventListener('click', function() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'));
    if(!showDollor) {
        wonPrice = [];
        productData.forEach(item => wonPrice.push(item.price));
        
        const dollorPriceData = productData.map(item => item.price * 0.00125);
        
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
})

// document.getElementById('dollor_price').addEventListener('click', function() {
//     const dollorPriceData = productData.map(function(item) {
//         return item.price * 0.00125
//     })
//     ~~~~~~~~
// }) 위 함수와 같음

document.querySelector('#filterBtn').addEventListener('click', function() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'));
    if(showDollor) {
        alert('Please change currency as Won!');
        return false;
    }
    Array.from(cards).forEach(item => item.classList.remove('hide'));

    productData = tmpProductList;
    const filterRange = document.getElementById('limitPrice').value;
    if(filterRange == 0) {
        alert('Please input number!');
        return false;
    }

    productData = productData.filter(item => item.price < filterRange);
    sortList(productData);
    for(let i=cards.length; i>productData.length; i--) cards[i-1].classList.add('hide');
});

document.querySelector('#reset').addEventListener('click', function() {
    Array.from(cards).forEach(item => item.classList.remove('outlined'));
    Array.from(cards).forEach(item => item.classList.remove('hide'));
    productData = tmpProductList;
    sortList(productData);
});
