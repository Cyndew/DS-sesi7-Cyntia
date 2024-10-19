const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

test.describe('API Testing with Playwright', () => {

  test('GET User', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
    
    const json = await response.json();
    
    // JSON Schema Validation
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' }
          },
          required: ['id', 'email', 'first_name', 'last_name']
        }
      },
      required: ['data']
    };
    
    const validate = ajv.compile(schema);
    const valid = validate(json);
    
    expect(valid).toBeTruthy(); // Assertion to check if JSON matches schema
  });
});
