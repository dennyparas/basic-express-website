const request = require('supertest');
const should = require('should');
const cheerio = require('cheerio');
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

describe('POST /contact', () => {
  it('should send email and return 200', (done) => {
    request(app)
      .post('/contact')
      .send({ name: 'john', email: 'john@gmail.com', message: 'test message' })
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });

  it('should show message has been sent', (done) => {
    request(app)
      .post('/contact')
      .send({ name: 'john', email: 'john@gmail.com', message: 'test message' })
      .expect(200)
      .end((err, res) => {
        const $ = cheerio.load(res.text);
        const alert = $('.alert').text();
        alert.should.equal(' Message has been sent×');
        done();
      });
  });

  it('should not send a message with an incomplete fields ', (done) => {
    request(app)
      .post('/contact')
      .send({ name: 'john', email: '', message: 'test message' })
      .expect(200)
      .end((err, res) => {
        const $ = cheerio.load(res.text);
        const alert = $('.alert').text();
        alert.should.equal(' All contact form fields are required×');
        done();
      });
  });

  it('should not send a message with an invalid email', (done) => {
    request(app)
      .post('/contact')
      .send({ name: 'john', email: 'xxxxxxxx', message: 'test message' })
      .expect(200)
      .end((err, res) => {
        const $ = cheerio.load(res.text);
        const alert = $('.alert').text();
        alert.should.equal(' Invalid Email×');
        done();
      });
  });
});
