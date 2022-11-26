<script lang="ts">
	import web3, { CONTRACT_ID } from '../Store';
	import Rsvp from './Rsvp.svelte';
	import CreateEvent from './CreateEvent.svelte';

	// const wallet = Wallet.fromPrivateKey(WALLET_SECRET);
	// const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet)
	// const provider = await window.FuelWeb3.getProvider();
    const wallet = $web3.wallet;
	function log() {
		console.log('Connected: ', $web3.isConnected);
		console.log('Provider: ', $web3.provider);
		console.log('web3.Wallet: ', $web3.wallet);
		console.log('Wallet: ', wallet);
		console.log('Address: ', $web3.walletAddress);
		console.log('Contract', $CONTRACT_ID);
	}
</script>

<svelte:head>
	<title>RSVP</title>
</svelte:head>

<div class="flex flex-col gap-4 container mx-auto p-4 m-4">
	<CreateEvent />

	<Rsvp />
    <button class="mx-auto" on:click={log}>LOG</button>
</div>
