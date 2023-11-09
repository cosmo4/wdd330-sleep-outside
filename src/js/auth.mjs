import { jwtDecode } from "jwt-decode";
const tokenKey = 'so_token';

export async function login(creds, redirect= "/"){
   try {
       const token = await loginRequest(creds);
       setLocalStorage(tokenKey, token);
       window.location = redirect;
   } catch (err) {
       alertMessage(err.message.message);
   }
}

function isTokenValid(token) {
   
    if (token) {

        const decoded = jwtDecode(token);

        let currentDate = new Date();

        if (decoded.exp * 1000 < currentDate.getTime()) {
     
        console.log("Token expired.");
        return false;
        } else {
       
        console.log("Valid token");
        return true;
        }
    } else return false;
}
export function checkLogin() {
    // get the token from localStorage
    const token = getLocalStorage(tokenKey);
    // use the isTokenValid function to check the validity of our token
    const valid = isTokenValid(token);
    // if the token is NOT valid
    if (!valid) {
      //remove stored token
      localStorage.removeItem(tokenKey);
      // redirect to login while sending the current URL along as a parameter
      // grab the current location from the browser
      const location = window.location;
      // check out what location contains
      console.log(location);
      // redirect by updating window.location =
      window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token; //if they are logged in then just return the token.
  }