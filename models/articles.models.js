const connection = require('../db/connection');

const selectArticleByID = article_id => {
  return connection('articles')
    .where({ article_id })
    .select('*')
    .then(result => {
      return connection('comments')
        .where({ article_id })
        .count('*')
        .then(count => {
          result[0]['comment_count'] = +count[0].count;
          return result[0];
        });
      //return result[0];
    });
};

module.exports = { selectArticleByID };
