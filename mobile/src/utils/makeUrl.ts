import config from "../config";

export function makeUrl(url: string) {
    const str = `${config.baseUrl}${url}`;
    return str.replace(/(^|[^:])[/]{2,}/, '$1/');
}