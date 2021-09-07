
// DASHBOARD - Portfolio Card element getters

const totalBitcoin = document.querySelector("#total-bitcoin");
const totalEthereum = document.querySelector("#total-ethereum");
const totalDogecoin = document.querySelector("#total-dogecoin");
const totalUsd = document.querySelector("#total-usd");
const totalValue = document.querySelector("#total-value");

// Portfolio Card element getters

// DASHBOARD - Deposit/Make Trade card element getters

const depositForm = document.querySelector("#deposit-form")
const transferFromDropdown = document.querySelector("#transfer-from");
const transferToDropdown = document.querySelector("#transfer-to");
const transferToAmountField = document.querySelector("#transfer-to-amount");
const transferFromAmountField = document.querySelector("#transfer-from-amount");
const tradeButton = document.querySelector("#trade");

// DASHBOARD - Deposit/Make Trade card element getters end

// LOGIN - Login element getters

const loginForm = document.querySelector("#login-form")
const loadRegistrationButton = document.querySelector("#load-register")

// LOGIN - end

// REGISTRATION - Registration Element getters

const registrationForm = document.querySelector("#registration-form")

// REGISTRATION - end

// VIEWS

const dashboardView = document.querySelector("#screen-dashboard")
const loginView = document.querySelector("#screen-login")
const registrationView = document.querySelector("#screen-register")

// VIEWS - end



// NAVBARS - toggle depending on isLoggedIn boolean

const loggedInNav = document.querySelector("#logged-in-nav")
const loggedOutNav = document.querySelector("#logged-out-nav")
let isLoggedIn = false;
const logoutButton = document.querySelector("#logout")

// NAVBARS - end

// Registration Logic

const loadRegistrationScreen = (e) => {
    registrationView.classList.remove("d-none")
    loginView.classList.add("d-none")
    dashboardView.classList.add("d-none")
}

const registerNewUser = async (e) => {
    e.preventDefault()
    const firstName = document.querySelector("#firstname").value
    const lastName = document.querySelector("#lastname").value
    const email = document.querySelector("#email").value
    const username = document.querySelector("#newUsername").value
    const password = document.querySelector("#newPassword").value
    const newUser = {
        firstName,
        lastName,
        email,
        username,
        password
    }
    const user = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify(newUser)
    })
        .then((res) => res.json());
    if (user) {
        toggleLoginStatus()
        loadPortfolioScreen(user)
    } else {
        console.log("Something went wrong")
        loadLoginScreen()
    }
}

registrationForm.addEventListener('submit', registerNewUser);

// Registration End

// Login Logic

const loadLoginScreen = () => {
    loginView.classList.remove("d-none")
    dashboardView.classList.add("d-none")
    registrationView.classList.add("d-none")
}

const verifyUser = async (e) => {
    e.preventDefault()
    const users = await fetch("http://localhost:8080/api/users").then((res) => res.json());
    console.log(users)
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    for (user of users) {
        if (user.username === username.value) {
            if (user.password === password.value) {
                username.value = "";
                password.value = "";
                toggleLoginStatus()
                loadPortfolioScreen(user)
                return;
            }
        }
    }
    console.log("Wrong username or password")
}

const logout = (e) => {
    e.preventDefault;
    isLoggedIn = false;
    toggleLoginStatus()
    loadLoginScreen();
}

const toggleLoginStatus = () => {
    isLoggedIn = !isLoggedIn
    loggedInNav.classList.toggle("d-none")
    loggedOutNav.classList.toggle("d-none")
}

loginForm.addEventListener('submit', verifyUser);
logoutButton.addEventListener('click', logout)
loadRegistrationButton.addEventListener('click', loadRegistrationScreen)

// Login end


// Dashboard Start

const loadPortfolioScreen = async (user) => {
    if (isLoggedIn) {
        dashboardView.classList.remove("d-none");
        loginView.classList.add("d-none");
        registrationView.classList.add("d-none");
        await getPortfolio(2)
    } else {
        loadLoginScreen()
    }
}

const getPortfolio = async (id) => {
    const portfolio = await fetch(`http://localhost:8080/api/portfolios/${id}`).then((res) => res.json());
    const { bitcoin, ethereum, dogecoin, usd, portfolioName } = portfolio;
    totalBitcoin.innerHTML = parseFloat(bitcoin);
    totalEthereum.innerHTML = parseFloat(ethereum);
    totalDogecoin.innerHTML = parseFloat(dogecoin);
    totalUsd.innerHTML = parseFloat(usd);
    const name = document.querySelector("#portfolio-name");
    name.innerText = portfolioName;
    addTransferFromOptions(bitcoin, ethereum, dogecoin, usd)
    calculateValue()
}

const calculateValue = async (e) => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";
    const coinData = await fetch(url).then(response => response.json());
    let bitcoin = parseFloat(totalBitcoin.innerHTML) * coinData.bitcoin.usd;
    let ethereum = parseFloat(totalEthereum.innerHTML) * coinData.ethereum.usd;
    let dogecoin = parseFloat(totalDogecoin.innerHTML) * coinData.dogecoin.usd;
    let usd = parseFloat(totalUsd.innerHTML);
    const value = (bitcoin + ethereum + dogecoin + usd).toFixed(2);
    console.log(value);
    totalValue.innerHTML = `${value}`;
    // setTimeout(calculateValue, 10000)
}

