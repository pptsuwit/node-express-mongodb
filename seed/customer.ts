import "dotenv/config";
import mongoose from "mongoose";
const databseUrl = process.env.DATABASE_SEED_URL || "";

import { CustomerModel } from "../src/models/customer.model";
export class mockModel {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;

  constructor({
    customerId,
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    address,
  }: {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthdate: string;
    address: string;
  }) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
    this.address = address;
  }
}
const mockData: mockModel[] = [
  {
    customerId: "101",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    birthdate: "1985-03-15",
    address: "123 Main St, Anytown, USA",
  },
  {
    customerId: "102",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.j@example.com",
    phone: "555-987-6543",
    birthdate: "1990-09-22",
    address: "456 Elm Ave, Othercity, USA",
  },
  {
    customerId: "103",
    firstName: "Michael",
    lastName: "Williams",
    email: "michaelw@example.com",
    phone: "555-555-7890",
    birthdate: "1988-12-10",
    address: "789 Oak Rd, Somewhere, USA",
  },
  {
    customerId: "104",
    firstName: "Jessica",
    lastName: "Davis",
    email: "jessica.d@example.com",
    phone: "555-222-3333",
    birthdate: "1995-06-08",
    address: "567 Pine St, Anycity, USA",
  },
  {
    customerId: "105",
    firstName: "William",
    lastName: "Anderson",
    email: "william.a@example.com",
    phone: "555-444-5678",
    birthdate: "1983-11-29",
    address: "890 Maple Dr, Anothercity, USA",
  },
  {
    customerId: "106",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "olivia.m@example.com",
    phone: "555-876-5432",
    birthdate: "1998-04-17",
    address: "234 Cedar Ln, Townsville, USA",
  },
  {
    customerId: "107",
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel.b@example.com",
    phone: "555-234-5678",
    birthdate: "1989-07-03",
    address: "567 Willow Ave, Countryside, USA",
  },
  {
    customerId: "108",
    firstName: "Sophia",
    lastName: "Garcia",
    email: "sophia.g@example.com",
    phone: "555-987-1234",
    birthdate: "1993-02-11",
    address: "789 Oak St, Suburbia, USA",
  },
  {
    customerId: "109",
    firstName: "Liam",
    lastName: "Rodriguez",
    email: "liam.r@example.com",
    phone: "555-567-8901",
    birthdate: "1997-09-28",
    address: "890 Birch Rd, Uptown, USA",
  },
  {
    customerId: "110",
    firstName: "Ava",
    lastName: "Hernandez",
    email: "ava.h@example.com",
    phone: "555-123-7890",
    birthdate: "1992-11-14",
    address: "123 Oak Ave, Metropolis, USA",
  },
  {
    customerId: "111",
    firstName: "Ethan",
    lastName: "Lopez",
    email: "ethan.l@example.com",
    phone: "555-345-6789",
    birthdate: "1991-08-19",
    address: "456 Pine Rd, Riverside, USA",
  },
  {
    customerId: "112",
    firstName: "Mia",
    lastName: "Gonzalez",
    email: "mia.g@example.com",
    phone: "555-678-9012",
    birthdate: "1994-12-03",
    address: "567 Elm St, Lakeside, USA",
  },
  {
    customerId: "113",
    firstName: "Noah",
    lastName: "Perez",
    email: "noah.p@example.com",
    phone: "555-890-1234",
    birthdate: "1996-06-27",
    address: "678 Oak Ave, Mountainview, USA",
  },
  {
    customerId: "114",
    firstName: "Isabella",
    lastName: "Sanchez",
    email: "isabella.s@example.com",
    phone: "555-012-3456",
    birthdate: "1993-03-08",
    address: "789 Cedar Rd, Countryside, USA",
  },
  {
    customerId: "115",
    firstName: "James",
    lastName: "Ramirez",
    email: "james.r@example.com",
    phone: "555-234-5678",
    birthdate: "1987-05-01",
    address: "890 Maple Dr, Suburbia, USA",
  },
  {
    customerId: "116",
    firstName: "Emma",
    lastName: "Flores",
    email: "emma.f@example.com",
    phone: "555-345-6789",
    birthdate: "1990-02-14",
    address: "123 Willow Ave, Townsville, USA",
  },
  {
    customerId: "117",
    firstName: "Alexander",
    lastName: "Martinez",
    email: "alexander.m@example.com",
    phone: "555-678-9012",
    birthdate: "1988-09-10",
    address: "456 Cedar Rd, Riverside, USA",
  },
  {
    customerId: "118",
    firstName: "Aria",
    lastName: "Hernandez",
    email: "aria.h@example.com",
    phone: "555-890-1234",
    birthdate: "1995-12-21",
    address: "567 Oak St, Lakeside, USA",
  },
  {
    customerId: "119",
    firstName: "Benjamin",
    lastName: "Nguyen",
    email: "benjamin.n@example.com",
    phone: "555-012-3456",
    birthdate: "1991-06-11",
    address: "678 Maple Dr, Mountainview, USA",
  },
  {
    customerId: "120",
    firstName: "Avery",
    lastName: "Smith",
    email: "avery.s@example.com",
    phone: "555-234-5678",
    birthdate: "1986-09-30",
    address: "789 Pine Rd, Countryside, USA",
  },
  {
    customerId: "121",
    firstName: "Henry",
    lastName: "Garcia",
    email: "henry.g@example.com",
    phone: "555-456-7890",
    birthdate: "1993-03-17",
    address: "890 Elm Ave, Suburbia, USA",
  },
  {
    customerId: "122",
    firstName: "Sofia",
    lastName: "Lopez",
    email: "sofia.l@example.com",
    phone: "555-567-8901",
    birthdate: "1997-11-09",
    address: "123 Oak St, Metropolis, USA",
  },
  {
    customerId: "123",
    firstName: "Jackson",
    lastName: "Perez",
    email: "jackson.p@example.com",
    phone: "555-678-9012",
    birthdate: "1989-05-02",
    address: "234 Cedar Rd, Townsville, USA",
  },
  {
    customerId: "124",
    firstName: "Luna",
    lastName: "Ramirez",
    email: "luna.r@example.com",
    phone: "555-890-1234",
    birthdate: "1994-07-22",
    address: "345 Pine Rd, Riverside, USA",
  },
  {
    customerId: "125",
    firstName: "Carter",
    lastName: "Flores",
    email: "carter.f@example.com",
    phone: "555-012-3456",
    birthdate: "1987-10-15",
    address: "456 Elm St, Lakeside, USA",
  },
  {
    customerId: "126",
    firstName: "Grace",
    lastName: "Nguyen",
    email: "grace.n@example.com",
    phone: "555-234-5678",
    birthdate: "1990-01-12",
    address: "567 Maple Dr, Mountainview, USA",
  },
  {
    customerId: "127",
    firstName: "Lucas",
    lastName: "Garcia",
    email: "lucas.g@example.com",
    phone: "555-456-7890",
    birthdate: "1996-08-18",
    address: "678 Oak Ave, Countryside, USA",
  },
  {
    customerId: "128",
    firstName: "Chloe",
    lastName: "Lopez",
    email: "chloe.l@example.com",
    phone: "555-567-8901",
    birthdate: "1988-04-07",
    address: "789 Cedar Rd, Suburbia, USA",
  },
  {
    customerId: "129",
    firstName: "Elijah",
    lastName: "Smith",
    email: "elijah.s@example.com",
    phone: "555-678-9012",
    birthdate: "1992-12-29",
    address: "890 Elm Ave, Metropolis, USA",
  },
  {
    customerId: "130",
    firstName: "Harper",
    lastName: "Perez",
    email: "harper.p@example.com",
    phone: "555-890-1234",
    birthdate: "1995-02-04",
    address: "123 Willow Rd, Townsville, USA",
  },
];
export async function dropData(): Promise<void> {
  try {
    await CustomerModel.deleteMany({});
    console.log("Documents deleted");
  } catch (error) {
    console.error("Error dropping database:", error);
  }
}

export async function seedData(data: mockModel[]): Promise<void> {
  try {
    const result = await CustomerModel.insertMany(data);
    console.log(`${result.length} documents inserted`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export async function seedCustomer() {
  try {
    await mongoose.connect(databseUrl);
    console.log("Connected to database");

    await dropData();
    await seedData(mockData);
  } catch (error) {
    throw error;
  }
}
