process.env.NODE_ENV = 'test';
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sams-chai-sorted'));
const app = require('../app');
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    describe('GET', () => {
      it('GET: 200 - responds with an array of topic objects, each with slub and description properties', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.be.an('array');
            res.body.topics.forEach(topic => {
              expect(topic).to.have.keys(['slug', 'description']);
            });
          });
      });
    });
  });
  describe('/users', () => {
    describe('/:username', () => {
      describe('GET', () => {
        it('GET: 200 - responds with a user object based on given username containing username, avatar_url, and name properties', () => {
          return request(app)
            .get('/api/users/butter_bridge')
            .expect(200)
            .then(res => {
              expect(res.body.user).to.be.an('object');
              expect(res.body.user).to.have.keys([
                'username',
                'avatar_url',
                'name'
              ]);
              expect(res.body.user.username).to.eql('butter_bridge');
            });
        });
        describe('GET errors', () => {
          it('GET: 404 - responds with 404 when no user is found with given username', () => {
            return request(app)
              .get('/api/users/chattox')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.eql('404 not found');
              });
          });
        });
      });
    });
  });
  describe('/articles', () => {
    describe('GET', () => {
      it('GET: 200 - responds with an array of article objects with the correct properties', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an('array');
            res.body.articles.forEach(article => {
              expect(article).to.have.keys([
                'author',
                'title',
                'article_id',
                'topic',
                'created_at',
                'votes',
                'comment_count'
              ]);
              expect(article.comment_count).to.be.a('number');
            });
          });
      });
      it('GET: 200 - accepts sort_by query (default date), sorts by any valid column', () => {
        return request(app)
          .get('/api/articles?sort_by=comment_count')
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy('comment_count', {
              descending: true
            });
          });
      });
    });
    describe('/:article_id', () => {
      describe('GET', () => {
        it('GET: 200 - responds with an article object according to given article_id, with correct properties', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(res => {
              expect(res.body.article).to.be.an('object');
              expect(res.body.article).to.have.keys([
                'author',
                'title',
                'article_id',
                'body',
                'topic',
                'created_at',
                'votes',
                'comment_count'
              ]);
              expect(res.body.article.article_id).to.eql(1);
              expect(res.body.article.author).to.eql('butter_bridge');
              expect(res.body.article.comment_count).to.eql(13);
            });
        });
        describe('GET errors', () => {
          it('GET: 404 - responds with 404 when no article exists under given valid id', () => {
            return request(app)
              .get('/api/articles/99999')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.eql('404 not found');
              });
          });
          it('GET: 400 - responds with 400 when given an id of incorrect data type', () => {
            return request(app)
              .get('/api/articles/not-valid-id')
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql('400 bad request');
              });
          });
        });
      });
      describe.only('PATCH', () => {
        it('PATCH: 200 - responds with 200 and updated article when given vote increment object in the form of {inc_votes: newVote}', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: 5 })
            .expect(200)
            .then(res => {
              expect(res.body.article.votes).to.eql(105);
            });
        });
        it('PATCH: 200 - also correctly decrements vote property when inc_votes is negative', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({ inc_votes: -5 })
            .expect(200)
            .then(res => {
              expect(res.body.article.votes).to.eql(95);
            });
        });
        describe('PATCH errors', () => {
          it('PATCH: 404 - responds with 404 when attempting to patch an article that does not exist', () => {
            return request(app)
              .patch('/api/articles/99999')
              .send({ inc_votes: -5 })
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.eql('404 not found');
              });
          });
          it('PATCH: 400 - responds with 400 when given article_id of wrong data type', () => {
            return request(app)
              .patch('/api/articles/not-valid-id')
              .send({ inc_votes: -5 })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql('400 bad request');
              });
          });
          it.only('PATCH: 400 - responds with 400 when req body does not contain inc_votes', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({})
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql('400 bad request');
              });
          });
          it('PATCH: 400 - responds with 400 if inc_votes is invalid data type', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: 'not a vote' })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql('400 bad request');
              });
          });
          it.only('PATCH: 400 - responds with 400 if req body has properties other than inc_votes', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: 5, name: 'chattox' })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql('400 bad request');
              });
          });
        });
      });
      describe('/comments', () => {
        describe('POST', () => {
          it('POST: 201 - posts new comment to given article and responds with 201 and new comment', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge', body: 'Very good!' })
              .expect(201)
              .then(res => {
                expect(res.body.comment).to.have.keys([
                  'comment_id',
                  'author',
                  'article_id',
                  'votes',
                  'created_at',
                  'body'
                ]);
                expect(res.body.comment.author).to.eql('butter_bridge');
                expect(res.body.comment.body).to.eql('Very good!');
                expect(res.body.comment.article_id).to.eql(1);
              });
          });
          describe('POST errors', () => {
            it('POST: 404 - responds with 404 when attempting to comment on an article that does not exist', () => {
              return request(app)
                .post('/api/articles/99999/comments')
                .send({ username: 'butter_bridge', body: 'Very good!' })
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.eql('404 not found');
                });
            });
            it('POST: 400 - responds with 400 when given bad article_id data type', () => {
              return request(app)
                .post('/api/articles/not-valid-id/comments')
                .send({ username: 'butter_bridge', body: 'Very good!' })
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.eql('400 bad request');
                });
            });
          });
        });
        describe('GET', () => {
          it('GET: 200 - responds with 200 and an array of comments for given article with correct properties', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(res => {
                expect(res.body.comments).to.be.an('array');
                res.body.comments.forEach(comment => {
                  expect(comment).to.have.keys([
                    'comment_id',
                    'votes',
                    'created_at',
                    'author',
                    'body'
                  ]);
                });
              });
          });
          it('GET: 200 - accepts sort_by query (default created_at), sorts by any valid column', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=author')
              .expect(200)
              .then(res => {
                expect(res.body.comments).to.be.sortedBy('author', {
                  descending: true
                });
              });
          });
          it('GET: 200 - accepts order query (default descending), decides order of sorting', () => {
            return request(app)
              .get('/api/articles/1/comments?order=asc')
              .expect(200)
              .then(res => {
                expect(res.body.comments).to.be.sortedBy('created_at', {
                  descending: false
                });
              });
          });
          it('GET: 200 - successfully handles both queries simultaneously', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=author&order=asc')
              .expect(200)
              .then(res => {
                expect(res.body.comments).to.be.sortedBy('author', {
                  descending: false
                });
              });
          });
          describe('GET errors', () => {
            it('GET: 404 - responds with 404 if attempting to get comments of article that does not exist', () => {
              return request(app)
                .get('/api/articles/99999/comments')
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.eql('404 not found');
                });
            });
            it('GET: 400 - responds with 400 if attempting to get comments with bad article_id data type', () => {
              return request(app)
                .get('/api/articles/not-valid-id/comments')
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.eql('400 bad request');
                });
            });
            it('GET: 400 - responds with 400 if sort_by query is invalid', () => {
              return request(app)
                .get('/api/articles/1/comments?sort_by=not-a-column')
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.eql('400 bad request');
                });
            });
            it('GET: 400 - responds with 400 if order query is invalid', () => {
              return request(app)
                .get('/api/articles/1/comments?order=not-valid-order')
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.eql('400 bad request');
                });
            });
          });
        });
      });
    });
  });
});
