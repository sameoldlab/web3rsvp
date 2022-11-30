<script>
	import Rsvp from './Rsvp.svelte';
	import CreateEvent from './CreateEvent.svelte';
</script>

<svelte:head>
	<title>RSVP</title>
</svelte:head>

<div class="flex flex-col gap-4 container mx-auto p-4 m-4">
	<CreateEvent />

	<Rsvp />
</div>
