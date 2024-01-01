import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { CategoryFilter } from "../../../domain/category.repository";

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};