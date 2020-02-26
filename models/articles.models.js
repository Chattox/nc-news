const connection = require('../db/connection');

const selectArticleByID = article_id => {
  return connection('articles')
    .where({ 'articles.article_id': article_id })
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(articles => {
      if (articles.length > 0) {
        articles[0].comment_count = +articles[0].comment_count;
        return articles[0];
      } else {
        return Promise.reject({ status: 404, msg: '404 not found' });
      }
    });
};

const updateArticleVotes = (article_id, votes) => {
  if (!votes.hasOwnProperty('inc_votes') || Object.keys(votes).length > 1) {
    return Promise.reject({ status: 400, msg: '400 bad request' });
  }
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

const selectAllComments = (article_id, queryObj) => {
  return connection('comments')
    .where({ article_id })
    .select('*')
    .orderBy(queryObj.sort_by || 'created_at', queryObj.order || 'desc')
    .then(comments => {
      if (
        queryObj.order !== undefined &&
        !['asc', 'desc'].includes(queryObj.order)
      ) {
        return Promise.reject({ status: 400, msg: '400 bad request' });
      } else if (comments.length > 0) {
        comments.forEach(comment => {
          delete comment.article_id;
        });
        return comments;
      } else {
        return checkIfExists('articles', article_id).then(res => {
          if (res) {
            return comments;
          } else {
            return Promise.reject({ status: 404, msg: '404 not found' });
          }
        });
      }
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const selectAllArticles = queryObj => {
  for (prop in queryObj) {
    if (prop === 'teapot' && queryObj[prop] === 'coffee') {
      return Promise.reject({ status: 418, msg: "418 I'm a teapot" });
    } else if (!['sort_by', 'order', 'author', 'topic'].includes(prop)) {
      return Promise.reject({ status: 400, msg: '400 bad request' });
    }
  }
  if (
    queryObj.order !== undefined &&
    !['asc', 'desc'].includes(queryObj.order)
  ) {
    return Promise.reject({ status: 400, msg: '400 bad request' });
  }
  return connection('articles')
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(queryObj.sort_by || 'created_at', queryObj.order || 'desc')
    .modify(query => {
      if (queryObj.author) {
        query.where({ 'articles.author': queryObj.author });
      } else if (queryObj.topic) {
        query.where({ topic: queryObj.topic });
      }
    })
    .then(articles => {
      if (articles.length > 0) {
        articles.forEach(article => {
          delete article.body;
          article.comment_count = +article.comment_count;
        });
        return articles;
      } else {
        if (queryObj.author) {
          return checkIfExists('users', queryObj.author).then(res => {
            if (res) {
              return articles;
            } else {
              return Promise.reject({ status: 404, msg: '404 not found' });
            }
          });
        } else if (queryObj.topic) {
          return checkIfExists('topics', queryObj.topic).then(res => {
            if (res) {
              return articles;
            } else {
              return Promise.reject({ status: 404, msg: '404 not found' });
            }
          });
        } else {
          return Promise.reject({ status: 404, msg: '404 not found' });
        }
      }
    });
};

const checkIfExists = (queryTable, queryTerm) => {
  return connection(queryTable)
    .select('*')
    .modify(query => {
      if (queryTable === 'users') {
        query.where({ username: queryTerm });
      } else if (queryTable === 'topics') {
        query.where({ slug: queryTerm });
      } else if (queryTable === 'articles') {
        query.where({ article_id: queryTerm });
      }
    })
    .then(result => {
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    });
};

module.exports = {
  selectArticleByID,
  updateArticleVotes,
  insertComment,
  selectAllComments,
  selectAllArticles
};
