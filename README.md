

## Maze Bank Web3 – Overview

This is a model Dapp (Decentralised App) of a Banking website that is hosted on a blockchain . DBanks are the future of banking as nobody controls them and once the code is deployed to the blockchain it is not possible for anybody to modify or hamper userdata . 
<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/255648df-798a-4080-8c7e-319a9915ae47" />


### Tech Stack Used

**Frontend:**

* React.js – For building the user interface
* MetaMask – For connecting users' crypto wallets ( Signing transaction & Deposits )

**Backend / Blockchain:**

* Solidity – Used to write smart contracts
* Ethers.js – Connects the frontend to the blockchain
* Hardhat – Local blockchain used for development and testing

## Why It's the Future of Banking

No banks or middlemen. Only you control your money. It's fast, transparent, and can’t be blocked .


## Maze Bank Web3 - Local Setup - (Quick Guide)

### What You Need

- Brave browser with MetaMask extension
- Node.js and npm installed
- Two browser profiles (each with separate MetaMask)
- Code editor like VS Code

### Setup Steps

Clone and install:

```bash
git clone https://github.com/TrilokShetty/maze-bank-web3.git
cd maze-bank-web3
npm install
```

Start local blockchain (keep this terminal open):

```bash
npx hardhat node
```

### Configure MetaMask

In both browser profiles, add this network to MetaMask:

- **Network Name**: Localhost Hardhat
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337
- **Currency Symbol**: ETH

Import accounts:
1. Copy a private key from the terminal
2. In MetaMask, click profile icon → Import Account
3. Paste the private key
4. Use different private keys for each browser profile

### Deploy Contract

Run in new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address from the output. Open `dBankABI.js` and replace the old contract address with the new one.

### Start Application

```bash
npm start
```

### Notes

- Keep the blockchain terminal running
- To reset everything: `npx hardhat clean`
- Use two browser profiles to test transactions between accounts

### Common Issues

- **App not working**: Check if blockchain terminal is still running
- **MetaMask issues**: Make sure you're on the localhost network
- **Contract errors**: Update the contract address in `dBankABI.js`
