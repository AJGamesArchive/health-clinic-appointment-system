// Imports
import Accounts from "../schemas/Accounts.js";
import Doctors from "../schemas/Doctors.js";

/**
 * Array of data creation promises
 */
const dataCreationPromises = [
  Accounts.insertMany([
    {
      username: "aWard",
      email: "aw949@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
    },
    {
      username: "jExcell",
      email: "je398@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
    },
    {
      username: "eMcGuiness",
      email: "em814@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
    },
    {
      username: "aSkinner",
      email: "as2679@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
    },
  ], { ordered: false }),
  Doctors.insertMany([
    {
      name: "Alex Ward",
      email: "aw949@canterbury.ac.uk",
    },
    {
      name: "Jessica Excell",
      email: "je398@canterbury.ac.uk",
    },
    {
      name: "Ethan McGuiness",
      email: "em814@canterbury.ac.uk",
    },
    {
      name: "Alfie Skinner",
      email: "as2679@canterbury.ac.uk",
    },
  ], { ordered: false }),
];

export default dataCreationPromises;