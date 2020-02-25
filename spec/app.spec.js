process.env.NODE_ENV = 'test';
const request = require('supertest');
const { expect } = require('chai');
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
  describe.only('/articles', () => {
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
      describe('PATCH', () => {
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
      });
    });
  });
});
