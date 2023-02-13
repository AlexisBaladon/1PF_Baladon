export const NAV_ROUTES: string[] = [
    '🏠 Inicio',
    '👨🏼‍🎓 Usuarios',
    '📚 Cursos',
    '📊 General',
]
interface DashboardInput {
    title: string;
    description: string;
    filterableType: string;
    createDataTitle: string;
}

export type DashboardInputData = Record<string, DashboardInput>;

export const DASHBOARD_TEXT: DashboardInputData = {
    Students: {
        title: '👨🏼‍🎓 Usuarios',
        description: 'Visualiza datos de los estudiantes de la universidad.',
        filterableType: 'Student',
        createDataTitle: 'Crea un usuario'
    },
    Courses: {
        title: '📚 Cursos',
        description: 'Visualiza datos de los cursos de la universidad.',
        filterableType: 'Course',
        createDataTitle: 'Crea un curso'
    },
}