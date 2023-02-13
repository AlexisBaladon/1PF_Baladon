interface NavRoutes {
    title: string,
}

export type NavRoutesData = Record<string, NavRoutes>;

export const NAV_ROUTES: NavRoutesData = {
    Home: {
        title: '🏠 Inicio'
    },
    Students: {
        title: '👨🏼‍🎓 Usuarios',
    },
    Courses: {
        title: '📚 Cursos',
    },
    General: {
        title: '📊 General',
    },
    Config: {
        title: '⚙️ Ajustes',
    },
}

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