import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { DBANK_ADDRESS, DBANK_ABI } from "./dBankABI";
import Dashboard from "./Dashboard";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [name, setName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [loginBankAddress, setLoginBankAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const setup = async () => {
      if (window.ethereum) {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await tempProvider.getSigner();
        const tempContract = new ethers.Contract(DBANK_ADDRESS, DBANK_ABI, signer);
        const addr = await signer.getAddress();

        setProvider(tempProvider);
        setContract(tempContract);
        setAccount(addr);
      }
    };
    setup();
  }, []);

  const handleNewCustomer = async () => {
    if (!name.trim()) return alert("Enter your name");

    try {
      const tx = await contract.register(name, {
        value: ethers.parseEther("1.0")
      });
      await tx.wait();

      const signer = await provider.getSigner();
      const bankAddr = await contract.getBankAddress(await signer.getAddress());
      setBankAddress(bankAddr);
      setUserName(name);
      setLoggedIn(true);
      toast.success("Registration successful!");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const bal = await contract.getBalance(loginBankAddress);
      const fetchedName = await contract.getName(loginBankAddress);
      setBankAddress(loginBankAddress);
      setUserName(fetchedName);
      setLoggedIn(true);
      toast.success("Login successful!");

    } catch (err) {
      console.error(err);
      toast.error("Invalid bank address");
    }
  };

  if (loggedIn && bankAddress) {
    return <Dashboard bankAddress={bankAddress} userName={userName} />;
  }

  return (
    <div className="center-box">
      <h2>MAZE BANK</h2>
      <h3>Decentralised Bank - Running on Blockchain</h3>
      {isNew === null ? (
        <>
          <button onClick={() => setIsNew(true)}>New Customer</button>
          <button onClick={() => setIsNew(false)}>Existing Customer</button>
        </>
      ) : isNew ? (
        <>
          <p>Wallet: {account}</p>
          <input className="Sign-up-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleNewCustomer}>Register (1 ETH)</button>
        </>
      ) : (
        <>
          <input className="Sign-up-input" placeholder="Bank Address" value={loginBankAddress} onChange={(e) => setLoginBankAddress(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}