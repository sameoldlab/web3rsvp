<script lang="ts">
	import web3 from '../Store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { type Provider, type NodeInfo, Wallet } from 'fuels';

	let accounts: string[];
	let msg;
	onMount(async () => connectWallet());

	async function connectWallet() {
        if (!window.FuelWeb3) {
            msg = 'Fuel Wallet not detected';
			console.error(msg);
            return false
        }

        console.debug('Request connection to Wallet!');
        const conn = await window.FuelWeb3.connect().catch((err: Error) => {
            console.log(err.message);
        });
        accounts = await window.FuelWeb3.accounts();
        console.debug('Connection Succesful');
        console.debug('Connected to: ', accounts[0]);

        $web3.walletAddress = accounts[0];
        $web3.provider = window.FuelWeb3.getProvider()
        $web3.wallet = Wallet.fromAddress($web3.walletAddress, $web3.provider);

        // Assigned last to avoid reading empty addresss string in truncate()
        $web3.isConnected = await conn;
        // nodeInfo = await provider.getNodeInfo();
        // console.log(nodeInfo.nodeVersion);
        return $web3.isConnected;		
	}

	async function disconnect() {
		console.debug('Disconnect Wallet!');
		$web3.isConnected = !(await window.FuelWeb3.disconnect());
		return $web3.isConnected;
	}

    const truncate = (addr: string[]) => {
        const str = addr[0]
        return str.substring(0,6) 
        + '...' 
        + str.substring(str.length-4,str.length);
    };
</script>

{#if $web3.isConnected}
    <button on:click={disconnect} 
        class="rounded-xl px-4 py-2 font-semibold w-32 group
        bg-zinc-800 border-zinc-600 border-[1px]
        hover:border-black hover:bg-blue-600 
        focus:border-zinc-400"
    >   
        <span class="group-hover:hidden text-sm">
           {truncate(accounts)} <!--  &#9660; -->
        </span> 
        <span class="hidden text-center group-hover:flex">
            Disconnect
        </span>   
    </button>
{:else}
	<button
		on:click={connectWallet}
		class="bg-blue-700 px-4 py-2  
            font-semibold rounded-xl 
            hover:bg-blue-600 border-black
            focus:border-zinc-400 border-[1px]"
	>
		Connect Wallet
	</button>
{/if}
