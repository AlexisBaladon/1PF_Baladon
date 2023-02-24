import { FilterName } from "../interfaces/filters";

export const NAV_ROUTES: {title: string, icon: string, route: string}[] = [
    {title: 'Estudiantes', icon: 'face', route: '/layout/students'},
    {title: 'Cursos', icon: 'school', route: '/layout/courses'},
    {title: 'Usuarios', icon: 'person', route: '/layout/users'},
    {title: 'Inscripciones', icon: 'assignment', route: '/layout/enrollments'},
    {title: 'Cerrar sesión', icon: 'logout', route: '/login'}
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
        icon: 'face',
        title: 'Estudiantes',
        description: 'Visualiza datos de los estudiantes de la universidad.',
        filterableType: 'Student',
        createDataTitle: 'Crea un estudiante',
        filterOptions: FILTER_OPTIONS['Student'],
        attributeNames: {
            id: 'ID',
            name: 'Nombre',
            surname: 'Apellido',
            phone: 'Teléfono',
            password: 'Contraseña',
            direction: 'Dirección',
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
            averageGrade: 'Promedio',
            category: 'Categoría',
        }
    },
    User: {
        icon: 'person',
        title: 'Usuarios',
        description: 'Visualiza datos de los usuarios de la universidad.',
        filterableType: 'User',
        createDataTitle: 'Crea un usuario',
        filterOptions: FILTER_OPTIONS['User'],
        attributeNames: {
            id: 'ID',
            name: 'Nombre',
            surname: 'Apellido',
            phone: 'Teléfono',
            password: 'Contraseña',
            direction: 'Dirección',
            birthDate: 'Fecha de nacimiento',
            email: 'Correo',
            career: 'Carrera',
            admissionDate: 'Fecha de ingreso',
            averageGrade: 'Promedio',
            profile: 'Perfil',
        },
    },
    Enrollment: {
        icon: 'assignment',
        title: 'Inscripciones',
        description: 'Visualiza datos de las inscripciones de la universidad.',
        filterableType: 'Enrollment',
        createDataTitle: 'Crea una inscripción',
        filterOptions: FILTER_OPTIONS['Enrollment'],
        attributeNames: {
            id: 'ID',
            studentId: 'Estudiante',
            courseId: 'Curso',
            grade: 'Nota',
            enrollmentDate: 'Fecha de inscripción',
            finishDate: 'Fecha de finalización',
        },
    },
};
