<script lang="ts">
	import { Wallet } from 'fuels';
	import { ContractAbi__factory } from '$lib/contracts';
    import ConnectKit from '$lib/ConnectKit.svelte';

	const CONTRACT_ID = '0x61b572d1f08e9c07afcca90a765ecf5044dbcf5e5898784ea1de2731a9d91cb0';
	// known address in chainConfig.json
	const WALLET_SECRET = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

	// const wallet = Wallet.fromPrivateKey(WALLET_SECRET);
	// const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet)
	// const provider = await window.FuelWeb3.getProvider();

</script>

<nav class="flex flex-row 
my-4 container mx-auto
justify-between">
    <img src="favicon.svg" alt="quill logo" class="w-5">
    <ConnectKit />   
</nav>

