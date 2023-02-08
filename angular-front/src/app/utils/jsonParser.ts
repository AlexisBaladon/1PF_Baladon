import Student from '../interfaces/student'

//avoids typescript conversion errors
export function jsonParser<T>(objects: Array<any>): T[] {
    return JSON.parse(JSON.stringify(objects)).default
}