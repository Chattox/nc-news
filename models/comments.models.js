const connection = require('../db/connection');

const updateCommentVotes = (comment_id, votes) => {
  if (!votes.hasOwnProperty('inc_votes') || Object.keys(votes).length > 1) {
    return Promise.reject({ status: 400, msg: '400 bad request' });
  }
  return connection('comments')
    .where({ comment_id })
    .increment('votes', votes.inc_votes)
    .returning('*')
    .then(comment => {
      if (comment.length > 0) {
        return comment[0];
      } else {
        return Promise.reject({ status: 404, msg: '404 not found' });
      }
    });
};

module.exports = { updateCommentVotes };
