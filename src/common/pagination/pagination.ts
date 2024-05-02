import { Repository } from 'typeorm';
import {
  PaginationParams,
  PaginateOptions,
} from '../../utils/pagination.interface';

export async function paginate<T>(
  repository: Repository<T>,
  params: PaginationParams,
  options?: PaginateOptions<T>,
): Promise<{
  data: T[];
  total: number;
  nextPage?: number;
  previousPage?: number;
}> {
  const { page, limit, filter } = params;
  const queryBuilder = repository.createQueryBuilder();

  if (options?.queryBuilderFn) {
    options.queryBuilderFn(queryBuilder);
  }

  if (filter && options?.filterFn) {
    options.filterFn(filter, queryBuilder);
  }

  if (page !== undefined && limit !== undefined) {
    queryBuilder.take(limit).skip((page - 1) * limit);
  }

  const [data, total] = await queryBuilder.getManyAndCount();

  const totalPages = limit ? Math.ceil(total / limit) : 1;
  const nextPage = page && limit && page < totalPages ? page + 1 : undefined;
  const previousPage = page && limit && page > 1 ? page - 1 : undefined;

  const transformedData = options?.transformFn
    ? options.transformFn(data)
    : data;

  return { data: transformedData, total, nextPage, previousPage };
}
