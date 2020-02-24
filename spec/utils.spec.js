const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('takes an array and returns a new array', () => {
    const input = [];
    expect(formatDates(input)).to.be.an('array');
    expect(formatDates(input)).to.not.equal(input);
  });
  it('when given an array containing a single news obj, returns a new array with single news obj with properly formatted date obj under key created_at', () => {
    const input = [
      {
        title: 'title',
        topic: 'topic',
        author: 'author',
        body: 'body',
        created_at: 1492163783248
      }
    ];
    const actual = formatDates(input);
    expect(actual[0]).to.have.keys([
      'title',
      'topic',
      'author',
      'body',
      'created_at'
    ]);
    const date = new Date(input[0].created_at);

    expect(actual[0].created_at).to.eql(date);
    expect(actual).to.not.equal(input);
  });
  it('when given an array of multiple news objs, returns a new array with multiple news objs with properly formatted date objs under key created_at', () => {
    const input = [
      {
        title: 'title',
        topic: 'topic',
        author: 'author',
        body: 'body',
        created_at: 1492163783248
      },
      {
        title: 'title',
        topic: 'topic',
        author: 'author',
        body: 'body',
        created_at: 1542284514171
      },
      {
        title: 'title',
        topic: 'topic',
        author: 'author',
        body: 'body',
        created_at: 1416140514171
      }
    ];
    const actual = formatDates(input);
    expect(actual.length).to.equal(input.length);
    actual.forEach((newsObj, i) => {
      const date = new Date(input[i].created_at);
      expect(newsObj.created_at).to.eql(date);
    });
    expect(actual).to.not.equal(input);
  });
});

describe('makeRefObj', () => {
  it('takes an array and returns an object', () => {
    const input = [];
    expect(makeRefObj(input)).to.be.an('object');
  });
  it('when passed an array of a single obj, returns an obj with a single key value pair (title : id)', () => {
    const input = [
      {
        article_id: 1,
        title: 'hello',
        body: 'body',
        votes: 0,
        topic: 'topic',
        author: 'author',
        created_at: 0
      }
    ];
    const actual = makeRefObj(input);
    const expected = { hello: 1 };

    expect(actual).to.eql(expected);
  });
  it('when passed an array of multiple objs, returns an obj with multiple key value pairs (title: id)', () => {
    const input = [
      {
        article_id: 1,
        title: 'hello',
        body: 'body',
        votes: 0,
        topic: 'topic',
        author: 'author',
        created_at: 0
      },
      {
        article_id: 2,
        title: 'world',
        body: 'body',
        votes: 0,
        topic: 'topic',
        author: 'author',
        created_at: 0
      },
      {
        article_id: 3,
        title: 'test',
        body: 'body',
        votes: 0,
        topic: 'topic',
        author: 'author',
        created_at: 0
      }
    ];
    const actual = makeRefObj(input);
    const expected = { hello: 1, world: 2, test: 3 };

    expect(actual).to.eql(expected);
  });
});

describe('formatComments', () => {});
