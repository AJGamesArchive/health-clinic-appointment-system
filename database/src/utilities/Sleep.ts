/**
 * Function to force the program to sleep for a given amount of time
 * @param ms - The amount of time to sleep in milliseconds
 */
const sleep = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
export default sleep;