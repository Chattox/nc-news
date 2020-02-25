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
      });
    });
  });
});