const addTransferFromOptions = (bitcoin, ethereum, dogecoin, usd) => {
    const portfolioTotals = {
        bitcoin,
        ethereum,
        dogecoin,
        usd
    };
    while (transferFromDropdown.firstChild) {
        console.log("in here")
        transferFromDropdown.removeChild(transferFromDropdown.firstChild);
    }
    for (currency in portfolioTotals) {
        console.log(portfolioTotals[currency]);
        if (portfolioTotals[currency] > 0) {
            const option = document.createElement("option");
            option.innerText = currency === "usd" ? "USD" : currency[0].toUpperCase() + currency.slice(1);
            option.setAttribute("value", currency);
            transferFromDropdown.append(option);
        }
    }
};

const convertCrypto = async (e) => {
    const { value: outCurrency } = transferFromDropdown;
    const { value: inCurrency } = transferToDropdown;
    console.log(outCurrency)
    if (inCurrency === "usd") {
        const outUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${outCurrency}&vs_currencies=usd`
        const data = await fetch(outUrl).then((res) => res.json());
        transferToAmountField.value = data[outCurrency].usd * transferFromAmountField.value;
    } else if (outCurrency === "usd") {
        const inUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${inCurrency}&vs_currencies=usd`
        const data = await fetch(inUrl).then((res) => res.json());
        transferToAmountField.value = transferFromAmountField.value / data[inCurrency].usd
    } else {
        const outUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${outCurrency}&vs_currencies=usd`
        const inUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${inCurrency}&vs_currencies=usd`
        const selling = await fetch(outUrl).then((res) => res.json());
        const buying = await fetch(inUrl).then((res) => res.json());
        const inCurrencyValue = buying[inCurrency].usd;
        const buyingPower = selling[outCurrency].usd * transferFromAmountField.value;
        transferToAmountField.value = buyingPower / inCurrencyValue;
    }

}

const makeTrade = async (e) => {
    e.preventDefault()
    const { value: outCurrency } = transferFromDropdown;
    const { value: inCurrency } = transferToDropdown;
    console.log('in ' + inCurrency);
    console.log('out ' + outCurrency)
    switch (outCurrency) {
        case "bitcoin":
            totalBitcoin.innerHTML = parseFloat(totalBitcoin.innerHTML) - transferFromAmountField.value;
            break;
        case "ethereum":
            totalEthereum.innerHTML = parseFloat(totalEthereum.innerHTML) - transferFromAmountField.value;
            break;
        case "dogecoin":
            totalDogecoin.innerHTML = parseFloat(totalDogecoin.innerHTML) - transferFromAmountField.value;
            break;
        case "usd":
            totalUsd.innerHTML = parseFloat(totalUsd.innerHTML) - transferFromAmountField.value;
            break;
        default:
            console.log("Nope");
    }

    switch (inCurrency) {
        case "bitcoin":
            totalBitcoin.innerHTML = parseFloat(totalBitcoin.innerHTML) + parseFloat(transferToAmountField.value);
            break;
        case "ethereum":
            totalEthereum.innerHTML = parseFloat(totalEthereum.innerHTML) + parseFloat(transferToAmountField.value);
            break;
        case "dogecoin":
            totalDogecoin.innerHTML = parseFloat(totalDogecoin.innerHTML) + parseFloat(transferToAmountField.value);
            break;
        case "usd":
            totalUsd.innerHTML = parseFloat(totalUsd.innerHTML) + parseFloat(transferToAmountField.value);
            break;
        default:
            console.log("Can't do that")
    }
    const portfolio = await updatePortfolio(2)
    getPortfolio(2)
}

const makeDeposit = async (e) => {
    e.preventDefault();
    const field = document.querySelector("#deposit-amount");
    totalUsd.innerHTML = parseFloat(totalUsd.innerHTML) + parseFloat(field.value)
    field.value = ""
    const portfolio = await updatePortfolio(2);
    getPortfolio(2)
}

transferFromAmountField.addEventListener("keyup", convertCrypto);
tradeButton.addEventListener('click', makeTrade);
depositForm.addEventListener('submit', makeDeposit);

// Dashboard End

// Persistence Functions

const updatePortfolio = async (portfolioId) => {
    const portfolio = {
        portfolioId,
        bitcoin: parseFloat(totalBitcoin.innerHTML),
        dogecoin: parseFloat(totalDogecoin.innerHTML),
        ethereum: parseFloat(totalEthereum.innerHTML),
        usd: parseFloat(totalUsd.innerHTML),
        portfolioName: "Test portfolio",
        users: [
            {
                userId: 1,
                username: "Douglas",
                password: "adfasfsa",
                firstName: "asdfsafa",
                lastName: "Ramirez",
                email: "aioiiops",
            }
        ]
    };
    console.log(JSON.stringify(portfolio));
    const response = await fetch("http://localhost:8080/api/portfolios", {
        method: "PUT",
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify(portfolio)
    })
        .then((res) => res.json());
    return response;
}

const savePortfolio = async () => {
    const portfolio = {
        bitcoin: parseFloat(totalBitcoin.innerHTML),
        dogecoin: parseFloat(totalDogecoin.innerHTML),
        ethereum: parseFloat(totalEthereum.innerHTML),
        usd: parseFloat(totalUsd.innerHTML),
        portfolioName: "Test portfolio",
        users: [
            {
                userId: 1,
                username: "Douglas",
                password: "adfasfsa",
                firstName: "asdfsafa",
                lastName: "Ramirez",
                email: "aioiiops",
            }
        ]
    };
    const response = await fetch("http://localhost:8080/api/portfolios", {
        method: "POST",
        headers: {
            'Content-Type': "application/json;charset=utf-8"
        },
        body: JSON.stringify(portfolio)
    })
        .then((res) => res.json());
    return response;
}

// Persistence End






















