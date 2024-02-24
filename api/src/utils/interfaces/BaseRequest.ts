import { Pagination } from "./Pagination";

export interface BaseRequest {
  userId: string;

  pagination?: Pagination;
}
