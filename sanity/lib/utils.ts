export const normalizeUrl = (url: string): string =>
  url.startsWith('//') ? `https:${url}` : url;