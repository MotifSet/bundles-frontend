import {
  assetDataUtils,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  orderHashUtils, RPCSubprovider,
  signatureUtils,
  SignerType,
  BigNumber,
  Web3ProviderEngine
} from '0x.js';
// import BigNumber from 'bignumber.js'
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import {routes} from "../../shared/apiRoutes";

export const GET_BALANCE = 'web3/GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'web3/GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAILURE = 'web3/GET_BALANCE_FAILURE';
export const CREATE_ORDER = 'web3/CREATE_ORDER';
export const CREATE_ORDER_SUCCESS = 'web3/CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'web3/CREATE_ORDER_FAILURE';

export function getBalance(address){
  console.log(process.env)
  return (dispatch) => {
    if(!address){
      return;
    }
    dispatch({
      type: GET_BALANCE
    });

    window.__WEB3_PROVIDER__.getBalanceForAddress(address)
      .then(b => dispatch({
        type: GET_BALANCE_SUCCESS,
        payload: b
      }));
  }
}

export function createOrder(){
  return dispatch => {
    dispatch({type: CREATE_ORDER});
    const providerEngine = window.__WEB3_PROVIDER__.provider;
    // providerEngine.addProvider(new RPCSubprovider(process.env.REACT_APP_INFURA_URL));
    // providerEngine.start();
    // Instantiate ContractWrappers with the provider
    const contractWrappers = new ContractWrappers(providerEngine, { networkId: 42 });
    const DECIMALS = 18;
  // the amount the maker wants of taker asset
    const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(1), DECIMALS);
    // the amount the maker is selling of maker asset
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), DECIMALS);
    const etherTokenAddress = contractWrappers.etherToken.getContractAddressIfExists();
    const makerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);
    const takerAssetData = assetDataUtils.encodeERC20AssetData('0x29382b887c4561256a2b81c4dcf754a11d1f3470');


    const NULL_ADDR = '0x0000000000000000000000000000000000000000';
    console.log(window.__WEB3_PROVIDER__.address);
    const data = {
      exchangeAddress: '0x35dd2932454449b14cee11a94d3674a936d5d7b2',
      makerAddress: window.__WEB3_PROVIDER__.address,
      takerAddress: '0x714cd3ce5fd36af3d79e9bd7db6984fa566f4caf',
      senderAddress: NULL_ADDR,
      feeRecipientAddress: NULL_ADDR,
      expirationTimeSeconds: '10000',
      salt: generatePseudoRandomSalt(),
      makerAssetAmount,
      takerAssetAmount,
      makerAssetData,
      takerAssetData,
      makerFee: new BigNumber(0),
      takerFee: new BigNumber(0)
    };

    // Now we need to sign this
    const orderHashHex = orderHashUtils.getOrderHashHex(data);
    signatureUtils.ecSignOrderHashAsync(providerEngine, orderHashHex, window.__WEB3_PROVIDER__.address, SignerType.Metamask).then(signature => {
      console.log('received signature', signature);
      const signedOrder = {...data, signature};

      dispatch({
        types: [CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE],
        promise: (client) => {
          return client.post(routes.orders.create(), {data: signedOrder})
            .then((r) => {
              dispatch(getBalance(window.__WEB3_PROVIDER__.address));
              return r
            })
        }
      })
    });

  }
}
