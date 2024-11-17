// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IOracle {
    function read() external view returns (uint256);
    function lastUpdated() external view returns (uint256);
}

contract SimpleVault is Ownable {
    IERC20 public usdc;
    address oracle = 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660;

    
    // Mapping to track user deposits and withdrawals
    mapping(address => uint256) public userDeposits;
    mapping(address => uint256) public userWithdrawals;
    
    constructor(address _usdcAddress) {
        usdc = IERC20(_usdcAddress);
    }
    
    // Deposit MATIC and track it
    function deposit() external payable {
        userDeposits[msg.sender] += msg.value;
    }
    
    // Withdraw USDC and track it
    function withdraw(uint256 amount) external {
        userWithdrawals[msg.sender] += amount;
        usdc.transfer(msg.sender, amount);
    }
    
    // Function to check user's deposit balance
    function getMyDeposits() external view returns (uint256) {
        return userDeposits[msg.sender];
    }
    
    // Function to check user's withdrawal balance
    function getMyWithdrawals() external view returns (uint256) {
        return userWithdrawals[msg.sender];
    }

    // Owner function to withdraw all native tokens (MATIC)
    function withdrawNative() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Failed to withdraw");
    }

    function getPrice() external view returns (uint256) {
        return IOracle(oracle).read();
    }
    
    receive() external payable {
        userDeposits[msg.sender] += msg.value;
    }
}

