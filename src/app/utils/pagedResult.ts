export class PagedResult<T> {
  list: [T];
  totalResults: number;
  pageIndex: number;
  pageSize: number;
  query: string;
}