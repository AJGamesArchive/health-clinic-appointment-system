// Imports
import Users from "../schemas/Users.js";
import Doctors from "../schemas/Doctors.js";

/**
 * Array of data creation promises
 */
const dataCreationPromises = [
  Users.create([
    {
      username: "aWard",
      email: "aw949@canterbury.ac.uk",
    },
    {
      username: "jExcell",
      email: "je398@canterbury.ac.uk",
    },
    {
      username: "eMcGuiness",
      email: "em814@canterbury.ac.uk",
    },
    {
      username: "tSayer",
      email: "ts560@canterbury.ac.uk",
    },
    {
      username: "aSkinner",
      email: "as2679@canterbury.ac.uk",
    },
  ]),
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
      name: "Trinity Sayer",
      email: "ts560@canterbury.ac.uk",
    },
    {
      name: "Alfie Skinner",
      email: "as2679@canterbury.ac.uk",
    },
  ]),
];

export default dataCreationPromises;