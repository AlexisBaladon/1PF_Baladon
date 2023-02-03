import Student from "../interfaces/student";

const databaseStudents: Student[] = [
    {
        id: "1",
        name: 'John',
        surname: 'Doe',
        email: 'JohnDoe@mail.com',
        admissionDate: new Date('2020-01-01'),
        averageGrade: 4.75,
        career: 'Gestión de Proyectos',
    },
    {
        id: "2",
        name: 'Jane',
        surname: 'Doe',
        email: 'JaneDoe@mail.com',
        admissionDate: new Date('2020-05-01'),
        averageGrade: 10,
        career: 'Diseño Gráfico',
    },
    {
        id: "3",
        name: 'Jake',
        surname: 'Brown',
        email: 'JakeBrown@mail.com',
        admissionDate: new Date('2000-07-05'),
        averageGrade: 1.5,
        career: 'Desarrollo Web',
    },
    {
        id: "4",
        name: 'Bruno',
        surname: 'Mars',
        email: 'BrunoMars@mail.com',
        admissionDate: new Date('2010-01-01'),
        averageGrade: 5.5,
        career: 'Desarrollo Web',
    },
    {
        id: "5",
        name: 'Rafael',
        surname: 'Nadal Jr.',
        email: 'RafaNadal@mail.com',
        admissionDate: new Date('2015-01-01'),
        averageGrade: 9,
        career: 'Ciencia de Datos',
    },
    {
        id: "6",
        name: 'Mery',
        surname: 'Jane',
        email: 'MeryJane@mail.com',
        admissionDate: new Date('2010-01-01'),
        averageGrade: 8.8,
        career: 'Ciberseguridad',
    },
]

export default databaseStudents;