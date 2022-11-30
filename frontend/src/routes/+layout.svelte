<script>
	import '../app.css';
    import Nav from '$lib/Nav.svelte';    

</script>

<div class="text-gray-100 mx-auto">

    <Nav/>
    <main data-sveltekit-prefetch>
        <slot />
    </main>
</div>
