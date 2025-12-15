import z from "zod";

const stringToHttpURL = z.codec(z.httpUrl(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => url.href,
});

function normalizeUrl(input: string) {
  // Add protocol if there is none
  if (!/^https?:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  return stringToHttpURL.safeDecode(input);
}

export default normalizeUrl;
