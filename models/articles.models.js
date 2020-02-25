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
      if (article.length > 0) {
        return article[0];
      } else {
        return Promise.reject({ status: 404, msg: '404 not found' });
      }
    });
};

const insertComment = (article_id, comment) => {
  const formattedComment = {
    author: comment.username,
    body: comment.body,
    article_id: article_id
  };
  return connection('comments')
    .insert(formattedComment)
    .returning('*')
    .then(comment => {
      return comment[0];
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const selectComments = (article_id, queryObj) => {
  return connection('comments')
    .where({ article_id })
    .select('*')
    .orderBy(queryObj.sort_by || 'created_at', queryObj.order || 'desc')
    .then(comments => {
      comments.forEach(comment => {
        delete comment.article_id;
      });
      return comments;
    });
};

module.exports = {
  selectArticleByID,
  updateArticleVotes,
  insertComment,
  selectComments
};
