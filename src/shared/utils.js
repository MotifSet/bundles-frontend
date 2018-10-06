import SetProtocol from 'setprotocol.js';
import * as Web3 from 'web3';
import BigNumber from 'bignumber.js';

export class SetProtocolModule{
  constructor(){
    const injectedWeb3 = window.web3 || undefined;
    try {
      // Use MetaMask/Mist provider
      this.provider = injectedWeb3.currentProvider;
    } catch (err) {
      // Throws when user doesn't have MetaMask/Mist running
      throw new Error(`No injected web3 found when initializing setProtocol: ${err}`);
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
    injectedWeb3.eth.getAccounts((err, accounts)=>{
      if(err){
        throw new Error(err)
      }
      this.address = accounts[0];
    })
  }
}
