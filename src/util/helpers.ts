export const getSpellLevelLabel = (lvl: number | string): string => {
	if (isNaN(Number(lvl))) return lvl as string;
	switch (Number(lvl)) {
		case 1:
			return '1st';
		case 2:
			return '2nd';
		case 3:
			return '3rd';
		default:
			return `${lvl}th`;
	}
};
