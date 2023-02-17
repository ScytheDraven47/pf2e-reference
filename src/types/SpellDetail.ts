export type SpellDetail = {
	name: string;
	type: 'Spell' | 'Cantrip' | 'Focus' | 'Ritual';
	level: number;
	list: string;
	traits?: string[];
	traditions?: string[];
	components?: string[];
	actions?: number;
	range?: number;
	target?: string;
	duration?: string;
	description?: string;
	heightened?: {
		level: number;
		effect: string;
	}[];
};
