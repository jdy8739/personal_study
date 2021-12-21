const productData = [
    {   
        name: 'COCO Eau de Parfum', 
        desc: 'Irresistibly sexy, irrepressibly spirited. A sparkling ambery fragrance that recalls a daring young Coco Chanel. An absolutely modern composition with a strong yet surprisingly fresh character.', 
        price: '54,000', 
        src: 'https://www.sephora.com/productimages/sku/s513168-main-zoom.jpg' 
    },
    {   
        name: 'CHANCEL de Toilette', 
        desc: 'A fresh, sparkling floral expression of CHANCE—a surge of energy that sweeps you into a whirlwind of happiness and fantasy.',
        price: '49,000', 
        src: 'https://www.sephora.com/productimages/sku/s1117928-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'CHANEL Eau de Parfum', 
        desc: 'nspired by the free and passionate woman who became Coco Chanel, GABRIELLE CHANEL ESSENCE is a more voluptuous, intensely feminine interpretation of the luminous floral fragrance.',
        price: '47,900', 
        src: 'https://www.sephora.com/productimages/sku/s2319630-main-zoom.jpg?imwidth=612' 
    },
    {   
        name: 'CHANEL Eau de Toilette', 
        desc: 'A woody, aromatic fragrance for the man who defies convention; a provocative blend of citrus and woods that liberates the senses. Fresh, clean, and profoundly sensual.',
        price: '62,000', 
        src: 'https://www.sephora.com/productimages/sku/s1284710-main-zoom.jpg?imwidth=612' 
    }
]

const names = document.getElementsByClassName('id')
const desc = document.getElementsByClassName('desc')
const price = document.getElementsByClassName('price')
const img = document.getElementsByTagName('img')

for(let i=0; i<names.length; i++) {
    names[i].innerText = productData[i].name;
    desc[i].innerText = productData[i].desc;
    price[i].innerText = productData[i].price + 'w';
    img[i].src = productData[i].src;
};


