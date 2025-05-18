/**
 * Class to allow errors to be thrown as tomato's
 */
class Tomato extends Error {
  constructor(message: string) {
    super(message);
  };
};

export default Tomato;