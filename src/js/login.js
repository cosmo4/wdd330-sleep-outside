import { getParam, alertMessage, getLocalStorage, setLocalStorage, renderHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";
import { loginRequest } from "./externalServices.mjs";


 renderHeaderFooter();

 url = 'http://server-nodejs.cit.byui.edu:3000/login';

 const redirect = getParam('redirect');
 const loginBtn = document.querySelector('#login');
 loginBtn.addEventListener('click', function(){
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login({username, password}, redirect);

 })


