const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login-form input')

const greeting = document.querySelector('#greeting')

const HIDDEN_CLASSNAME = 'hidden';

function onLoginBtn(event) {
    event.preventDefault();
    console.log(event)

    loginForm.classList.add('hidden');
    //loginForm.style.visibility = 'hidden';

    const value = loginInput.value
    localStorage.setItem('username', value)

    loginInput.value = '';
    showUserName(value);
}

loginForm.addEventListener("submit", onLoginBtn)

const savedName = localStorage.getItem('username')

if(savedName == null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME)
}
else {
    //loginForm.classList.add(HIDDEN_CLASSNAME)
    showUserName(savedName)
    greeting.addEventListener("click", makeDefault)
}

function showUserName(userName) {
    greeting.innerHTML = `<h1>HI <span>${userName}</span></h1>`
    greeting.classList.remove(HIDDEN_CLASSNAME)
} 

function makeDefault() {
    alert('log-out');
    greeting.classList.toggle(HIDDEN_CLASSNAME)
    loginForm.classList.toggle(HIDDEN_CLASSNAME)
    localStorage.removeItem('username')
}