import { sql } from "@vercel/postgres"
import { Student } from "./definitions";



export const fetchStudents = async () => {
    try {
        const data = await sql<Student>`SELECT * FROM students`;

        return data.rows
    } catch (error) {
        console.log('Failed to fetch students')
        throw new Error('Failed to fetch students')
    }
}