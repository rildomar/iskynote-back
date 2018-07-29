const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Measurements APIs', () => {
  const invalidBodyRequest = {
    token: 'Bearer token'
  };

  describe('# GET /api/measurements/powerfactor', () => {
    // it('should expect a Token',  (done) => {
    //   request(app)
    //     .get('/api/measurements/powerfactor')
    //     .send(invalidBodyRequest)
    //     .expect(httpStatus.UNAUTHORIZED)
    //     .then((res) => {
    //       expect(res.body.message).to.equal('Unauthorized');
    //     })
    //     .catch(done);
    // });

    it('should return missing parameters error', (done) => {
      request(app)
        .get('/api/measurements/powerfactor')
        .send(invalidBodyRequest)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"b1" is required and "b2" is required and "b3" is required');
          done();
        })
        .catch(done);
    });
    it('should return missing parameters error', (done) => {
      request(app)
        .get('/api/measurements/powerfactor?b1=Jundiai')
        .send(invalidBodyRequest)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"b2" is required and "b3" is required');
          done();
          // expect(res.body.message).to.equal('Unauthorized');
        })
        .catch(done);
    });
  });
});
