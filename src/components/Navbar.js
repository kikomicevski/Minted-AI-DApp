import React, { useState, useEffect } from 'react';
import Logo from '../images/minted-logo.png';
import './Navbar.css';

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, []);

  const handleConnectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask');
    }
  };

  const openMetaMask = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.enable();
        console.log('MetaMask opened');
      } catch (err) {
        console.error('Failed to open MetaMask:', err);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log('Connect to MetaMask using the Connect button');
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask');
    }
  };

  const addWalletListener = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress('');
      console.log('Please install MetaMask');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <img src={Logo} alt="logo" />
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={walletAddress ? openMetaMask : handleConnectWallet}>
                {walletAddress && walletAddress.length > 0 ? (
                  <>
                    <span>Connected:</span>
                    {` ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
