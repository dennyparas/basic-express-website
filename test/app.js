const request = require('supertest');
const app = require('../app');

describe('GET /page-does-not-exist', () => {
  it('should return 404 page does not exist', (done) => {
    request(app)
      .get('/page-does-not-exist')
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /about', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/about')
      .expect(200, done);
  });
});

describe('GET /services', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/services')
      .expect(200, done);
  });
});

describe('GET /contact', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});
