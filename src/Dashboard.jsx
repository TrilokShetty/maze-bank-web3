import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { DBANK_ADDRESS, DBANK_ABI } from "./dBankABI";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copyIcon from './copy.png';

const Dashboard = ({ bankAddress, userName }) => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [sendTo, setSendTo] = useState("");
  const [amount, setAmount] = useState("");
  const [topUp, settopUp] = useState("");
  const [wallet, setWallet] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const setup = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const tempProvider = new ethers.BrowserProvider(window.ethereum);
          const signer = await tempProvider.getSigner();
          const dbank = new ethers.Contract(DBANK_ADDRESS, DBANK_ABI, signer);
          setProvider(tempProvider);
          setContract(dbank);
        } else {
          toast.error('MetaMask not found!');
        }
      } catch (err) {
        toast.error('MetaMask connection rejected');
        console.error(err);
      }
    };
    setup();
  }, [bankAddress]);

  useEffect(() => {
    if (contract) {
      fetchBalance();
      fetchWalletAddress();
      fetchEvents();
    }
  }, [contract, bankAddress]);


  const fetchBalance = async () => {
  console.log("fetchBalance: called", { contract, bankAddress });
  if (!contract || !bankAddress) {
    console.log("fetchBalance: missing contract or bankAddress");
    return false;
  }
  try {
    const bal = await contract.getBalance(bankAddress, { blockTag: "latest" });
    console.log("fetchBalance: contract.getBalance result", bal);
    setBalance(ethers.formatEther(bal));
    console.log("fetchBalance: setBalance updated");
    return true;
  } catch (err) {
    console.error("fetchBalance: error", err);
    return false;
  }
};


  const fetchWalletAddress = async () => {
    if (!provider) return;
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
    } catch (err) {}
  };


  const fetchEvents = async () => {
  console.log("fetchEvents: called", { contract, bankAddress });
  if (!contract || !bankAddress) {
    console.log("fetchEvents: missing contract or bankAddress");
    return false;
  }
  try {
    const txns = await contract.getTransactions(bankAddress);
    console.log("fetchEvents: contract.getTransactions result", txns);
    const formatted = txns.map((tx) => {
      const isSent = tx.from === bankAddress;
      return {
        type: isSent ? "Sent" : "Received",
        from: tx.from,
        to: tx.to,
        amount: ethers.formatEther(tx.amount),
        timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
        status: isSent ? "sent" : "received",
        address: isSent ? tx.to : tx.from,
      };
    });
    setTransactions(formatted.reverse());
    console.log("fetchEvents: setTransactions updated");
    return true;
  } catch (err) {
    console.error("fetchEvents: error", err);
    return false;
  }
};


  const addCustomETH = async () => {
    try {
      const tx = await contract.deposit(bankAddress, {
        value: ethers.parseEther(topUp),
      });
      await tx.wait();
      await fetchBalance();
      await fetchEvents();
      settopUp("");
      toast.success("Deposit successful!");
    } catch (err) {
      console.error(err);
      toast.error("Deposit failed");
    }
  };

  const refresh = async () => {
    console.log("Refetching balance for bankAddress:", bankAddress);
  const [balOk, txOk] = await Promise.all([
    fetchBalance(),
    fetchEvents()
  ]);

  if (balOk) {
    toast.success("Balance refreshed");
  } else {
    toast.error("Failed to refresh balance");
  }

  if (txOk) {
    toast.success("Transactions refreshed");
  } else {
    toast.error("Failed to refresh transactions");
  }
};


  const sendETH = async () => {
    try {
      if (sendTo === bankAddress) {
      return toast.error("You cannot send ETH to your own bank account !");
      }
      const isValid = await contract.isBankAddressValid(sendTo);
      if (!isValid) return alert("Invalid bank address");
      const tx = await contract.transfer(sendTo, ethers.parseEther(amount));
      await tx.wait();
      console.log("Refetching balance for bankAddress:", bankAddress);
      await fetchBalance();
      await fetchEvents();
      setSendTo("");
      setAmount("");
      toast.success("Transfer complete!");
    } catch (err) {
      console.error(err);
      toast.error("Transfer Failed !");
    }
  };

  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome</h1>
          <div className="user-name">{userName}</div>
        </div>
        <div className="bank-logo">MAZE BANK</div>
      </div>

      <div className="dashboard-grid">
        {/*Balance Card */}
        <div className="card">
          <h3>Account Balance</h3>
          <div className="balance-display">{balance} ETH</div>
          <div className="info-row">
            <span>Wallet:</span>
            <div className="address-display">
              {wallet}
              <img
                src={copyIcon}
                alt="Copy"
                className="copy-icon"
                onClick={() => copyToClipboard(bankAddress)}
              />
            </div>
          </div>
          <div className="info-row">
            <span>Bank Address:</span>
            <div className="address-display">
              {bankAddress}
              <img
                src={copyIcon}
                alt="Copy"
                className="copy-icon"
                onClick={() => copyToClipboard(bankAddress)}
              />
            </div>
          </div>
          <button onClick={refresh}>Refresh</button>
        </div>

        

        {/* Send ETH */}
        <div className="card">
          <h3>Transfer Funds</h3>
          <input
            placeholder="Recipient Bank Address"
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
          />
          <input
            placeholder="Amount (ETH)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={sendETH}>Send</button>
        </div>

      {/*Deposit Funds */}
        <div className="card">
          <h3>Add Funds</h3>
          <input
            placeholder="Amount (ETH)"
            type="number"
            value={topUp}
            onChange={(e) => settopUp(e.target.value)}
          />
          <button onClick={addCustomETH}>Deposit</button>
        </div>
        </div>

      {/* Transactions Section */}
      <div id="transactions" className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="transaction-list">
          {transactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet</p>
            </div>
          ) : (
            transactions.map((tx, idx) => (
              <div key={idx} className="transaction-item">
                <div className="transaction-left">
                  
                  <div className="transaction-details">
                    <div className="transaction-address">
                      {tx.status === "sent" ? "To" : "From"}: {tx.address}
                    </div>
                    <div className="transaction-time">{tx.timestamp}</div>
                  </div>
                </div>
                <div className={`transaction-amount ${tx.status}`}>
                  {tx.status === "sent" ? "-" : "+"}{tx.amount} ETH
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
