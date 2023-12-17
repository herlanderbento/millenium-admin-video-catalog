import { Category, CategoryId } from '../category.entity';

describe('Category Without Validator Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate');
  });
  test('constructor', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();

    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('some description');
    expect(category.is_active).toBe(false);
    expect(category.created_at).toBe(created_at);

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('other description');
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(CategoryId);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBe(created_at);
  });

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });
      expect(category.category_id).toBeInstanceOf(CategoryId);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    describe('category_id field', () => {
      const arrange = [
        { category_id: null },
        { category_id: undefined },
        { category_id: new CategoryId() },
      ];

      test.each(arrange)('should be is %j', (props) => {
        const category = new Category(props as any);
        expect(category.category_id).toBeInstanceOf(CategoryId);
      });
    });

    test('should change name', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.changeName('other name');
      expect(category.name).toBe('other name');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
      const category = Category.create({
        name: 'Movie',
      });
      category.changeDescription('some description');
      expect(category.description).toBe('some description');
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should active a category', () => {
      const category = new Category({
        name: 'Filmes',
        is_active: false,
      });
      category.activate();
      expect(category.is_active).toBe(true);
    });

    test('should disable a category', () => {
      const category = new Category({
        name: 'Filmes',
        is_active: true,
      });
      category.deactivate();
      expect(category.is_active).toBe(false);
    });
  });
});

describe('Category Validator', () => {
  describe('create command', () => {
    test('should an invalid category with name property', () => {
      expect(() =>
        Category.create({ name: null as any })
      ).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() =>
        Category.create({ name: 't'.repeat(256) })
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    it('should a invalid category using description property', () => {
      expect(() =>
        Category.create({ description: 5 } as any)
      ).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('should a invalid category using is_active property', () => {
      expect(() =>
        Category.create({ is_active: 5 } as any)
      ).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });
  });

  describe('changeName method', () => {
    test('should an invalid category with name property', () => {
      const category = Category.create({ name: 'Movie' });
      //@ts-ignore
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => category.changeName('')).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => category.changeName(5 as any)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => category.changeName('t'.repeat(256))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    it('should a invalid category using description property', () => {
      const category = Category.create({ name: 'Movie' });
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: ['description must be a string'],
      });
    });
  });
});
