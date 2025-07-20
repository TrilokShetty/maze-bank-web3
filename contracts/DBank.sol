
pragma solidity ^0.8.20;

contract DBank {
    struct User {
        address bankAddress;
        bool isRegistered;
        string name;
    }
    struct Transaction {
    address from;
    address to;
    uint256 amount;
    uint256 timestamp;
    }

    mapping(address => User) public users;
    mapping(address => address) public bankToWallet;
    mapping(address => uint256) public balances;
    mapping(address => string) public addressToName;
    mapping(address => Transaction[]) public transactions;
    mapping(address => string) public passwords;
    mapping(address => uint256) public transactionCount;


    event Registered(address indexed wallet, address bankAddress);
    event Deposited(address indexed bankAddress, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 amount);

    function register(string memory _name) external payable {
        require(!users[msg.sender].isRegistered, "Already registered");
        require(msg.value >= 1 ether, "Minimum 1 ETH");

        address bankAddress = address(uint160(uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)))));

        users[msg.sender] = User(bankAddress, true, _name);
        bankToWallet[bankAddress] = msg.sender;
        balances[bankAddress] = msg.value;
        addressToName[bankAddress] = _name;

        emit Registered(msg.sender, bankAddress);
    }

    function deposit(address bankAddr) external payable {
        require(bankToWallet[bankAddr] != address(0), "Invalid address");
        balances[bankAddr] += msg.value;
        emit Deposited(bankAddr, msg.value);
    }

    function transfer(address toBankAddress, uint256 amount) external {
    address senderWallet = msg.sender;
    require(users[senderWallet].isRegistered, "Not registered");

    address fromBankAddress = users[senderWallet].bankAddress;
    require(bankToWallet[toBankAddress] != address(0), "Invalid recipient");
    require(balances[fromBankAddress] >= amount, "Insufficient balance");

    balances[fromBankAddress] -= amount;
    balances[toBankAddress] += amount;

    
    Transaction memory txRecord = Transaction({
        from: fromBankAddress,
        to: toBankAddress,
        amount: amount,
        timestamp: block.timestamp
    });

    transactions[fromBankAddress].push(txRecord);
    transactions[toBankAddress].push(txRecord);

    transactionCount[fromBankAddress]++;
    transactionCount[toBankAddress]++;

    emit Transferred(fromBankAddress, toBankAddress, amount);
    }


    function getBankAddress(address wallet) external view returns (address) {
        require(users[wallet].isRegistered, "Not registered");
        return users[wallet].bankAddress;
    }

    function isBankAddressValid(address bankAddr) external view returns (bool) {
        return bankToWallet[bankAddr] != address(0);
    }

    function getBalance(address bankAddr) external view returns (uint256) {
        return balances[bankAddr];
    }

    function getName(address bankAddr) external view returns (string memory) {
        return addressToName[bankAddr];
    }

    function getTransactions(address bankAddr) public view returns (Transaction[] memory) {
    return transactions[bankAddr];
    }

    function getTransactionCount(address bankAddr) external view returns (uint256) {
    return transactionCount[bankAddr];
    }



}
