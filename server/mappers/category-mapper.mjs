export class CategoryMapper {
  static toDto(category) {
    return {
      ...category,
    };
  }
}
