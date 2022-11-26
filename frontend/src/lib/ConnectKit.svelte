<script lang="ts">
	import web3 from '../Store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { type Provider, type NodeInfo, Wallet } from 'fuels';

	let connected: boolean;
	$: connected = $web3.isConnected || false;
	let accounts: string[];
	let msg;
	// $: wallet = Wallet.fromAddress(address, provider);

	onMount(async () => {
		if (window.FuelWeb3) {
			$web3.isConnected = await window.FuelWeb3.connect().catch((err: Error) => {
				console.log(err.message);
			});
			accounts = await window.FuelWeb3.accounts();
			console.debug('Connected to: ', accounts[0]);
			const provider: Provider = window.FuelWeb3.getProvider();
			$web3.provider = provider;
			$web3.walletAddress = accounts[0];
		} else {
			msg = 'Fuel Wallet not detected';
			console.error(msg);
		}
		// wallet = window.FuelWeb3.getWallet('fuel1<from account address>');
	});

	async function connectWallet() {
		if (browser) {
			const { FuelWeb3 } = window;
			console.debug('Request connection to Wallet!');
			$web3.isConnected = await window.FuelWeb3.connect().catch((err: Error) => {
				console.log(err.message);
			});
			accounts = await window.FuelWeb3.accounts();
			console.debug('Connection Succesful');
			console.debug('Connected to: ', accounts[0]);
			$web3.walletAddress = await window.FuelWeb3.accounts();
			$web3.wallet = Wallet.fromAddress(accounts[0], $web3.provider);
			// nodeInfo = await provider.getNodeInfo();
			// console.log(nodeInfo.nodeVersion);
		}
	}

	async function disconnect() {
		console.debug('Disconnect Wallet!');
		$web3.isConnected = !(await window.FuelWeb3.disconnect());
		return connected;
	}
    const truncate = (str: string) => {
        const len = str.length
        return $web3.walletAddress.substring(0,6)+ '...'+ $web3.walletAddress.substring(len-4,len)
    }
</script>

{#if $web3.isConnected}
	<div 
        class="inline-flex bg-zinc-800 border-zinc-600 
            border-[1px] rounded-xl text-sm py-2 px-4
            hover:bg-blue-600 hover:border-transparent
            group">
        <!-- <div class=" pl-4">
            <div class="w-5 h-5 m-auto bg-white rounded-full"></div>
        </div> -->
        <div class="group-hover:hidden">
		<button
			on:click={disconnect}
			class="font-semibold m-auto pr-2 
        "
		>
            {truncate($web3.walletAddress)}
            
		</button>
        <button class="text-xs">
            &#9660;
        </button>
    </div>
    <div class="hidden group-hover:flex">
        <button
        on:click={disconnect}
        class="font-semibold m-auto pr-2">
        Disconnect
        
    </button>
    </div>
	</div>
{:else}
	<button
		on:click={connectWallet}
		class="bg-blue-700 px-4 py-2  
            font-semibold rounded-xl 
            hover:bg-blue-600
            ring-blue-600 border-black
            focus:ring-2 focus:border-2"
	>
		Connect Wallet
	</button>
{/if}
