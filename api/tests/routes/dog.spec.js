/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);
describe('GET /', function () {
  it('Responde con estado 200', function () {
    agent.get('/dogs')
      .expect(200);
  });
  it('Espera que devuelva un JSON', function () {
    agent.get('/dogs')
      .expect('Content-Type', /json/);
  });
});
