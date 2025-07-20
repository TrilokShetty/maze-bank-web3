

## Maze Bank Web3 – Overview

This is a model Dapp (Decentralized App) of a banking website hosted on a blockchain.  
dBanks are the future of banking — nobody controls them, and once the code is deployed, it's immutable and user data remains secure.

---

<img width="1919" height="931" alt="image" src="https://github.com/user-attachments/assets/255648df-798a-4080-8c7e-319a9915ae47" />
<img width="1000" height="546" alt="image" src="https://github.com/user-attachments/assets/896b8a74-20f6-41b2-bb24-e7681231c3c4" />

Stats by : https://innowise.com/blog/blockchain-in-banking/

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
<img width="1005" height="479" alt="image" src="https://github.com/user-attachments/assets/61523282-9e4a-4c2d-8006-478a0cf84060" />

### Deploy Contract

Run in new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address from the output. Open `dBankABI.js` and replace the old contract address with the new one.

<img width="570" height="51" alt="image" src="https://github.com/user-attachments/assets/5dfffc5e-c113-4fc3-824f-144538d02c14" />


### Start Application

```bash
npm start
```

### Notes

- Keep the blockchain terminal running
- To reset everything: `npx hardhat clean` (run this everytime you start a blockchain , essentially when you run `npx hardhat node`) 
- Use two browser profiles to test transactions between accounts

### Common Issues

- **App not working**: Check if blockchain terminal is still running
- **MetaMask issues**: Make sure you're on the localhost network
- **Contract errors**: Update the contract address in `dBankABI.js`

### Contact Me
trilokshettyin@gmail.com
