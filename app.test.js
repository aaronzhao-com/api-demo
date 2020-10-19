'use strict';

process.env = {
  ...process.env,
  APP_VERSION: '1.0',
  APP_COMMIT: 'abc57858585',
  DESCRIPTION: 'pre-interview technical test',
  NODE_ENV: 'test',
}

const request = require('supertest');
const { app } = require('./app');

describe('GET /version', () => {
  test('should get application version', async () => {
    const res = await request(app).get('/version');
  
    const mockResponse = {
      'myapplication': [{
        'version': '1.0',
        'lastcommitsha': 'abc57858585',
        'description': 'pre-interview technical test'
      }]
    };
  
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResponse);
  });
});
