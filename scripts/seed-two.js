


const seedUserTable = async () => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS usuarios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL
    )
    `

        const insertedAdminUser = await sql`
    INSERT INTO usuarios (email, password)
    VALUES (${process.env.ADMIN_USER.email}, ${ADMIN_USER.password})
    ON CONFLICT (id) DO NOTHING;
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

const seedStudents = async () => {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createStudentsTable = await sql`
        CREATE TABLE IF NOT EXISTS alumnos (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            dni VARCHAR(255) NOT NULL UNIQUE,
            nombre VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            telefono VARCHAR(255)
        )
        `
        
    } catch (error) {

    }
}