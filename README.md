

---

# SETUP.md

This is a simple setup guide to get the project running on your local machine.

---

## Prerequisites

Make sure you have these ready before starting:

* Brave browser (recommended because MetaMask connects better with it)
* Node.js and npm installed
* MetaMask browser extension installed
* Two Chrome or Brave profiles, each with MetaMask set up separately
* VS Code or any code editor

---

## Setting things up

1. Clone the repo and go inside the folder:

   ```
   git clone https://github.com/TrilokShetty/maze-bank-web3.git
   cd maze-bank-web3
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Start the local blockchain:

   ```
   npx hardhat node
   ```

4. Open MetaMask (on both browser profiles), click the top left menu icon, and select "Add a Custom Network".

   Fill in like this:

   * Network name: Localhost Hardhat
   * RPC URL: [http://127.0.0.1:8545](http://127.0.0.1:8545)
   * Chain ID: 31337
   * Currency Symbol: ETH

   Do the same in the second browser profile.

5. On both profiles, import 2 different accounts from the list printed in the terminal when you ran `npx hardhat node`. Each account has a private key. Here's how:

   * In MetaMask, click your profile icon > Import Account
   * Paste one of the private keys from the terminal
   * Do this for both profiles but use **different private keys**
     

6. Now in your terminal, open a new terminal tab or split window and run the deploy script:

   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```

   This will give you a contract address. Copy that address.

7. Open the file  `dBankABI.js` and replace the existing contract address with the new one.

8. Now start the app:

   ```
   npm start
   ```

---

## Notes

* The blockchain is only running while the `npx hardhat node` terminal is open. If you close it, everything resets.
* If you want to start fresh, it's a good idea to clear everything first:

  ```
  npx hardhat clean
  ```

That's it. You’re good to go.

