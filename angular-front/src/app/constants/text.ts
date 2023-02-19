import { FilterName } from "../interfaces/filters";

export const NAV_ROUTES: {title: string, icon: string, route: string}[] = [
    {title: 'Inicio', icon: 'home', route: '/layout/home'},
    {title: 'Usuarios', icon: 'person', route: '/layout/students'},
    {title: 'Cursos', icon: 'school', route: '/layout/courses'},
    {title: 'General', icon: 'bar_chart', route: '/layout/general'},
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
    icon: string;
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
        icon: 'person',
        title: 'Usuarios',
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
        icon: 'school',
        title: 'Cursos',
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
            category: 'Categoría',
        }
    },
}
