import { type LogicFilterType } from 'src/app/interfaces/logic-filter-type';

export const logicOperatorTitles: { [key in LogicFilterType]: string } = {
    AND: 'Todos',
    OR: 'Alguno',
    NOT: 'Ninguno',
    LEAF: 'Filtro',
};