export const LogicFilterTypes = ['AND', 'OR', 'NOT', 'LEAF'] as const; 
export type LogicFilterType = typeof LogicFilterTypes[number]; 