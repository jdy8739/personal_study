const descriptions = [
    { 
        desc: 'One million Earths can fit inside the Sun'
    },
    { 
        desc: 'The sunset on Mars appears blue'
    },
    { 
        desc: 'One day on Venus is longer than one year'
    },
    { 
        desc: 'There is a planet made of diamonds'
    },
    { 
        desc: 'Space is completely silent'
    }
];

const images = [ 'bg1', 'bg2', 'bg3', 'bg4', 'bg5' ];

const doYouKnow = document.querySelector('#letterBox span:first-child');
const desc = document.querySelector('#letterBox span:last-child');
const backImg = document.createElement('img');

const ranNum = Math.floor(Math.random() * descriptions.length);

doYouKnow.innerText = 'DO YOU KNOW?';
desc.innerText = descriptions[ranNum].desc;
desc.classList.add('white');

backImg.src = `img/${images[ranNum]}.jpg`

document.body.appendChild(backImg);
backImg.classList.add('backImg');

