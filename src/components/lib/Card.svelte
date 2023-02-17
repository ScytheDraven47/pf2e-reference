<script lang="ts">
	import type { CreatureDetail } from '../../types/CreatureDetail';
	import type { SpellDetail } from '../../types/SpellDetail';
	import CreatureCard from './CreatureCard.svelte';
	import SpellCard from './SpellCard.svelte';

	export let cardDetail: CreatureDetail | SpellDetail;
</script>

{#if cardDetail.type !== 'Creature'}
	<SpellCard {cardDetail} />
{/if}
{#if cardDetail.type === 'Creature'}
	<CreatureCard {cardDetail} />
{/if}
