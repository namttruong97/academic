import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IParams {
  url: string;
  config?: AxiosRequestConfig;
}

export const parseQueryURL = (path: string, paramsObject: any) => {
  const params = Object.keys(paramsObject)
    .reduce<Array<string>>((prev, current) => {
      if (
        typeof paramsObject[current] === 'undefined' ||
        (typeof paramsObject[current] === 'string' && paramsObject[current].length === 0)
      )
        return prev;

      if (typeof paramsObject[current] === 'object' && paramsObject[current].length > 1) {
        const newArr = paramsObject[current]
          .flatMap((item: string) => [current, , encodeURIComponent(item)].join('='))
          .join('&')
          .replaceAll('==', '=');

        return [...prev, newArr];
      }
      return [...prev, [current, encodeURIComponent(paramsObject[current])].join('=')];
    }, [])
    .join('&');
  return [path, params.trim()].join('?');
};

const get = async (params: IParams): Promise<any> => {
  const endPoint: string = params.url;
  const response: AxiosResponse = await axios.get(endPoint, params.config);
  return response.data;
};

const httpRequest = {
  get,
};

export default httpRequest;
