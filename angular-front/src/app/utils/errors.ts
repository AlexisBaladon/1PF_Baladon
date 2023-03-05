export const parseError = (error: Error) => {
    switch (error.message) {
        case 'Unauthorized':
            return 'Email o contraseña incorrectos';
        case 'Forbidden':
            return 'No tienes permisos para acceder a esta página';
        case 'Not Found':
            return 'No se ha encontrado la página';
        case 'Bad Request':
            return 'Los datos introducidos no son válidos';
        case 'Conflict':
            return 'El email introducido ya está en uso';
        default:
            return 'Ha ocurrido un error, inténtelo nuevamente';
    }
};
