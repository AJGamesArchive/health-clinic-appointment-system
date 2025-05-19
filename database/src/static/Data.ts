// Imports
import DB_Accounts from "../schemas/Accounts.js";

/**
 * Array of function to generate database insertion promises
 */
const dataCreationFunctions = [
  async () => DB_Accounts.insertMany([
    {
      title: "Mr",
      forenames: "Alex",
      surname: "Ward",
      email: "aw949@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        staffRole: "Chief Elephant Operator",
      },
    },
    {
      title: "Miss",
      forenames: "Jessica",
      surname: "Excell",
      email: "je398@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        staffRole: "Assistant to the Regional Manager",
      },
    },
    {
      title: "Mr",
      forenames: "Ethan",
      surname: "McGuinness",
      email: "em814@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        staffRole: "Receptionist",
      },
    },
    {
      title: "Mr",
      forenames: "Alfie",
      surname: "Skinner",
      email: "as2679@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        staffRole: "Head Secretary",
      },
    },
    {
      title: "Miss",
      forenames: "Jane",
      surname: "Smith",
      email: "janesmith@hcams.com",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Doctor",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        specialty: "Cardiovascular Health",
        contactInfo: {
        workEmail: "janesmith@hcams.com",
        workPhone: "01234567890"
      },
      workingHours: [],
      upcomingAppointments: []
      } 
    },
    {
      title: "Mr",
      forenames: "John",
      surname: "Smith",
      email: "johnsmith@hcams.com",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Patient",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: {
        
      } 
    },
  ], { ordered: false }),
];

export default dataCreationFunctions;