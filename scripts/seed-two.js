import { mockClasses, mockPayments, mockStudentClass, mockStudents } from '../app/lib/placeholder-data.js';


const seedUser = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
        idUser UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    `
        const hashedPassword = await bcrypt.hash(ADMIN_USER.password, 10);

        const insertedAdminUser = await client.sql`
    INSERT INTO users (email, password)
    VALUES (${process.env.ADMIN_USER.email}, ${hashedPassword})
    ON CONFLICT (idUser) DO NOTHING;
    `
        return {
            createUserTable,
            user: insertedAdminUser,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

const seedStudents = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createStudentsTable = await client.sql`
        CREATE TABLE IF NOT EXISTS students (
            idStudent UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            dni VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(255),
            email VARCHAR(255)
        );
        `

        const insertedStudents = await Promise.all(mockStudents.map((student) => {
            return client.sql`
            INSERT INTO students (idStudent, dni, name, phone, email)
            VALUES (${student.idStudent}, ${student.dni}, ${student.name},  ${student.phone}, ${student.email});
        `
        }))

        return {
            createStudentsTable,
            students: insertedStudents
        }

    } catch (error) {
        console.error('Error seeding students:', error);

    }
}

const seedPayments = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createPaymentsTable = await client.sql`
        CREATE TABLE IF NOT EXISTS payments (
            idPayment UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            quantity INT NOT NULL,
            date DATE NOT NULL,
            idStudent UUID NOT NULL
        );`

        const insertedPayments = await Promise.all(mockPayments.map(payment => {
            return client.sql`INSERT INTO payments (idPayment, quantity, date, idStudent)
            VALUES (${payment.idPayment}, ${payment.quantity}, ${payment.date}, ${payment.idStudent});`
        }));

        return {
            createPaymentsTable,
            payments: insertedPayments
        }
    } catch (error) {
        console.error('Error seeding payments:', error);
    }
}

const seedClass = async (client) => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createClassTable = await client.sql`
        CREATE TABLE IF NOT EXISTS class (
            idClass UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        `

        const insertedClasses = await Promise.all(mockClasses.map(classStyle => {
            return client.sql`
            INSERT INTO class (idClass, name)
            VALUES (${classStyle.idClass}, ${classStyle.name});`
        }))

        return {
            createClassTable,
            classes: insertedClasses
        }
    } catch (error) {
        console.error('Error seeding classes:', error);
    }
}

const seedStudentClass = async (client) => {
    const createStudentClass = await client.sql`
    CREATE TABLE IF NOT EXISTS studentClass (
        idStudent UUID PRIMARY KEY,
        idClass UUID  PRIMARY KEY,
        date DATE PRIMARY KEY
    );
    `

    const insertedStudentClass = await Promise.all(mockStudentClass.map(studentClass => {
        return client.sql`
        INSERT INTO studentClass (idStudent, idClass, date)
        VALUES (${studentClass.idStudent}, ${studentClass.idClass}, ${studentClass.date});
        `
    }))

    return {
        createStudentClass,
        studentClass: insertedStudentClass
    }
}


async function main() {
    const client = await db.connect();

    await seedUser(client);
    await seedStudents(client);
    await seedPayments(client);
    await seedClass(client);
    await seedStudentClass(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});