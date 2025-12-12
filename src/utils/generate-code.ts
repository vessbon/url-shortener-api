const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateCode(length = 6): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let result = "";

  for (const byte of bytes) {
    result += ALPHABET[byte % ALPHABET.length];
  }

  return result;
}
