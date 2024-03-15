const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  mockStudents,
  mockPayments,
  mockClasses,
  mockStudentClass
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}


const seedUser = async (client) => {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createUserTable = await sql`
  CREATE TABLE IF NOT EXISTS user (
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

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

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
