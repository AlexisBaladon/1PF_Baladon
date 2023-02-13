import { FilterName } from "../interfaces/filters";

export const NAV_ROUTES: string[] = [
    '🏠 Inicio',
    '👨🏼‍🎓 Usuarios',
    '📚 Cursos',
    '📊 General',
]

export interface FilterOption {
    name: FilterName;
    description: string;
    type: 'text' | 'range' | 'date';
}

export const FILTER_OPTIONS: Record<string, FilterOption[]> = {
    Student: [
        {
          name: 'Nombre',
          description: 'Contiene los caracteres ingresados',
          type: 'text',
        },
        {
          name: 'Promedio',
          description: 'Promedio mayor o igual al ingresado',
          type: 'range',
        },
    ],
    Course: [
        {
            name: 'Nombre',
            description: 'Contiene los caracteres ingresados',
            type: 'text',
        },
        {
            name: 'Cantidad de alumnos',
            description: 'Cantidad de estudiantes mayor o igual al ingresado',
            type: 'range',
        },
  ]
};

interface DashboardInput {
    title: string;
    description: string;
    filterableType: string;
    createDataTitle: string;
    filterOptions: FilterOption[];
    attributeNames: Record<string, string>;
}

export type DashboardInputData = Record<string, DashboardInput>;

export const DASHBOARD_TEXT: DashboardInputData = {
    Student: {
        title: '👨🏼‍🎓 Usuarios',
        description: 'Visualiza datos de los estudiantes de la universidad.',
        filterableType: 'Student',
        createDataTitle: 'Crea un usuario',
        filterOptions: FILTER_OPTIONS['Student'],
        attributeNames: {
            id: 'ID',
            name: 'Nombre',
            surname: 'Apellido',
            phone: 'Teléfono',
            password: 'Contraseña',
            city: 'Ciudad',
            birthDate: 'Fecha de nacimiento',
            email: 'Correo',
            career: 'Carrera',
            admissionDate: 'Fecha de ingreso',
            averageGrade: 'Promedio',
        }
    },
    Course: {
        title: '📚 Cursos',
        description: 'Visualiza datos de los cursos de la universidad.',
        filterableType: 'Course',
        createDataTitle: 'Crea un curso',
        filterOptions: FILTER_OPTIONS['Course'],
        attributeNames: {
            id: 'ID',
            name: 'Nombre',
            description: 'Descripción',
            credits: 'Créditos',
            teacher: 'Profesor',
            studentsId: 'Estudiantes',
            averageGrade: 'Promedio',
        }
    },
}
