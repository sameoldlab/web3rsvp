<script lang="ts">
	import web3, { CONTRACT_ID } from '../Store';
	import { Wallet, Contract } from 'fuels';
	import { ContractAbi__factory } from '$lib/contracts';
	import { error } from '@sveltejs/kit';
	import type { ContractAbi } from '$lib/contracts';

	let rsvpId: string;
	let deposit: string;
	async function rsvp() {
		try {
            const contract = ContractAbi__factory.connect($CONTRACT_ID, $web3.wallet);
			console.log('RSVP to Event: ', rsvpId);
			const { value, transactionResponse, transactionResult } = await contract.functions
				.rsvp(rsvpId)
				.callParams({
					forward: [deposit]
				})
				.txParams({ gasPrice: 1, variableOutputs: 1 })
				.call();
			console.log(transactionResult);
			console.log(transactionResponse);
			console.log("RSVP'd to the following event", value);
			console.log('deposit value', value.deposit.toString());
			console.log('# of RSVPs', value.numOfRSVPs.toNumber());
		} catch (err: any) {
			console.log(err.message);
		}
	}
</script>

<div>
	<h2 class="font-semibold text-3xl">RSVP for an Event</h2>
	<form class="inline-flex mt-4  p-2" action="">
		<input class="bg-zinc-800 rounded-l-xl p-4 " placeholder="EventID" bind:value={rsvpId} />
		{#if $web3.isConnected}
			<button
				on:click|preventDefault={rsvp}
				class="self-center bg-green-600 rounded-r-xl p-4"
				type="submit"
			>
				RSVP
			</button>
		{:else}
			<button on:click|preventDefault class="self-center bg-zinc-600 rounded-r-xl p-4"
				>Connect Wallet</button
			>
		{/if}
	</form>
</div>
