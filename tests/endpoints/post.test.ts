import { Types } from 'mongoose';
import supertest from 'supertest';

import { baseURL } from '../constants';

describe('POST /posts', () => {
  describe('creating a post', () => {
    const newPost = {
      title: 'Testing Post',
      description: 'Testing description in this Post',
    };
    let response: any;

    beforeAll(async () => {
      try {
        response = await supertest(baseURL).post('/posts').send(newPost);
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/posts/${response.body._id}`).send();
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

describe('GET /posts', () => {
  describe('asking for all posts', () => {
    const newPost = {
      title: 'Testing Post',
      description: 'Test description in this Post',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/posts').send(newPost);
        response = await supertest(baseURL).get('/posts').send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/posts/${createdItem.body._id}`).send();
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
    test('should return all the posts in Array', () => {
      expect(response.body.length >= 1).toBeTruthy();
      expect(Array.isArray(['response'])).toBeTruthy();
    });
  });
});

describe('GET /posts/:postId', () => {
  describe('asking for a posts', () => {
    const newPost = {
      title: 'Testing Post',
      description: 'Test description in this Post',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/posts').send(newPost);
        response = await supertest(baseURL).get(`/posts/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/posts/${createdItem.body._id}`).send();
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
    test('should return the post', () => {
      expect(response.body._id).toBe(createdItem.body._id);
    });
  });
});

describe('PATCH /posts/:postId', () => {
  describe('edit a post', () => {
    const newPost = {
      title: 'Testing Post',
      description: 'Test description in this Post',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/posts').send(newPost);
        response = await supertest(baseURL)
          .patch(`/posts/${createdItem.body._id}`)
          .send({ title: 'Testing Post Updated' });
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/posts/${createdItem.body._id}`).send();
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
    test('should return the post updated', () => {
      expect(response.body._id).toBe(createdItem.body._id);
      expect(response.body.title).toBe('Testing Post Updated');
    });
  });
});

describe('DELETE /posts/:postId', () => {
  describe('delete a post', () => {
    const newPost = {
      title: 'Testing Post',
      description: 'Test description in this Post',
    };
    let response: any;
    let createdItem: any;

    beforeAll(async () => {
      try {
        createdItem = await supertest(baseURL).post('/posts').send(newPost);
        response = await supertest(baseURL).delete(`/posts/${createdItem.body._id}`).send();
      } catch (error) {
        console.error(error);
      }
    });
    afterAll(async () => {
      try {
        await supertest(baseURL).delete(`/posts/${createdItem.body._id}`).send();
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
    test('should return the deleted post', () => {
      expect(response.body._id).toBe(createdItem.body._id);
    });
  });
});

describe('GET /posts/:postId', () => {
  describe('asking for a posts that does not exist', () => {
    let response: any;

    beforeAll(async () => {
      try {
        const randomId = new Types.ObjectId();
        response = await supertest(baseURL).get(`/posts/${randomId}`).send();
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
