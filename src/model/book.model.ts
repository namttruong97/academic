export type BookResponse = {
  title: string;
  publish_date: string[];
  isbn: string[];
  author_name: string[];
  language: string[];
};

export type SearchBookResponse = {
  // count
  numFound: number;

  start: number;
  offset: number;
  docs: BookResponse[];
};

export type SearchKeywordResponse = {
  keywords: KeywordResponse[];
};

export type KeywordResponse = {
  value: string;
  id: string;
};

export type AuthorResponse = {
  photo: string;
  name: string;
  verified: boolean;
  id: string;
  citation_count: number;
  keywords: {
    value: string;
  }[];
};
