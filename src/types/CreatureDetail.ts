export type Movement = {
	speed: number;
	fly?: number;
	swim?: number;
	burrow?: number;
	climb?: number;
	additional?: string[];
};

export type CreatureDetail = {
	name: string;
	type: 'Creature';
	level: number;
	traits: string[];
	perception: number;
	senses?: string[];
	languages: string[];
	ac: number;
	hp: number;
	movement: Movement;
	weaknesses?: [string, number][];
	resistances?: [string, number][];
	immunities?: string[];
	abilities: {
		str: number;
		dex: number;
		con: number;
		int: number;
		wis: number;
		cha: number;
	};
	saves: {
		fort: number;
		ref: number;
		will: number;
		additional?: string[];
	};
	skills: {
		acrobatics?: number;
		arcana?: number;
		athletics?: number;
		deception?: number;
		diplomacy?: number;
		intimidation?: number;
		nature?: number;
		occultism?: number;
		society?: number;
		stealth?: number;
	};
	actions?: {
		name: string;
		actions?: number;
		weapon?: string;
		toHit?: number;
		traits?: string[];
		damage?: string;
		description?: string;
	}[];
	reactions?: {
		name: string;
		trigger: string;
		effect: string;
	}[];
	features?: {
		name: string;
		description: string;
	}[];
	magic?: {
		dc: number;
		spells: {
			'At Will'?: string[];
			Cantrip: string[];
			1: string[];
			2: string[];
			3: string[];
			4: string[];
			5: string[];
			6: string[];
			7: string[];
			8: string[];
			9: string[];
			10: string[];
		};
	};
};
