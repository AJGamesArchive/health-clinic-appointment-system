/**
 * Function to encode a string to base64
 * @param str - The string to encode
 * @returns The base64 encoded string
 */
const encodeBase64 = (str: string): string => {
  const bytes = new TextEncoder().encode(str);
  let base64String = '';
  bytes.forEach((b) => base64String += String.fromCharCode(b));
  return btoa(base64String);
};

export default encodeBase64;