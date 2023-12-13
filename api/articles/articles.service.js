const Article = require("./articles.model");

class ArticleService {
  async create(userId, data) {
    const article = new Article({ ...data, user: userId });
    return article.save();
  }

  async update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Article.deleteOne({ _id: id });
  }
  async getArticlesByUser(userId) {
    return Article.find({ user: userId }, "-password");
  }
}

module.exports = new ArticleService();
