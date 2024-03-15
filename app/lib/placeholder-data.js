// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const mockStudents = [
  {
    idStudent: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    dni: '75684255',
    name: 'Martin Frei',
    phone: '11589784555', 
    email: 'maritn.frei02@gmail.com',
  },
  {
    idStudent: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    dni: '6549678',
    name: 'Nico vil',
    phone: '1158978455',
    email: 'nico.vil@gmail.com',
  },
  {
    idStudent: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    dni: '7842465454',
    name: 'Kari Alarcon',
    phone: '11589784555',
    email: 'kari.alarcon@gmail.com',
  },
]

const mockPayments=[
  {
    idPayment:'13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    quantity:4,
    date:'2024-03-20',
    idStudent: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
  },
  {
    idPayment:'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    quantity:8,
    date:'2024-01-20',
    idStudent: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
  }
];

const mockClasses=[
  {
    idClass:'3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name:'salsa inicial'
  },
  {
    idClass:'3958dc9e-737f-4378-85e9-fec4b6a6442a',
    name:'salsa intermedio'
  },
  {
    idClass:'3958dc9e-737f-4379-85e9-fec4b6a6442a',
    name:'salsa avanzado'
  },
  {
    idClass:'3958dc9e-737f-3379-85e9-fec4b6a6442a',
    name:'bachata'
  }
]

const mockStudentClass=[
  {
    idStudent:'3958dc9e-712f-4377-85e9-fec4b6a6442a',
    idClass:'3958dc9e-737f-4377-85e9-fec4b6a6442a',
    date:'2024-03-20',

  },
  {
    idStudent:'3958dc9e-712f-4377-85e9-fec4b6a6442a',
    idClass:'3958dc9e-737f-4378-85e9-fec4b6a6442a',
    date:'2024-03-21',

  },
  {
    idStudent:'126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    idClass:'3958dc9e-737f-3379-85e9-fec4b6a6442a',
    date:'2024-03-22',

  }
]
module.exports = {
  users,
  customers,
  invoices,
  revenue,
  mockStudents,
  mockPayments,
  mockClasses,
  mockStudentClass
};
