export default class CategoryController {
  static async get(req, res) {}

  static async update(req, res) {}

  static async delete(req, res) {}

  static async create(req, res) {}

  static async list(req, res) {
    res.status(200).json({
      text: "hi",
    });
  }
}
