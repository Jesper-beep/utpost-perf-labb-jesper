//använder .toUpperCase() för att göra första bokstaven i en sträng till versal ustället för loadash
/** 'medel' → 'Medel' – svårighetsgraden som den visas i listor, på kort och på guidesidan */
export const formatDifficulty = (difficulty: string): string => difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
