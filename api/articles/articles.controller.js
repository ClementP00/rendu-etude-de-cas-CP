const NotFoundError = require("../../errors/not-found");
const ForbiddenError = require("../../errors/forbidden");
const articlesService = require("./articles.service");

class ArticlesController {
  async create(req, res, next) {
    try {
      const userId = req.user._id; // Assuming you have modified the authentication middleware to include user information.
      const article = await articlesService.create(userId, req.body);
      req.io.emit("article:create", article);
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      const article = await articlesService.update(id, data);
      req.io.emit("article:update", article);
      res.json(article);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw new ForbiddenError("Only admins can delete articles.");
      }

      const id = req.params.id;
      await articlesService.delete(id);
      req.io.emit("article:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
