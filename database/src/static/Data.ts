// Imports
import Accounts from "../schemas/Accounts.js";

/**
 * Array of data creation promises
 */
const dataCreationPromises = [
  Accounts.insertMany([
    {
      title: "Mr",
      forenames: "Alex",
      surname: "Ward",
      email: "aw949@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
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
      accountData: null,
    },
    {
      title: "Mr",
      forenames: "Ethan",
      surname: "McGuiness",
      email: "em814@canterbury.ac.uk",
      password: "$2b$10$a7yfUF5n3MzXpID4zwKcauVtL0vqo9XJyHUBE5eLY4IBsbx2OBVcO",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      accountData: null,
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
      accountData: null,
    },
  ], { ordered: false }),
];

export default dataCreationPromises;