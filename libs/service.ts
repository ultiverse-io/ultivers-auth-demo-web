import type { NextApiResponse } from 'next';
import { serialize } from 'cookie';

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: any = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export const formatBody = (details: Record<string, string | number | boolean>) => {
  const formBody: string[] = [];
  for (let property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
