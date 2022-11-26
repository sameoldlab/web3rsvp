<script lang="ts">
	import web3, { CONTRACT_ID } from '../Store';
	import { Wallet } from 'fuels';
	import { ContractAbi__factory, type ContractAbi } from '$lib/contracts';
	import type { WalletLocked } from 'fuels';

	// wallet.getBalances().then((balances) => {
	// 	const balancesFormatted = balances.map((balance) => {
	// 		return [balance.assetId, balance.amount.format()];
	// 	});
	// 	console.log('Wallet balances', balancesFormatted);
	// });

	let eventName: string="", deposit: number, maxCap: number, eventID: string;
    $: eventLen = eventName == "" ? 'width:7rem' : `width: ${Math.floor(eventName.length)+4}rem !important`
    $: depositLen = eventName == "" ? 'width:7rem' : `width: ${Math.floor(eventName.length)+4}rem !important`
    $: eventLen = eventName == "" ? 'width:7rem' : `width: ${Math.floor(eventName.length)+4}rem !important`
	async function createEvent() {
		try {
			console.log('sending transaction');
			const contract = ContractAbi__factory.connect($CONTRACT_ID, $web3.wallet);
			console.log(contract);
			const { value } = await contract.functions
				.create_event(maxCap, deposit, eventName)
				.txParams({ gasPrice: 1 })
				.call();

			console.log('preparing ID');
			eventID = value.uniqueId.toString();
			console.log(eventID);
			alert('event created');
		} catch (err: any) {
			console.log(err.message);
            
		}
	}
</script>

<form class="inline-flex flex-wrap font-smedium align-top text-4xl">
	<p class="self-baseline">I want to organize one </p>
    <input
    bind:value={eventName}
    class="px-2 self-baseline
    bg-transparent focus:outline-none"
    type="text" style={eventLen}
    placeholder="Event"
    />
    
	<p class="self-baseline">with space for up to</p>
    
    
    <!-- <label class="w-32 px-4">Max Guests</label> -->
    <input
    bind:value={maxCap}
    class="px-2 w-14 self-baseline
    bg-transparent focus:outline-none"
    pattern="^\s*?[\d]+(.[\d]*)?\s*?$"
    type="text" inputmode="number"
    placeholder="1"
    />
	<p class="self-baseline">guests. Make the entry price</p>
    
    <!-- <div class="flex flex-col"> -->
        <!-- <label class="w-32 px-4">Deposit</label> -->
        <input
        bind:value={deposit}
        class="px-2 w-14 self-baseline
        bg-transparent focus:outline-none"
        type="number" min="1"
        placeholder="1" 
        />
        <p class="self-baseline">uETH. </p>
				<!-- {#if deposit}
					<span class="text-xs opacity-70">{(deposit * 0.00000000126).toFixed(8)} ETH</span>
				{/if} -->
		<!-- </div> -->
		{#if $web3.isConnected}
			<button class="self-baseline font-semibold text-green-500 px-4" on:click|preventDefault={createEvent}>
				Create
			</button>
		{/if}

        </form>
