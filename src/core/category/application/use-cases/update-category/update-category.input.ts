export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
};