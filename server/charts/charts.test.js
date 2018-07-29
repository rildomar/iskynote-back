const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Charts APIs', () => {
  const invalidToken = {
    token: 'Bearer token'
  };

  describe('# GET /api/charts/powerfactor', () => {
    // it('should expect a Token',  (done) => {
    //   request(app)
    //     .get('/api/charts/powerfactor')
    //     .set('Authorization',invalidToken)
    //     .expect(httpStatus.UNAUTHORIZED)
    //     .then((res) => {
    //       expect(res.body.message).to.equal('Unauthorized');
    //     })
    //     .catch(done);
    // });

    it('should return missing parameters error', (done) => {
      request(app)
        .get('/api/charts/powerfactor')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"b1" is required and "b2" is required and "b3" is required');
          done();
        })
        .catch(done);
    });

    it('should return missing parameters error', (done) => {
      request(app)
        .get('/api/charts/powerfactor?b1=Jundiai')
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"b2" is required and "b3" is required');
          done();
          // expect(res.body.message).to.equal('Unauthorized');
        })
        .catch(done);
    });

    it('should return all powerfactor data', (done) => {
      request(app)
        .get('/api/charts/powerfactor?b1=Jundiai&b2=EB Park&b3=QG34REST')
        .expect(httpStatus.OK)
        .then((res) => {
          res.body.every(pwf => expect(pwf).to.have.all.keys('value1', 'date'));
          done();
        })
        .catch(done);
    });
  });
});
