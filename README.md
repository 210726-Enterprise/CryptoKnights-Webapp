# CryptoKnights

## Project Description

Lightweight app for simulating buying, selling, and exchanging the most popular cryptocurrencies on the market. This project makes use of the CoinGecko API (https://www.coingecko.com/en/api). This is the single-page application portion of this project. To view the REST API portion of this project, please go here: https://github.com/210726-Enterprise/CryptoKnights.

## Technologies Used

* Angular
* HTML
* JavaScript
* TypeScript
* CSS
* NodeJS
* Bootstrap

## Features

* Users can create and login to their account 
* Users can create and manage their portfolios
* Users can deposit and withdraw funds from their portfolios
* Users can purchase and sell crypto with their existing funds
* Users can exchange one type of crypto for another
* Users can view the total value of a portfolio

To-do list:
* Add a live ticker to track and view the current exchange rates of crypto
* Add support for additional types of crypto
* Add the ability to add a joint owner to a portfolio
* Add the ability to view the transaction history on a portfolio
* Stylize the webpages

## Getting Started
   
1. To start, please clone the project - git clone https://github.com/210726-Enterprise/CryptoKnights-Webapp.git
2. Open the project in Visual Studio Code
3. Open the terminal and run the command "npm install". This will install the node-modules folder into your project, which contains modules that this application references.
4. After node-modules is finished installing, run the command "ng serve --open". This will start the web application on the port http://localhost:4200 as well as automatically open the window in your default browser.

(How the console will look when successful)
![Screenshot (137)](https://user-images.githubusercontent.com/23224121/133865152-25f7baaa-900d-4f44-88d9-3ad4ddd81e3c.png)

(The login page in your web browser)
![Screenshot (138)](https://user-images.githubusercontent.com/23224121/133865209-5b013656-c3db-40af-a0c5-4a5a7c141dd4.png)

## Usage

Before attempting to use the web application, please set up the back end REST API first. The web application cannot function without it. Instructions can be found here: https://github.com/210726-Enterprise/CryptoKnights.

First, register a new user by clicking on the register button in your navbar.
![Screenshot (138)](https://user-images.githubusercontent.com/23224121/133865312-f46c1367-38e4-47b5-aa15-59f173dbfda5.png)

After registering, it will redirect you to the login page, where you can use your username and password to login.

After logging in, you will be directed to your home page, where you can view all of your portfolios. Right now you do not have any portfolios. Click on the "Create New Portfolio" button to make one.
![Screenshot (138)](https://user-images.githubusercontent.com/23224121/133865657-02c914c1-0f9f-49dc-951d-9c9dc1b01ad9.png)

You will then be taken to the Create Portfolio page where you can input a name for your new portfolio. Click add portfolio to take you back to your home page.
![Screenshot (140)](https://user-images.githubusercontent.com/23224121/133865727-435c6b45-e9ae-4405-853c-30beeb627354.png)

There is currently a bug where your home page will not reload with your new portfolio. To view your new portfolio, you will have to log out and log back in.
![Screenshot (141)](https://user-images.githubusercontent.com/23224121/133865776-2391be65-a1bf-4ffc-b55b-0340590d970b.png)

Now that you have a portfolio, you can make transactions on it. Click on "View Portfolio" to see the detailed view of that portfolio.
![Screenshot (142)](https://user-images.githubusercontent.com/23224121/133865825-535e7f54-95a2-4152-add3-2c611e517610.png)

On the left side of the screen, you can see the total value of your portfolio, as well as a breakdown of how much of each type of currency or crypto you have. Currently, our application supports USD, Bitcoin, Ethereum, and Dogecoin. On the right side is the panel where you can make the transactions. First, we must make a transaction. Enter your desired amount into the "Make a deposit" box and click "Deposit".
![Screenshot (143)](https://user-images.githubusercontent.com/23224121/133865994-2f56a7bd-78c8-4b45-9ddf-69c8a0690081.png)

The left panel will update with the new amount and value. Next, lets make an exchange. The left dropdown box in "Make a trade" should be auto-populated with USD. The dropdown will only contain currencies/cryptos that you currently own (in our case, USD is the only option). Underneath, enter the amount you'd like to trade. In the right dropdown box, select the crypto you'd like to exchange to. The box underneath that dropdown will auto-populate with the converted amount.
![Screenshot (144)](https://user-images.githubusercontent.com/23224121/133866247-1dfb37ce-32e8-4c87-b1c7-0f8d5e6fcbd4.png)

You can also convert between cryptos and back to currency, as long as you have the corresponding crypto/currency.

Finally, you can withdraw currency. Enter the amount in the "Make a Withdrawal" box and click "Withdraw".
![Screenshot (145)](https://user-images.githubusercontent.com/23224121/133866348-267b6896-3d02-4e54-9a08-ef0d6c00f442.png)

If you would like to view all of your portfolios again, simply click on "Profile" in you navbar. Click on logout when you are done with the application.

## Contributors

* Victor Liu - https://github.com/cptvictor
* Jared Mullins - https://github.com/jwmullins92
* Jacob Brummett - https://github.com/Rufus1911
* Alwyn Zhang - https://github.com/AlwynZ
