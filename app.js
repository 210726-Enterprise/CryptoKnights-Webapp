const totalBitcoin = document.querySelector("#total-bitcoin");
const totalEthereum = document.querySelector("#total-ethereum");
const totalDogecoin = document.querySelector("#total-dogecoin");
const totalUsd = document.querySelector("#total-usd");
const totalValue = document.querySelector("#total-value");
const submitButton = document.querySelector("#update-portfolio");
const transferFromDropdown = document.querySelector("#transfer-from");
const transferToDropdown = document.querySelector("#transfer-to");
const transferToAmountField = document.querySelector("#transfer-to-amount");
const transferFromAmountField = document.querySelector("#transfer-from-amount");
const tradeButton = document.querySelector("#trade");
const depositForm = document.querySelector("#deposit-form")





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
    console.log(JSON.stringify(portfolio));
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
    const portfolio = await updatePortfolio(4)
    loadPortfolio(4)
}

const makeDeposit = async (e) => {
    e.preventDefault();
    const field = document.querySelector("#deposit-amount");
    totalUsd.innerHTML = parseFloat(totalUsd.innerHTML) + parseFloat(field.value)
    field.value = ""
    const portfolio = await updatePortfolio(4);
    loadPortfolio(4)
}


const loadPortfolio = async (id) => {
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

loadPortfolio(4)


transferFromAmountField.addEventListener("keyup", convertCrypto);
tradeButton.addEventListener('click', makeTrade);
depositForm.addEventListener('submit', makeDeposit);

// calculator.addEventListener("click", calculateValue)