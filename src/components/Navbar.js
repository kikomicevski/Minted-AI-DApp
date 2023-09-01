import React, { useState, useEffect } from 'react';
import Logo from '../images/Logo-M.png';
import './Navbar.css';
import '../index.css'

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkWalletConnection();
    addWalletListener();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask');
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        const permissions = await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });

        if (permissions.length > 0) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  const addWalletListener = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress('');
          setIsConnected(false);
        }
      });
    } else {
      /* MetaMask is not installed */
      setIsConnected(false);
      console.log('Please install MetaMask');
    }
  };

  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <img src={Logo} alt="logo" />
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <button
                className="btn"
                onClick={isConnected ? disconnectWallet : connectWallet}
              >
                {isConnected ? (
                  <>
                    <span>Connected:</span>
                    {` ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`}
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
