const { test, expect } = require('@playwright/test');

test('GET user - real API', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/1'
    );
  
    expect(response.status()).toBe(200);
  
    const user = await response.json();
  
    console.log('REAL API RESPONSE:', user);
  
    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
    expect(user.email).toBe('Sincere@april.biz');
});

test('GET user - mocked API', async ({ page }) => {

    await page.route('**/users/1', async (route) => {
  
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            name: 'Amit Singh',
            username: 'amitsingh',
            email: 'amit@example.com'
          })
        });
  
      }
    );
  
    const user = await page.evaluate(async () => {
  
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users/1'
      );
  
      return response.json();
    });
  
    console.log('MOCKED API RESPONSE:', user);
  
    expect(user.id).toBe(1);
    expect(user.name).toBe('Amit Singh');
    expect(user.email).toBe('amit@example.com');
});