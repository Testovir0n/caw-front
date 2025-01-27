import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider'

type ContractParams = {
    address: string;
    network: string;
    apiKey: string;
    abi: ethers.ContractInterface;
}

export function getContract(params: ContractParams) {

    const { address, abi, network, apiKey, } = params;
    const _network = ethers.providers.getNetwork(network);
    const provider = new ethers.providers.InfuraProvider(_network, apiKey);
    const contract = new ethers.Contract(address, abi, provider);
    return { contract, provider };
}

export const getSignerContract = async (contract: ethers.Contract, walletAddress: string) => {

    //* RPC Provider
    // const provider = new ethers.providers.JsonRpcProvider("API_URL", 1);
    // const signer = new ethers.Wallet("WALLET_PRIVATE_KEY", provider);

    //* Wallet Provider
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner(walletAddress)
        // const signature = await signer.signMessage(walletAddress);
        // console.log(`signature`, signature);

        const contractWithSigner = contract.connect(signer);
        return contractWithSigner;
    }
    else {
        const autoProvider = await detectEthereumProvider({ mustBeMetaMask: false, silent: true });
        if (autoProvider) {
            const provider = new ethers.providers.Web3Provider(autoProvider as any);
            const signer = provider.getSigner(walletAddress)
            const contractWithSigner = contract.connect(signer);
            return contractWithSigner;
        }
        else
            throw new Error('No provider found');
    }
}

export function getExplorerUrl({ network, addressOrTx, type }: { network: string | number; addressOrTx: string; type: 'address' | 'tx'; }) {

    const _network = ethers.providers.getNetwork(network);
    let url = '';

    switch (_network.chainId) {
        case 1:
            url = `https://etherscan.io/${type}/${addressOrTx}`;
            break;
        case 3:
            url = `https://ropsten.etherscan.io/${type}/${addressOrTx}`;
            break;
        case 4:
            url = `https://rinkeby.etherscan.io/${type}/${addressOrTx}`;
            break;
        case 5:
            url = `https://goerli.etherscan.io/${type}/${addressOrTx}`;
            break;
        case 42:
            url = `https://kovan.etherscan.io/${type}/${addressOrTx}`;
            break;
        default:
            url = `https://etherscan.io/${type}/${addressOrTx}`;
            break;
    }

    return url;
}

export function getOpenSeaUrl(network: string | number, nftCTAddress: string, userId: number) {

    const _network = ethers.providers.getNetwork(network);

    switch (network) {
        case 1:
            return `https://opensea.io/assets/${nftCTAddress}/${userId}`;
        default:
            return `https://testnets.opensea.io/assets/${_network.name}/${nftCTAddress}/${userId}`;
    }
}

export async function getTokenPriceInUSD(tokenName: string) {

    //* keep cache for 1 minutes
    const cacheTime = 60 * 1000;
    const cacheKey = `tokenPriceInUSD-${tokenName}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { timestamp, value } = JSON.parse(cached);
        const now = Date.now();
        if (now - timestamp < cacheTime) {
            return Number(value || 0);
        }
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=usd`;
    const response = await fetch(url);
    const data = await response.json();
    const priceInUsd = Number(data?.[ `${tokenName}` ]?.usd || 0);
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), value: priceInUsd }));

    return priceInUsd;
}

export function getEthPriceInUsd() {
    return getTokenPriceInUSD("ethereum");
}

export function getCawPriceInUsd() {
    return getTokenPriceInUSD("a-hunters-dream");
}

export const getBlockChainErrMsg = (error: any) => {

    let { message, code } = error;
    message = message ? message.split("(")[ 0 ] : "";
    code = code ? code : '0';

    return { message, code };
}