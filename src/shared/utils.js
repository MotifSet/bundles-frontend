import SetProtocol from 'setprotocol.js';
import * as Web3 from 'web3';
import BigNumber from 'bignumber.js';

export class Web3Module{
  constructor(){
    this.injectedWeb3 = window.web3 || undefined;
    try {
      // Use MetaMask/Mist provider
      this.provider = this.injectedWeb3.currentProvider;
    } catch (err) {
      // Throws when user doesn't have MetaMask/Mist running
      throw new Error(`No injected web3 found when initializing setProtocol: ${err}`);
      return;
    }

    const config = {
      coreAddress: '0xdd7d1deb82a64af0a6265951895faf48fc78ddfc',
      setTokenFactoryAddress: '0x7497d12488ee035f5d30ec716bbf41735554e3b1',
      transferProxyAddress: '0xa0929aba843ff1a1af4451e52d26f7dde3d40f82',
      vaultAddress: '0x76aae6f20658f763bd58f5af028f925e7c5319af',
      rebalancingSetTokenFactoryAddress: '0xc1be2c0bb387aa13d5019a9c518e8bc93cb53360',
    };

    // Instantiate setProtocol instance
    this.setProtocol = new SetProtocol(this.provider, config);

    // Store the user's address for ease
    this.address = this.injectedWeb3.eth.accounts[0];
  }

  /*
   * Ensure the user is on Kovan
   */
  validNetwork(){
    switch(this.injectedWeb3.version.network){
      case '42':
        return true;
      default:
        return false;
    }
  }

  /*
   * Return the balance of a token whose contract is at the given address
   */
  getBalanceForAddress(addr){

    // The minimum ABI to get ERC20 Token balance
    let minABI = [
      // balanceOf
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];

    // Get ERC20 Token contract instance
    let contract = this.injectedWeb3.eth.contract(minABI).at(addr);
    let promise = new Promise((resolve, reject) => {
      // Call balanceOf function
      contract.balanceOf(this.address, (error, balance) => {
        if (error){
          console.error(error)
          reject(0)
        }
        // Get decimals
        contract.decimals((error, decimals) => {
          if (error){
            console.error(error)
            reject(0)
          }

          // calculate a balance
          balance = balance.div(10 ** decimals).toNumber();
          resolve(balance);
        });
      });
    });


    return promise;
  }
}
