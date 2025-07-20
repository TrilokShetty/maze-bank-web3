
export const DBANK_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const DBANK_ABI = [
  "function register(string _name) external payable",
  "function deposit(address bankAddr) external payable",
  "function transfer(address toBankAddress, uint256 amount) external",
  "function getBankAddress(address wallet) external view returns (address)",
  "function isBankAddressValid(address bankAddr) external view returns (bool)",
  "function getBalance(address bankAddr) external view returns (uint256)",
  "function getName(address bankAddr) external view returns (string)",
  "function getTransactions(address bankAddr) public view returns (tuple(address from, address to, uint256 amount, uint256 timestamp)[])",
  "function getTransactionCount(address bankAddr) external view returns (uint256)"


]
