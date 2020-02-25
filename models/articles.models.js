const connection = require('../db/connection');

const selectArticleByID = article_id => {
  return connection('articles')
    .where({ article_id })
    .select('*')
    .then(result => {
      if (result.length > 0) {
        return connection('comments')
          .where({ article_id })
          .count('*')
          .then(count => {
            result[0]['comment_count'] = +count[0].count;
            return result[0];
          });
      } else {
        return Promise.reject({ status: 404, msg: '404 not found' });
      }
    });
};

const updateArticleVotes = (article_id, votes) => {
  return connection('articles')
    .where({ article_id })
    .increment('votes', votes.inc_votes)
    .returning('*')
    .then(article => {
      return article[0];
    });
};

module.exports = { selectArticleByID, updateArticleVotes };
