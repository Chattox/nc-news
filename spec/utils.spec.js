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
  it('does not mutate original data', () => {
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
    const inputCopy = [...input];
    const actual = formatDates(input);
    expect(input).to.eql(inputCopy);
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
  it('does not mutate original data', () => {
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
    const inputCopy = [...input];

    expect(input).to.eql(inputCopy);
  });
});

describe('formatComments', () => {
  it('takes an array and ref obj, returns a new array', () => {
    const input = [];
    const refObj = {};
    const actual = formatComments(input, refObj);
    expect(actual).to.be.an('array');
    expect(actual).to.not.equal(input);
  });
  it('takes an array of a single comment obj and a refObj, returns a new array with properly formatted comment', () => {
    const input = [
      {
        body: 'body',
        belongs_to: 'title',
        created_by: 'username',
        votes: 0,
        created_at: 1468087638932
      }
    ];
    const refObj = { title: 1 };
    const actual = formatComments(input, refObj);
    const date = new Date(1468087638932);
    expect(actual[0]).to.have.keys(
      'body',
      'author',
      'article_id',
      'created_at',
      'votes'
    );
    expect(actual[0].votes).to.eql(input[0].votes);
    expect(actual[0].body).to.eql(input[0].body);
    expect(actual[0].author).to.eql(input[0].created_by);
    expect(actual[0].article_id).to.eql(1);
    expect(actual[0].created_at).to.eql(date);
    expect(actual).to.not.equal(input);
  });
  it('takes an array of multiuple comment objs and a refObj, returns new array with properly formatted comment objs', () => {
    const input = [
      {
        body: 'body',
        belongs_to: 'title',
        created_by: 'username',
        votes: 0,
        created_at: 1468087638932
      },
      {
        body: 'test body',
        belongs_to: 'hello world',
        created_by: 'username2',
        votes: 5,
        created_at: 1478813209256
      },
      {
        body: 'second test body',
        belongs_to: 'a different title',
        created_by: 'test_username',
        votes: 11,
        created_at: 1504183900263
      }
    ];
    const refObj = { title: 1, 'hello world': 2, 'a different title': 3 };
    const actual = formatComments(input, refObj);

    expect(actual.length).to.eql(input.length);
    actual.forEach((comment, i) => {
      const date = new Date(input[i].created_at);
      expect(comment).to.have.keys(
        'body',
        'author',
        'article_id',
        'created_at',
        'votes'
      );
      expect(comment.votes).to.eql(input[i].votes);
      expect(comment.body).to.eql(input[i].body);
      expect(comment.author).to.eql(input[i].created_by);
      expect(comment.article_id).to.eql(refObj[input[i].belongs_to]);
      expect(comment.created_at).to.eql(date);
    });
    expect(actual).to.not.equal(input);
  });
  it('does not mutate original data', () => {
    const input = [
      {
        body: 'body',
        belongs_to: 'title',
        created_by: 'username',
        votes: 0,
        created_at: 1468087638932
      },
      {
        body: 'test body',
        belongs_to: 'hello world',
        created_by: 'username2',
        votes: 5,
        created_at: 1478813209256
      },
      {
        body: 'second test body',
        belongs_to: 'a different title',
        created_by: 'test_username',
        votes: 11,
        created_at: 1504183900263
      }
    ];
    const refObj = { title: 1, 'hello world': 2, 'a different title': 3 };
    const actual = formatComments(input, refObj);
    const inputClone = [...input];

    expect(input).to.eql(inputClone);
  });
});
