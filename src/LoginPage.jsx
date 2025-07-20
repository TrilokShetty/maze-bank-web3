import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { DBANK_ADDRESS, DBANK_ABI } from "./dBankABI";
import Dashboard from "./Dashboard";

export default function LoginPage() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [name, setName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [loginBankAddress, setLoginBankAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const bal = await contract.getBalance(loginBankAddress);
      setBankAddress(loginBankAddress);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
      alert("Invalid bank address");
    }
  };

  if (loggedIn && bankAddress) {
    return <Dashboard bankAddress={bankAddress} />;
  }

  return (
    <div>
      <h2>DBank</h2>
      {isNew === null ? (
        <>
          <button onClick={() => setIsNew(true)}>Register</button>
          <button onClick={() => setIsNew(false)}>Login</button>
        </>
      ) : isNew ? (
        <>
          <p>Wallet: {account}</p>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleNewCustomer}>Register (1 ETH)</button>
        </>
      ) : (
        <>
          <input placeholder="Bank Address" value={loginBankAddress} onChange={(e) => setLoginBankAddress(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}
