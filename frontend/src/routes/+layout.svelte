<script>
	import '../app.css';
    import '../polyfills';
    import Nav from '$lib/Nav.svelte';    

</script>

<div class="text-gray-100 mx-auto">

    <Nav/>
    <main>
        <slot />
    </main>
</div>
