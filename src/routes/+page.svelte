<script lang="ts">
	import Card from '../components/lib/Card.svelte';
	import type { CreatureDetail } from '../types/CreatureDetail';
	import type { SpellDetail } from '../types/SpellDetail';
	import cardJson from '../util/cards.json';

	const cards = cardJson as CreatureDetail[] | SpellDetail[];
</script>

<div class="container">
	{#each cards as card}
		<Card cardDetail={card} />
	{/each}
</div>

<style>
	:root {
		color-scheme: dark light;
		--clr-white: linen;
		--clr-red: darkred;
		--clr-green: darkgreen;
		--clr-trait: maroon;
		--clr-border: tan;
		--fnt-title: 'Oswald', sans-serif;
		--fnt-tag: 'Lateef', serif;
		--fnt: 'Sofia Sans Semi Condensed', sans-serif;
	}

	.container {
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
		gap: 3em;
		place-items: center;
		place-content: center;
	}
</style>
