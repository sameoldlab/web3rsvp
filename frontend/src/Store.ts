import { Provider, WalletLocked } from 'fuels';
import { writable } from 'svelte/store';


type FuelWallet = {
	walletAddress: string;
	provider;
	wallet;
	isConnected: boolean;
};

const web3 = writable<FuelWallet>({
	walletAddress: '',
	provider: Provider,
	wallet: WalletLocked,
	isConnected: false,
});

export const CONTRACT_ID = writable<string>(
	'0x538a81993290d32c51d9743e29495e717f35f19ef54b1ffec144659ddae3b7ae'
);
//   0x538a81993290d32c51d9743e29495e717f35f19ef54b1ffec144659ddae3b7ae

export default web3;
