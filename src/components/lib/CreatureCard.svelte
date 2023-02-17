<script lang="ts">
	import type { CreatureDetail, Movement } from '../../types/CreatureDetail';
	import { getSpellLevelLabel } from '../../util/helpers';

	const capitalise = (str: string) => str[0].toUpperCase() + str.slice(1);
	const formatWeakness = ([name, value]: [string, number]) => `${name} (${value})`;
	const formatResistance = formatWeakness;
	const formatMovement = (movement: Movement) => {
		let extraMovement = Object.entries(movement).reduce((acc, [key, value]) => {
			if (key === 'speed' || key === 'additional') return acc;
			return [...acc, `${key} ${value} feet`];
		}, [] as string[]);
		return [`${movement.speed} feet`, ...extraMovement];
	};

	const formatList = (list: any[], formatter = (x: any) => x) => list.map(formatter).join(', ');

	export let cardDetail: CreatureDetail;
</script>

<div class="card">
	<div class="title">
		<h2>{cardDetail.name}</h2>
		<h2>{cardDetail.type} {cardDetail.level}</h2>
	</div>
	<div class="details">
		{#if 'traits' in cardDetail && cardDetail.traits}
			<ul class="traits">
				{#each cardDetail.traits as trait}
					<li>{trait}</li>
				{/each}
			</ul>
		{/if}
		<div>
			<b>Perception</b>
			<span>+{cardDetail.perception}</span>{#if cardDetail.senses};
				<span>{formatList(cardDetail.senses)}</span>
			{/if}
		</div>
		<div>
			<b>Languages</b>
			<span>{formatList(cardDetail.languages)}</span>
		</div>
		<div>
			<b>Skills</b>
			<span
				>{formatList(
					Object.entries(cardDetail.skills),
					([name, value]) => `${capitalise(name)} +${value}`
				)}</span
			>
		</div>
		<div>
			<b>Str</b>
			<span>+{cardDetail.abilities.str}</span>,
			<b>Dex</b>
			<span>+{cardDetail.abilities.dex}</span>,
			<b>Con</b>
			<span>+{cardDetail.abilities.con}</span>,
			<b>Int</b>
			<span>+{cardDetail.abilities.int}</span>,
			<b>Wis</b>
			<span>+{cardDetail.abilities.wis}</span>,
			<b>Cha</b>
			<span>+{cardDetail.abilities.cha}</span>
		</div>
	</div>
	<div class="additional">
		<div>
			<b>AC</b>
			<span>{cardDetail.ac}</span>;
			<b>Fort</b>
			<span>+{cardDetail.saves.fort}</span>,
			<b>Ref</b>
			<span>+{cardDetail.saves.ref}</span>,
			<b>Will</b>
			<span>+{cardDetail.saves.will}</span>{#if cardDetail.saves.additional};
				<span>{formatList(cardDetail.saves.additional)}</span>
			{/if}
		</div>
		<div>
			<b>HP</b>
			<span>{cardDetail.hp}</span>{#if cardDetail.immunities};
				<b>Immunities</b>
				<span>{formatList(cardDetail.immunities)}</span>{/if}{#if cardDetail.resistances};
				<b>Resistances</b>
				<span>{formatList(cardDetail.resistances, formatResistance)}</span
				>{/if}{#if cardDetail.weaknesses};
				<b>Weaknesses</b>
				<span>{formatList(cardDetail.weaknesses, formatWeakness)}</span>
			{/if}
		</div>
		{#if cardDetail.features}
			<div>
				{#each cardDetail.features as feature}
					<b>{feature.name}</b>
					<span>{feature.description}</span>
				{/each}
			</div>
		{/if}
		{#if cardDetail.reactions}
			<div>
				{#each cardDetail.reactions as feature}
					<b>{feature.name}</b>
					<span>♻</span>
					<b>Trigger</b>
					<span>{feature.trigger}</span>
					<b>Effect</b>
					<span>{feature.effect}</span>
				{/each}
			</div>
		{/if}
	</div>
	<div class="additional">
		<div>
			<b>Speed</b>
			<span>{formatList(formatMovement(cardDetail.movement))}</span
			>{#if cardDetail.movement.additional};
				<span>{formatList(cardDetail.movement.additional)}</span>
			{/if}
		</div>
		{#if cardDetail.magic}
			<div>
				<b>Arcane Innate Spells</b>
				<span>DC {cardDetail.magic.dc}</span>;
				{#each Object.entries(cardDetail.magic.spells) as [level, spells]}
					<b>{getSpellLevelLabel(level)}</b>
					<i>{formatList(spells)}</i>;&nbsp;
				{/each}
			</div>
		{/if}
		{#if cardDetail.actions}
			{#each cardDetail.actions as action}
				<div>
					<b>{action.name}</b>
					{#if action.actions}
						<span>{'♦'.repeat(action.actions)}</span>
					{/if}
					{#if action.weapon}
						<span>{action.weapon}</span>
					{/if}
					{#if action.toHit}
						<span>+{action.toHit}</span>
					{/if}
					{#if action.traits}
						<span>({formatList(action.traits)})</span>
					{/if}
					{#if action.damage}
						<b>Damage</b>
						<span>{action.damage}</span>
					{/if}
					{#if action.description}
						<span>{action.description}</span>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
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

	.card {
		position: relative;
		background: var(--clr-white);
		color: black;
		border-radius: 1em;
		padding: 0.25em 0.5em;
		width: 36ch;
		min-height: 57ch;
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
	.card ul {
		margin: 0;
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

	.card.concise:not(:hover) {
		min-height: initial;
	}

	.card.concise,
	.card.concise .additional {
		display: none;
	}
</style>
