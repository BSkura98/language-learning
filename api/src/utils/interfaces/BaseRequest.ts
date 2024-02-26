import { Pagination } from "./Pagination";
import { Sort } from "./Sort";

export interface BaseRequest {
  userId: string;

  pagination?: Pagination;
  sort?: Sort;
}
