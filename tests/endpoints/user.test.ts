import { Types } from 'mongoose';
import supertest from 'supertest';

import { baseURL } from '../constants';

describe('POST /users', () => {
  describe('creating a user', () => {
    const newUser = {
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@mail.com',
    };
    let response: any;

    beforeAll(async () => {
      try {
        response = await supertest(baseURL).post('/users').send(newUser);
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/users/${response.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 201 status code', async () => {
      expect(response.statusCode).toBe(201);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
});

describe('GET /users', () => {
  describe('asking for all users', () => {
    const newUser = {
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@mail.com',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/users').send(newUser);
        response = await supertest(baseURL).get('/users').send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return all the users in Array', () => {
      expect(response.body.length >= 1).toBeTruthy();
      expect(Array.isArray(['response'])).toBeTruthy();
    });
  });
});

describe('GET /users/:userId', () => {
  describe('asking for a users', () => {
    const newUser = {
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@mail.com',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/users').send(newUser);
        response = await supertest(baseURL).get(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return the user', () => {
      expect(response.body._id).toBe(createdItem.body._id);
    });
  });
});

describe('PATCH /users/:userId', () => {
  describe('edit a user', () => {
    const newUser = {
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@mail.com',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/users').send(newUser);
        response = await supertest(baseURL)
          .patch(`/users/${createdItem.body._id}`)
          .send({ name: 'Testing User Updated' });
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return the user updated', () => {
      expect(response.body._id).toBe(createdItem.body._id);
      expect(response.body.name).toBe('Testing User Updated');
    });
  });
});

describe('DELETE /users/:userId', () => {
  describe('delete a user', () => {
    const newUser = {
      name: 'TestName',
      surname: 'TestSurname',
      email: 'test@mail.com',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/users').send(newUser);
        response = await supertest(baseURL).delete(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/users/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 201 status code', async () => {
      expect(response.statusCode).toBe(201);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return the deleted user', () => {
      expect(response.body._id).toBe(createdItem.body._id);
    });
  });
});

describe('GET /users/:userId', () => {
  describe('asking for a users that does not exist', () => {
    let response: any;

    beforeAll(async () => {
      try {
        const randomId = new Types.ObjectId();
        response = await supertest(baseURL).get(`/users/${randomId}`).send();
      } catch (error) {
        console.error(error);
      }
    });

    test('should respond with a 404 status code', async () => {
      expect(response.statusCode).toBe(404);
    });
    test('should be a json', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should return a message NotFound', () => {
      expect(response.body.message).toBe('NotFound');
    });
  });
});
