---

## Prerequisites

Before you start, make sure you have:

- Brave browser (MetaMask works smoother here)  
- Node.js and npm installed  
- MetaMask extension added  
- Two Chrome/Brave profiles, each with its own MetaMask  
- VS Code or any editor  

---

## Setup Guide

Clone the repo and go inside:

```bash
git clone https://github.com/TrilokShetty/maze-bank-web3.git
cd maze-bank-web3
```

Install dependencies:

```bash
npm install
```

Run local blockchain:

```bash
npx hardhat node
```

Open MetaMask in both browser profiles. Add a custom network:

- **Name**: Localhost Hardhat  
- **RPC URL**: http://127.0.0.1:8545  
- **Chain ID**: 31337  
- **Currency**: ETH  

Import 2 different private keys from the terminal output into MetaMask (one per profile).  
Go to MetaMask > Profile icon > Import Account > Paste private key.

In another terminal tab, deploy the contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address it prints.  
Open `dBankABI.js` and update the contract address there.

Start the app:

```bash
npm start
```

---

## Notes

- Don’t close the `hardhat node` tab — it powers the blockchain.  
- To reset everything, run:

  ```bash
  npx hardhat clean
  ```

---

That’s it. You’re all set.
