const usersURL = 'http://localhost:8080/api/users/';
const usernameURL = 'http://localhost:8080/api/users/username/'

const entry = document.getElementById('entry');
const login = document.getElementById('login');
const signup = document.getElementById("signup");

entry.addEventListener('submit', verifyLogin);

function verifyLogin(e)
{
    e.preventDefault();
    console.log("Form submitted");
    console.log(`The username was: ${document.getElementById('username').value}`);
    console.log(`The password was: ${document.getElementById('password').value}`);

    fetch(cryptoknightsURL, 
        {
            method: GET
        })
}

function verifyCreateAccount(e)
{
    e.preventDefault();
    console.log("Form submitted");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value
    console.log(`The username was: ${username}`);
    console.log(`The password was: ${password}`);

    const res = fetch(cryptoknightsURL, 
        {
            method: POST,
            body: 
            {
                "username" : username,
                "password" : password
            }
        });
    
}