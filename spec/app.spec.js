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
          .then(response => {
            console.log(response.body.topics);
            expect(response.body.topics).to.be.an('array');
            response.body.topics.forEach(topic => {
              expect(topic).to.have.keys(['slug', 'description']);
            });
          });
      });
    });
  });
});
