import { Leaf } from './tree';
export const LogicFilterTypes = ['AND', 'OR', 'NOT'] as const; 
export type LogicFilterType = typeof LogicFilterTypes[number] | Leaf; 
