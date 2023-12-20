import { AuthorQueryParams, KeywordQueryParams } from 'utils/types';

import httpRequest, { IParams, parseQueryURL } from './httpRequest';

export const DEFAULT_DEPARTMENT_ID = '0fd09a4de59dc4b88f5254200adc330779b284af67a4306f4cdc462a';
const ACADEMIC_ENDPOINT = `http://18.219.109.147:8082/cs/department`;

export const searchKeyWord = async (params: KeywordQueryParams) => {
  const obj: IParams = {
    url: parseQueryURL(`${ACADEMIC_ENDPOINT}/keyword_cloud`, params),
  };

  return httpRequest.get(obj);
};

export const searchAuthor = async (params: AuthorQueryParams) => {
  const obj: IParams = {
    url: parseQueryURL(`${ACADEMIC_ENDPOINT}/authors`, params),
  };

  return httpRequest.get(obj);
};
