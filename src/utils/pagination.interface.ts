import { SelectQueryBuilder } from "typeorm";

export interface PaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationResult<Entity> {
  items: Entity[];
  meta: PaginationMeta;
}

// pagination-params.interface.ts
export interface PaginationParams {
  page?: number;
  limit?: number;
  filter?: any;
}

export interface PaginateOptions<T> {
  queryBuilderFn?: (qb: SelectQueryBuilder<T>) => void;
  filterFn?: (filter: any, qb: SelectQueryBuilder<T>) => void;
  transformFn?: (data: T[]) => T[];
}