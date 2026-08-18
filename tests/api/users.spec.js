const { test, expect } = require('@playwright/test');

test.describe('Users API', () => {
    // test.describe.configure({ mode: 'serial' });
      
    test('GET user should return valid user details', async ({ request }) => {

        const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
        );

        expect(response.status()).toBe(200);

        const user = await response.json();
        console.log("GET user ===>> ", user);

        expect(user.id).toBe(1);
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
    });

    test('POST - create user', async ({ request }) => {

        const response = await request.post(
          'https://jsonplaceholder.typicode.com/users',
          {
            data: {
              name: 'Amit Singh',
              username: 'amitsingh',
              email: 'amit@example.com'
            }
          }
        );
    
        expect(response.status()).toBe(201);
    
        const user = await response.json();
        console.log("POST user ===>> ", user);
    
        expect(user.name).toBe('Amit Singh');
        expect(user.username).toBe('amitsingh');
        expect(user.email).toBe('amit@example.com');
    });

    test('PUT - update complete user', async ({ request }) => {

        const response = await request.put(
          'https://jsonplaceholder.typicode.com/users/1',
          {
            data: {
              id: 1,
              name: 'Amit Singh Updated',
              username: 'amitupdated',
              email: 'amit.updated@example.com'
            }
          }
        );
    
        expect(response.status()).toBe(200);
    
        const user = await response.json();
        console.log("PUT user ===>> ", user);
    
        expect(user.id).toBe(1);
        expect(user.name).toBe('Amit Singh Updated');
        expect(user.username).toBe('amitupdated');
        expect(user.email).toBe('amit.updated@example.com');
    });
    
    test('PATCH - partially update user', async ({ request }) => {

        const response = await request.patch(
          'https://jsonplaceholder.typicode.com/users/1',
          {
            data: {
              name: 'Amit Singh Patched'
            }
          }
        );
    
        expect(response.status()).toBe(200);
    
        const user = await response.json();
        console.log("PATCH user ===>> ", user);
    
        expect(user.id).toBe(1);
        expect(user.name).toBe('Amit Singh Patched');
    });
    
    test('GET after all operation should return valid user details', async ({ request }) => {

        const response = await request.get(
        'https://jsonplaceholder.typicode.com/users/1'
        );

        expect(response.status()).toBe(200);

        const user = await response.json();
        console.log("GET user ===>> ", user);

        expect(user.id).toBe(1);
        expect(user.name).toBeTruthy();
        expect(user.email).toBeTruthy();
    });
    
});