export const ensureTrailingSlash = (url: string) => (url.endsWith("/") ? url : url + "/");
