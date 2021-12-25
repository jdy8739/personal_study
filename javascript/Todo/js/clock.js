const clock = document.querySelector('h2#clock')

sayHello() //호이스팅되서 작동 가능?

function sayHello() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const sec = String(now.getSeconds()).padStart(2, '0')

    const time = `<span class="white">${year}/${month + 1}/${date}</span> ${hour}:${minutes}:${sec}`;
    clock.innerHTML = `<p>${time}</p>`
}

setInterval(sayHello, 1000)