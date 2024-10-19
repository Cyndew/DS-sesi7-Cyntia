test('POST Create User', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: {
        name: 'John',
        job: 'developer'
      }
    });
    expect(response.status()).toBe(201);
    
    const json = await response.json();
  
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' }
      },
      required: ['name', 'job', 'id', 'createdAt']
    };
    
    const validate = ajv.compile(schema);
    const valid = validate(json);
    
    expect(valid).toBeTruthy();
  });
  