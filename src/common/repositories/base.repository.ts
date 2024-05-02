// import { EntityRepository, Repository } from 'typeorm';
// import { PaginationDto } from '../dto/pagination.dto';
// import { PaginationResult } from '../interfaces/pagination';

// @EntityRepository(ExampleEntity)
// export class ExampleRepository extends Repository<ExampleEntity> {
//   async paginate(
//     paginationDto: PaginationDto,
//   ): Promise<PaginationResult<ExampleEntity>> {
//     const { page = 1, limit = 10 } = paginationDto;

//     const queryBuilder = this.createQueryBuilder();
//     queryBuilder.limit(limit);
//     queryBuilder.offset((page - 1) * limit);

//     // Opcional: Agregar las condiciones de consulta si es necesario
//     // queryBuilder.where('campo = :valor', { valor });

//     const [items, totalItems] = await queryBuilder.getManyAndCount();

//     const meta: PaginationMeta = {
//       itemCount: items.length,
//       totalItems,
//       itemsPerPage: limit,
//       totalPages: Math.ceil(totalItems / limit),
//       currentPage: page,
//     };

//     return { items, meta };
//   }
// }
