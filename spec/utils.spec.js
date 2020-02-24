const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe.only('formatDates', () => {
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

describe('makeRefObj', () => {});

describe('formatComments', () => {});
