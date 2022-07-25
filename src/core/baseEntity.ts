import { Model, UpdatedAt, CreatedAt, DeletedAt } from 'sequelize-typescript';

export class BaseEntity extends Model {
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
