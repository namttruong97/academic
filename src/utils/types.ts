export interface SearchQueryParams {
  title: string;
  q: string;

  offset?: number;
  limit?: number;
  total?: number;
  lang?: string;
}

export interface KeywordQueryParams {
  departmentId: string;
  fromYear: number;
  toYear: number;
  granularityLevel: number;
  rootConcept?: string[];
}

export interface AuthorQueryParams {
  departmentId: string;
  page: number;
  rowsPerPage: number;
  fromYear: number;
  toYear: number;
  verified: number;
}
