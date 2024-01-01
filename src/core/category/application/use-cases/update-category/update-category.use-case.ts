import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Category, CategoryId } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { UpdateCategoryInput } from './update-category.input';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category_id = new CategoryId(input.id);
    const category = await this.categoryRepo.findById(category_id);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    input.name && category.changeName(input.name);

    if (input.description !== undefined) {
      category.changeDescription(input.description);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this.categoryRepo.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}

export type UpdateCategoryOutput = CategoryOutput;
