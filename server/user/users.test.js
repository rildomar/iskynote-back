const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const should = chai.should();
const app = require('../../index');
const config = require('../../config/config');

chai.config.includeStack = true;

describe('## Users APIs', () => {
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlJpbGRvbWFyIEx1Y2VuYSIsImVtYWlsIjoicmlsZG8ub21hckBnbWFpbC5jb20iLCJsb2dpbiI6InJpbGRvbWFyIiwicGhvdG8iOm51bGwsIm1pbWVUeXBlIjpudWxsLCJibG9ja2VkIjowLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTA5VDEzOjIzOjE3LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTA5VDEzOjIzOjE3LjAwMFoiLCJpYXQiOjE1MzE3NjA3NzR9.s4RHKFa0b9QDfPmfanCRZgojQgud8Ba1NQqZZmvGpWU";
  const userObject = {
    name: 'usuarioteste',
    email: 'usuarioteste@gmail.com',
    login: 'usuarioteste',
    password: '123',
    role: 'ADMIN'
  };
  let userToken = '';

  const invalidUser = {
    email: 'usuarioteste',
    password: 123,
    role: 'admin'
  };

  describe('# GET /api/users/profile', () => {
    it('should expect a Token', (done) => {
      request(app)
        .get('/api/users/')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should return user logged profile without password', (done) => {
      request(app)
        .get('/api/users/profile')
        .set('Authorization', token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.not.have.property('password');
          done();
        })
        .catch(done);
    });
  });

  describe('# POST /api/users/', () => {
    it('should return invalid parameters error', (done) => {
      request(app)
        .post('/api/users/')
        .send(invalidUser)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"name" is required and "password" must be a string and "email" must be a valid email and "login" is required and "role" must be one of [ADMIN, USER, MANAGER]');
          done();
        })
        .catch(done);
    });

    it('should create a user', (done) => {
      request(app)
        .post('/api/users/')
        .send(userObject)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('insertId');
          userObject.id = res.body.insertId;
          done();
        })
        .catch(done);
    });
  });
  

  describe('# AUTH /api/auth/login', () => {
    it('should return the user token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send({
          login: userObject.login,
          password: userObject.password
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('token');
          userToken = 'Bearer ' + res.body.token;
          done();
        })
        .catch(done);
    });
  });


  describe('# GET /api/users/', () => {
    it('should expect a Token', (done) => {
      request(app)
        .get('/api/users/')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });
    it('should return users list', (done) => {
      request(app)
        .get('/api/users/')
        .set('Authorization', userToken)
        .expect(httpStatus.OK)
        .then((res) => {
          res.body.every(user => expect(user).to.have.all.keys('id', 'name', 'email', 'login', 'role'));
          done();
        })
        .catch(done);
    });
  });

  describe('# UPDATE /api/users/', () => {
    it('should update the user created previously', (done) => {
      userObject.name = 'Test';
      request(app)
        .put('/api/users/')
        .send(userObject)
        .set('Authorization', userToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('changedRows');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should delete the user created previously', (done) => {
      userObject.name = 'Test';
      request(app)
        .delete('/api/users/')
        .send(userObject)
        .set('Authorization', userToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('affectedRows');
          done();
        })
        .catch(done);
    });
  });
});
