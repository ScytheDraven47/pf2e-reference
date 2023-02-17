<script lang="ts">
	import type { SpellDetail } from '../../types/SpellDetail';
	import { getSpellLevelLabel } from '../../util/helpers';

	export let cardDetail: SpellDetail;
</script>

<div class="card {'list' in cardDetail && 'spell '.concat(cardDetail.list.toLowerCase())}">
	<div class="title">
		<h2>{cardDetail.name}</h2>
		<h2>{cardDetail.type} {cardDetail.level}</h2>
		{#if 'list' in cardDetail}
			<h3 class="tag">{cardDetail.list}</h3>
		{/if}
	</div>
	<div class="details">
		{#if 'traits' in cardDetail && cardDetail.traits}
			<ul class="traits">
				{#each cardDetail.traits as trait}
					<li>{trait}</li>
				{/each}
			</ul>
		{/if}
		{#if 'traditions' in cardDetail}
			<div>
				<b>Traditions</b>
				<span>{cardDetail.traditions?.join(', ')}</span>
			</div>
		{/if}
		{#if 'actions' in cardDetail || 'components' in cardDetail}
			<div>
				<b>Cast</b>
				<span>{'♦'.repeat(cardDetail.actions || 0)}</span>
				{#if 'components' in cardDetail}
					<span>{cardDetail.components?.join(', ')}</span>
				{/if}
			</div>
		{/if}
		{#if 'range' in cardDetail || 'target' in cardDetail}
			<div>
				{#if 'range' in cardDetail}
					<b>Range</b>
					<span>{cardDetail.range} feet</span>;
				{/if}
				{#if 'target' in cardDetail}
					<b>Targets</b>
					<span>{cardDetail.target}</span>
				{/if}
			</div>
		{/if}
		{#if 'duration' in cardDetail}
			<div>
				<b>Duration</b>
				<span>{cardDetail.duration}</span>
			</div>
		{/if}
	</div>
	{#if 'description' in cardDetail}
		<div class="description">
			<p>{cardDetail.description}</p>
		</div>
	{/if}
	{#if 'heightened' in cardDetail && cardDetail.heightened}
		<div class="additional">
			{#each cardDetail.heightened as heightened}
				<div>
					<b>Heightened ({getSpellLevelLabel(heightened.level)})</b>
					<span>{heightened.effect}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lateef:wght@400;700&family=Oswald:wght@400;700&family=Sofia+Sans+Semi+Condensed:wght@400;800&display=swap');

	/* TYPOGRAPHY */
	.card {
		font-family: var(--fnt);
		letter-spacing: -0.3px;
	}

	.card:not(.spell) * {
		font-size: 0.89em;
	}

	.card b {
		font-weight: 800;
	}

	.card .title,
	.card .traits {
		font-family: var(--fnt-title);
		text-transform: uppercase;
		line-height: 1.25;
	}
	.card .traits {
		font-size: 0.8em;
		letter-spacing: initial;
	}

	.card .tag {
		font-family: var(--fnt-tag);
		text-transform: none;
		font-weight: bold;
		font-variant: small-caps;
		letter-spacing: 0.5px;
		line-height: 0.7;
	}

	.card.spell.arcane {
		--clr-theme: var(--clr-red);
	}
	.card.spell.primal {
		--clr-theme: var(--clr-green);
	}

	.card {
		position: relative;
		background: var(--clr-white);
		color: black;
		border-radius: 1em;
		padding: 0.25em 0.5em;
		width: 36ch;
		min-height: 57ch;
	}

	.card.spell {
		border: 2px solid var(--clr-border);
	}

	.card::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: -0.75em -1em;
		background: var(--clr-theme, var(--clr-white));
	}

	.card > *:not(.tag):not(.title) {
		border-top: 1px solid black;
	}

	.card h2,
	.card h3,
	.card ul,
	.card p {
		margin: 0;
	}

	.card .tag {
		position: absolute;
		background: var(--clr-theme);
		color: white;
		top: -0.4em;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 100vh;
		padding: 0 0.5em;
	}

	.card .title {
		display: flex;
		justify-content: space-between;
	}

	.card .traits {
		display: flex;
		flex-wrap: wrap;
		padding: 0.25em 0 0 0;
	}
	.card .traits > * {
		list-style-type: none;
		background: var(--clr-trait);
		color: white;
		padding: 0 0.5em;
		border: 2px solid var(--clr-border);
	}

	.card .details > *:not(.traits) {
		text-indent: -1em;
		margin-left: 1em;
	}

	.card .description {
		text-align: justify;
	}

	.card.concise:not(:hover) {
		min-height: initial;
	}

	.card.concise .description,
	.card.concise .additional {
		display: none;
	}
</style>
